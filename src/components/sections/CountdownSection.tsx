import React, { useState, useEffect, useCallback } from 'react';
import { GoldDivider } from '../ornaments/GoldDivider';
import { ShowerBlessings } from '../ui/ShowerBlessings';
import { ShareModal } from '../ui/ShareModal';
import { ScrollReveal } from '../ui/ScrollMotion';
import { useWeddingContent } from '../../store/weddingStore';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC = () => {
  const content = useWeddingContent();
  const targetDate = new Date(content.countdown.targetDateISO).getTime();
  const muhurtha = content.events.find((event) => event.type === 'muhurtha');

  const calculateTimeRemaining = useCallback((): TimeRemaining => {
    const difference = targetDate - Date.now();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isPast: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeRemaining]);

  const clock = `${String(timeLeft.hours).padStart(2, '0')} : ${String(timeLeft.minutes).padStart(2, '0')} : ${String(timeLeft.seconds).padStart(2, '0')}`;

  return (
    <footer className="relative pt-6 sm:pt-8 pb-10 sm:pb-16 px-4 sm:px-8 max-w-3xl mx-auto z-10 text-center">
      <ShowerBlessings />

      <ScrollReveal className="my-8 sm:my-12">
        <div>
          <p className="text-[11px] sm:text-xs uppercase text-gold-700 font-sans">
            {content.countdown.title}
          </p>

          {timeLeft.isPast ? (
            <p className="mt-6 font-cormorant italic text-2xl sm:text-3xl text-maroon-950">
              The muhurtha is here.
            </p>
          ) : (
            <>
              <p className="mt-4 font-cinzel text-6xl sm:text-8xl text-maroon-950 leading-none tabular-nums">
                {timeLeft.days}
              </p>
              <p className="mt-2 text-[11px] uppercase text-gold-700 font-sans">Days</p>
              <p className="mt-5 font-cormorant italic text-lg sm:text-xl text-maroon-800 tabular-nums">
                {clock}
              </p>
            </>
          )}

          {muhurtha && (
            <p className="mt-5 font-serif text-sm sm:text-base text-maroon-900">
              {muhurtha.lagna}
              <span className="mx-2 text-gold-600">·</span>
              {muhurtha.time}
            </p>
          )}

          <p className="mt-4 font-cormorant italic text-maroon-800/80">{content.countdown.subText}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="my-7 sm:my-8" delay={0.05}>
        <p className="text-[11px] uppercase text-gold-700 font-sans mb-3">
          {content.actions.shareInvitation}
        </p>
        <ShareModal />
      </ScrollReveal>

      <GoldDivider variant="simple" className="my-7 sm:my-8 max-w-xs" />

      <ScrollReveal className="my-7 sm:my-8" delay={0.05}>
        <p className="text-xs uppercase text-gold-700 font-sans">{content.compliments.heading}</p>
        <p className="mt-2 font-cormorant italic text-xl sm:text-2xl text-maroon-950">
          {content.compliments.note}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mt-9 sm:mt-12 flex flex-col items-center" delay={0.1}>
        <p className="font-serif text-sm text-maroon-900">
          {content.display.groomFirstName}{' '}
          <span className="text-gold-600 font-italiana">&</span>{' '}
          {content.display.brideFirstName}
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-6 flex h-32 w-32 flex-col items-center justify-center rounded-full border border-gold-500/70 bg-[#FDFBF8] shadow-[0_18px_40px_-28px_rgba(61,18,18,0.45)]"
          aria-label="Back to top"
        >
          <span className="font-italiana text-2xl leading-none text-maroon-950">
            {content.display.groomFirstName.charAt(0)}{' '}
            <span className="text-gold-600">&</span>{' '}
            {content.display.brideFirstName.charAt(0)}
          </span>
          <span className="mt-2 whitespace-nowrap text-[8px] uppercase tracking-[0.12em] text-gold-700 font-sans">
            {content.display.monthYear}
          </span>
        </button>
      </ScrollReveal>
    </footer>
  );
};
