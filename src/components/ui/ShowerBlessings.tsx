import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Button } from './Button';
import { useUiStore } from '../../store/uiStore';

export const ShowerBlessings: React.FC = () => {
  const blessingCount = useUiStore((state) => state.blessingCount);
  const hasShowered = useUiStore((state) => state.hasShowered);
  const incrementBlessingShower = useUiStore((state) => state.incrementBlessingShower);
  const clearBlessingShowerAck = useUiStore((state) => state.clearBlessingShowerAck);

  useEffect(() => {
    if (!hasShowered) return;
    const id = window.setTimeout(() => clearBlessingShowerAck(), 4000);
    return () => window.clearTimeout(id);
  }, [hasShowered, clearBlessingShowerAck]);

  const triggerPetalShower = () => {
    incrementBlessingShower();

    confetti({
      particleCount: 42,
      angle: 90,
      spread: 56,
      startVelocity: 20,
      gravity: 0.32,
      ticks: 420,
      scalar: 0.85,
      origin: { x: 0.5, y: 0.42 },
      colors: ['#FFFDF6', '#F3E6C4', '#E7C56A', '#F7F1E4'],
      shapes: ['circle'],
      disableForReducedMotion: true,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 text-center px-4">
      <Button variant="gold" size="md" onClick={triggerPetalShower}>
        Shower blessings
      </Button>

      <p className="mt-4 font-cormorant italic text-maroon-800/85">
        {hasShowered
          ? 'A blessing, received.'
          : `${blessingCount} blessings for Akarsh & Manasa`}
      </p>
    </div>
  );
};
