import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useInvitationStore } from '../store/invitationStore';
import { useWeddingStore } from '../store/weddingStore';
import { initAudioStore } from '../store/audioStore';
import { musicPlayer } from '../utils/audio';

/** One-time app setup: audio, Lenis smooth scroll, and scroll lock while curtain is closed. */
export function useAppBootstrap(): void {
  const hasOpenedInvitation = useInvitationStore((state) => state.hasOpenedInvitation);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    initAudioStore();
    const musicUrl = useWeddingStore.getState().content.musicUrl;
    if (musicUrl) {
      musicPlayer.setCustomMusicUrl(musicUrl);
    }
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (hasOpenedInvitation) {
      document.documentElement.style.overflow = '';
      lenis?.start();
    } else {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = 'hidden';
      lenis?.stop();
    }
  }, [hasOpenedInvitation]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.stop();

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
}
