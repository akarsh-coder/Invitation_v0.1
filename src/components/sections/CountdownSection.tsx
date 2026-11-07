import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronUp } from 'lucide-react';
import { GoldDivider } from '../ornaments/GoldDivider';
import { ShowerBlessings } from '../ui/ShowerBlessings';
import { ShareModal } from '../ui/ShareModal';
import type { WeddingContent, Language } from '../../types/wedding';

interface CountdownSectionProps {
  content: WeddingContent;
  currentLang: Language;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ content, currentLang }) => {
  const targetDate = new Date('2026-12-13T10:40:00+05:30').getTime();

  const calculateTimeRemaining = (): TimeRemaining => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const timeUnits = [
    { label: currentLang === 'en' ? 'Days' : 'ದಿನಗಳು', value: timeLeft.days },
    { label: currentLang === 'en' ? 'Hours' : 'ಗಂಟೆಗಳು', value: timeLeft.hours },
    { label: currentLang === 'en' ? 'Minutes' : 'ನಿಮಿಷಗಳು', value: timeLeft.minutes },
    { label: currentLang === 'en' ? 'Seconds' : 'ಸೆಕೆಂಡುಗಳು', value: timeLeft.seconds },
  ];

  return (
    <footer className="relative pt-12 pb-16 px-4 sm:px-8 max-w-4xl mx-auto z-10 text-center">
      {/* Interactive Shower Blessings section */}
      <ShowerBlessings currentLang={currentLang} />

      {/* Modern Countdown Card */}
      <motion.div
        className="my-10 p-6 sm:p-10 rounded-2xl bg-white/80 border border-gold-300 shadow-sm max-w-2xl mx-auto backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gold-700 uppercase font-sans mb-1">
          {content.countdown.title}
        </div>
        <div className="text-lg sm:text-2xl font-serif font-bold text-maroon-900 mb-6">
          13th December 2026 • 10:40 AM IST
        </div>

        {/* Minimalist Countdown Units */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto">
          {timeUnits.map((unit, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-[#FDFBF7] border border-gold-300/50"
            >
              <span className="font-cinzel text-xl sm:text-3xl font-bold text-maroon-950 tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gold-700 mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs sm:text-sm font-serif italic text-maroon-800/80">
          &ldquo;{content.countdown.subText}&rdquo;
        </p>
      </motion.div>

      {/* Share with Family & Friends */}
      <div className="my-8">
        <div className="text-[11px] uppercase tracking-wider text-gold-700 font-semibold mb-3">
          {currentLang === 'en' ? 'Share Invitation' : 'ಆಮಂತ್ರಣವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ'}
        </div>
        <ShareModal currentLang={currentLang} />
      </div>

      <GoldDivider variant="simple" className="my-6 max-w-xs" />

      {/* Compliments Section */}
      <motion.div
        className="my-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
          {content.compliments.heading}
        </div>
        <div className="text-xl sm:text-2xl font-serif font-bold text-maroon-950 mt-1">
          {content.compliments.note}
        </div>
      </motion.div>

      {/* Clean Monogram Footer */}
      <div className="mt-10 flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs text-maroon-800 font-serif">
          <span>Akarsh</span>
          <Heart size={12} className="text-gold-600 fill-gold-600" />
          <span>Manasa</span>
        </div>
        <div className="text-[11px] text-gold-700 font-sans tracking-wider mt-0.5">
          December 2026
        </div>
      </div>

      {/* Scroll to Top */}
      <div className="mt-8">
        <button
          type="button"
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-white hover:bg-gold-50 text-maroon-800 border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          title="Back to Top"
          aria-label="Back to top"
        >
          <ChevronUp size={18} />
        </button>
      </div>
    </footer>
  );
};
