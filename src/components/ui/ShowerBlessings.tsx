import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { Button } from './Button';
import type { Language } from '../../types/wedding';

interface ShowerBlessingsProps {
  currentLang: Language;
}

export const ShowerBlessings: React.FC<ShowerBlessingsProps> = ({ currentLang }) => {
  const [blessingCount, setBlessingCount] = useState<number>(108);
  const [hasShowered, setHasShowered] = useState<boolean>(false);

  const triggerPetalShower = () => {
    setBlessingCount((prev) => prev + 1);
    setHasShowered(true);

    // Custom flower petal colors: Lotus pink, jasmine white, turmeric gold, vermilion red
    const weddingColors = ['#D84B7E', '#FFFDF0', '#ECCB51', '#D4AF37', '#B91C1C', '#447E3A'];

    // Left cannon
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.75 },
      colors: weddingColors,
      shapes: ['circle'],
      scalar: 1.2,
      ticks: 240,
    });

    // Right cannon
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.75 },
      colors: weddingColors,
      shapes: ['circle'],
      scalar: 1.2,
      ticks: 240,
    });

    // Center burst
    setTimeout(() => {
      confetti({
        particleCount: 65,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: weddingColors,
        scalar: 1.3,
        ticks: 200,
      });
    }, 250);

    // Reset indicator after 4 seconds
    setTimeout(() => setHasShowered(false), 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 text-center px-4">
      <div className="relative">
        <Button
          variant="gold"
          size="lg"
          onClick={triggerPetalShower}
          icon={<Sparkles className="animate-spin-slow text-maroon-900" size={18} />}
          className="shadow-gold-glow hover:scale-105 active:scale-95 transition-all text-sm md:text-base px-6 py-3"
        >
          {currentLang === 'en' ? '🌸 Shower Petals & Blessings' : '🌸 ಹೂಮಳೆ ಮತ್ತು ಶುಭ ಹಾರೈಕೆಗಳು'}
        </Button>

        {hasShowered && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-maroon-800 text-gold-200 text-xs py-1 px-3 rounded-full shadow-lg border border-gold-400 animate-bounce flex items-center gap-1.5">
            <Heart size={12} className="text-red-400 fill-red-400" />
            {currentLang === 'en'
              ? 'Heartfelt blessings received!'
              : 'ಹಾರ್ದಿಕ ಶುಭ ಹಾರೈಕೆಗಳು ಅರ್ಪಿಸಲ್ಪಟ್ಟಿವೆ!'}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center space-x-2 text-xs text-maroon-800/80 font-medium">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>
          {currentLang === 'en'
            ? `${blessingCount} blessings showered for Akarsh & Manasa`
            : `${blessingCount} ಶುಭ ಹಾರೈಕೆಗಳು ಸಮರ್ಪಿತ`}
        </span>
      </div>
    </div>
  );
};
