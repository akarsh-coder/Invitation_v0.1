// Universal Wedding Music Player
// Supports both custom audio files (e.g. /music/background.mp3 or any audio track)
// with automatic fallback to Web Audio API ambient Carnatic synthesizer if no custom file exists.

class WeddingMusicPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private customMusicUrl: string = '/music/background.mp3';
  private isUsingCustomAudio: boolean = false;
  private isPlaying: boolean = false;

  // Web Audio Synth Fallback fields
  private ctx: AudioContext | null = null;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private melodyNoteIndex: number = 0;

  // Auspicious Carnatic notes
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

  public setCustomMusicUrl(url: string) {
    if (url && url.trim().length > 0) {
      this.customMusicUrl = url.trim();
      if (this.audioElement) {
        this.audioElement.src = this.customMusicUrl;
      }
    }
  }

  public async start(): Promise<boolean> {
    if (this.isPlaying) return true;

    // 1. First, attempt to play the custom audio file if provided
    if (this.customMusicUrl) {
      try {
        if (!this.audioElement) {
          this.audioElement = new Audio(this.customMusicUrl);
          this.audioElement.loop = true;
          this.audioElement.volume = 0.6;
        }

        // Test play
        await this.audioElement.play();
        this.isUsingCustomAudio = true;
        this.isPlaying = true;
        return true;
      } catch (err) {
        // File may not exist or cannot play; seamlessly fall back to synthesizer
        console.info('Custom audio not found or unplayable, using ambient synthesizer fallback.', err);
        this.isUsingCustomAudio = false;
      }
    }

    // 2. Synthesizer fallback
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

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 2.5);
      this.masterGain.connect(this.ctx.destination);

      this.startTanpuraDrone();

      this.isPlaying = true;
      this.playNextMelodyNote();
      this.intervalId = window.setInterval(() => {
        if (this.isPlaying) {
          this.playNextMelodyNote();
        }
      }, 1400);

      return true;
    } catch (e) {
      console.warn('Audio playback not supported:', e);
      return false;
    }
  }

  private startTanpuraDrone() {
    if (!this.ctx || !this.masterGain) return;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.value = 0.2;
    this.droneGain.connect(this.masterGain);

    const droneFreqs = [146.83, 220.0, 293.66];

    droneFreqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = idx === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx!.currentTime);
      gain.gain.setValueAtTime(0.12 / (idx + 1), this.ctx!.currentTime);

      const lfo = this.ctx!.createOscillator();
      const lfoGain = this.ctx!.createGain();
      lfo.frequency.setValueAtTime(0.25 + idx * 0.1, this.ctx!.currentTime);
      lfoGain.gain.setValueAtTime(0.04, this.ctx!.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.droneGain!);
      osc.start();
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
    vibrato.connect(osc.frequency);
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

  public stop(): void {
    if (this.isUsingCustomAudio && this.audioElement) {
      this.audioElement.pause();
    }

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    }

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const musicPlayer = new WeddingMusicPlayer();
