// Plays the wedding track from public/music, falling back to a soft Web Audio
// tanpura-and-flute synth when the file cannot be played.

type Listener = (isPlaying: boolean) => void;

class WeddingMusicPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private customMusicUrl: string = '/music/background.mp3';
  private customAudioFailed: boolean = false;
  private isUsingCustomAudio: boolean = false;
  private isPlaying: boolean = false;
  private pendingStart: Promise<boolean> | null = null;
  private pausedByVisibility: boolean = false;
  private listeners = new Set<Listener>();

  private ctx: AudioContext | null = null;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private droneNodes: AudioScheduledSourceNode[] = [];
  private melodyNoteIndex: number = 0;

  private scale = [
    293.66, 329.63, 369.99, 440.00, 493.88, 554.37, 587.33, 659.25, 739.99
  ];
  private melodyPhrase = [
    0, 1, 2, 3, 2, 1, 0,
    3, 4, 6, 4, 3,
    6, 7, 8, 7, 6,
    4, 3, 2, 1, 0,
    -1,
    0, 2, 3, 6,
    6, 4, 3, 2, 0
  ];

  constructor() {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private setPlaying(value: boolean) {
    if (this.isPlaying === value) return;
    this.isPlaying = value;
    this.listeners.forEach((listener) => listener(value));
  }

  public setCustomMusicUrl(url: string) {
    const next = url?.trim();
    if (!next || next === this.customMusicUrl) return;

    const wasPlaying = this.isPlaying;
    if (wasPlaying) this.stop();

    this.customMusicUrl = next;
    this.customAudioFailed = false;
    if (this.audioElement) {
      this.audioElement.src = next;
    }

    if (wasPlaying) {
      this.start().catch(() => {});
    }
  }

  public start(): Promise<boolean> {
    if (this.isPlaying) return Promise.resolve(true);
    if (this.pendingStart) return this.pendingStart;

    this.pendingStart = this.startInternal().finally(() => {
      this.pendingStart = null;
    });
    return this.pendingStart;
  }

  private async startInternal(): Promise<boolean> {
    if (this.customMusicUrl && !this.customAudioFailed) {
      try {
        if (!this.audioElement) {
          this.audioElement = new Audio(this.customMusicUrl);
          this.audioElement.loop = true;
          this.audioElement.volume = 0.6;
          this.audioElement.preload = 'auto';
        }

        await this.audioElement.play();
        this.isUsingCustomAudio = true;
        this.setPlaying(true);
        return true;
      } catch (err) {
        // NotAllowedError means the browser wants a user gesture; the file itself is fine.
        if (!(err instanceof DOMException && err.name === 'NotAllowedError')) {
          this.customAudioFailed = true;
          console.info('Wedding track unavailable, using the ambient synth instead.', err);
        } else {
          return false;
        }
      }
    }

    return this.startSynthesizer();
  }

  private async startSynthesizer(): Promise<boolean> {
    try {
      if (!this.ctx) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioContextClass();
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      this.teardownSynth();

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.linearRampToValueAtTime(0.35, now + 2.5);
      this.masterGain.connect(this.ctx.destination);

      this.startTanpuraDrone();

      this.isUsingCustomAudio = false;
      this.setPlaying(true);
      this.playNextMelodyNote();
      this.intervalId = window.setInterval(() => this.playNextMelodyNote(), 1400);

      return true;
    } catch (e) {
      console.warn('Audio playback not supported:', e);
      return false;
    }
  }

  private startTanpuraDrone() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.2;
    droneGain.connect(this.masterGain);

    [146.83, 220.0, 293.66].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.12 / (idx + 1), ctx.currentTime);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.25 + idx * 0.1, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(droneGain);
      osc.start();

      this.droneNodes.push(osc, lfo);
    });
  }

  private playNextMelodyNote() {
    if (!this.ctx || !this.isPlaying || !this.masterGain) return;

    const noteIdx = this.melodyPhrase[this.melodyNoteIndex];
    this.melodyNoteIndex = (this.melodyNoteIndex + 1) % this.melodyPhrase.length;

    if (noteIdx < 0) return;

    const freq = this.scale[noteIdx];
    const now = this.ctx.currentTime;
    const duration = 1.3;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(5.2, now);
    vibratoGain.gain.setValueAtTime(3.5, now);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    vibrato.start(now);

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.16, now + 0.3);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration);
    osc2.stop(now + duration);
    vibrato.stop(now + duration);
  }

  private teardownSynth() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.droneNodes.forEach((node) => {
      try {
        node.stop();
      } catch {
        // already stopped
      }
    });
    this.droneNodes = [];
    this.masterGain?.disconnect();
    this.masterGain = null;
  }

  public stop(): void {
    if (this.audioElement) {
      this.audioElement.pause();
    }

    if (this.ctx && this.masterGain) {
      const gain = this.masterGain;
      const now = this.ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.4);
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      window.setTimeout(() => {
        if (!this.isPlaying) this.teardownSynth();
      }, 450);
    }

    this.setPlaying(false);
  }

  public toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return Promise.resolve(false);
    }
    return this.start();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private handleVisibilityChange = () => {
    if (document.hidden) {
      if (this.isPlaying) {
        this.pausedByVisibility = true;
        if (this.isUsingCustomAudio) {
          this.audioElement?.pause();
        } else {
          this.ctx?.suspend().catch(() => {});
        }
      }
      return;
    }

    if (this.pausedByVisibility) {
      this.pausedByVisibility = false;
      if (this.isUsingCustomAudio) {
        this.audioElement?.play().catch(() => this.setPlaying(false));
      } else {
        this.ctx?.resume().catch(() => {});
      }
    }
  };
}

export const musicPlayer = new WeddingMusicPlayer();
