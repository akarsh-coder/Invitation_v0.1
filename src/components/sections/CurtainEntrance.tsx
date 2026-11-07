import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { Language } from '../../types/wedding';
import { musicPlayer } from '../../utils/audio';

interface CurtainEntranceProps {
  isOpen: boolean;
  onOpen: () => void;
  currentLang: Language;
}

export const CurtainEntrance: React.FC<CurtainEntranceProps> = ({
  isOpen,
  onOpen,
  currentLang,
}) => {
  const handleOpenClick = () => {
    musicPlayer.start().catch(() => {});
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none"
          onClick={handleOpenClick}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { delay: 0.9, duration: 0.6, ease: 'easeInOut' },
          }}
        >
          {/* ============================================================ */}
          {/* 1. LEFT SLIDING ROYAL CARD DOOR                              */}
          {/* ============================================================ */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#240407] via-[#3D0A11] to-[#4E0F17] border-r-2 border-[#D4AF37] shadow-[20px_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
            initial={{ x: 0 }}
            exit={{
              x: '-102%',
              transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
            }}
          >
            {/* Royal Gold Damask & Jacquard Micro-Texture */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

            {/* Inner Gold Foil Frame */}
            <div className="absolute inset-3 sm:inset-6 border border-gold-400/40 rounded-l-2xl border-r-0 pointer-events-none" />
            <div className="absolute inset-5 sm:inset-9 border border-gold-400/20 rounded-l-xl border-r-0 pointer-events-none" />

            {/* Left Corner Ornaments */}
            <div className="absolute top-6 left-6 sm:top-12 sm:left-12 w-6 sm:w-10 h-6 sm:h-10 border-t-2 border-l-2 border-gold-400/90 pointer-events-none" />
            <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 w-6 sm:w-10 h-6 sm:h-10 border-b-2 border-l-2 border-gold-400/90 pointer-events-none" />

            {/* Subtle Vertical Seam Trim */}
            <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300 opacity-80" />
          </motion.div>

          {/* ============================================================ */}
          {/* 2. RIGHT SLIDING ROYAL CARD DOOR                             */}
          {/* ============================================================ */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#240407] via-[#3D0A11] to-[#4E0F17] border-l-2 border-[#D4AF37] shadow-[-20px_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
            initial={{ x: 0 }}
            exit={{
              x: '102%',
              transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
            }}
          >
            {/* Royal Gold Damask & Jacquard Micro-Texture */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

            {/* Inner Gold Foil Frame */}
            <div className="absolute inset-3 sm:inset-6 border border-gold-400/40 rounded-r-2xl border-l-0 pointer-events-none" />
            <div className="absolute inset-5 sm:inset-9 border border-gold-400/20 rounded-r-xl border-l-0 pointer-events-none" />

            {/* Right Corner Ornaments */}
            <div className="absolute top-6 right-6 sm:top-12 sm:right-12 w-6 sm:w-10 h-6 sm:h-10 border-t-2 border-r-2 border-gold-400/90 pointer-events-none" />
            <div className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 w-6 sm:w-10 h-6 sm:h-10 border-b-2 border-r-2 border-gold-400/90 pointer-events-none" />

            {/* Subtle Vertical Seam Trim */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300 opacity-80" />
          </motion.div>

          {/* ============================================================ */}
          {/* 3. CENTER REVEAL EMBLEM & "OPEN INVITATION" BUTTON           */}
          {/* ============================================================ */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-[90vw] sm:max-w-md flex flex-col items-center justify-center pointer-events-auto px-4 text-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 0.85,
              opacity: 0,
              transition: { duration: 0.45, ease: 'easeIn' },
            }}
          >
            {/* Glowing Golden Backlight Aura */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-pulse" />

            {/* Royal Gold Invitation Plaque */}
            <div className="relative w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#2E0509]/95 via-[#4A0E17]/95 to-[#240407]/95 border-2 border-gold-400/80 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.35)] backdrop-blur-xl">
              {/* Corner Gold Inset Accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-400" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-400" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-400" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-400" />

              {/* Invocation Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 rounded-full bg-gold-400/15 border border-gold-400/40 text-[10px] sm:text-xs font-semibold tracking-widest text-[#FDF0CD] uppercase mb-4">
                <span>{currentLang === 'en' ? '|| Sri Mahaganapathaye Namaha ||' : '|| ಶ್ರೀ ಮಹಾಗಣಪತಯೇ ನಮಃ ||'}</span>
              </div>

              {/* Tagline */}
              <div className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] uppercase text-gold-300 font-semibold mb-1">
                {currentLang === 'en' ? 'Wedding Invitation' : 'ಶುಭ ವಿವಾಹ ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ'}
              </div>

              {/* Grand Couple Names */}
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#FFF6DF] tracking-wide my-2 drop-shadow-md">
                Akarsh <span className="text-gold-400 font-light font-italiana">&</span> Manasa
              </h1>

              {/* Date & Location */}
              <div className="text-xs sm:text-sm font-sans text-gold-200/90 font-medium tracking-wider mb-6 flex items-center justify-center gap-1.5">
                <span>12 & 13 December 2026</span>
                <span className="inline-block w-1 h-1 rounded-full bg-gold-400" />
                <span>Bengaluru</span>
              </div>

              {/* Primary "Open Invitation" Button */}
              <motion.button
                type="button"
                onClick={handleOpenClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto mx-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE89E] to-[#C59B27] text-maroon-950 font-cinzel font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_25px_rgba(212,175,55,0.4)] border border-[#FFF9C4] flex items-center justify-center gap-2.5 cursor-pointer hover:brightness-110 transition-all"
              >
                <Sparkles size={16} className="text-maroon-900 animate-spin-slow shrink-0" />
                <span className="whitespace-nowrap font-bold drop-shadow-sm">
                  {currentLang === 'en' ? 'Open Invitation' : 'ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ ತೆರೆಯಿರಿ'}
                </span>
                <Sparkles size={16} className="text-maroon-900 animate-spin-slow shrink-0" />
              </motion.button>

              <div className="mt-3.5 text-[10px] sm:text-xs text-gold-300/75 font-sans tracking-widest uppercase">
                {currentLang === 'en' ? 'Tap anywhere to open the royal card' : 'ತೆರೆಯಲು ಎಲ್ಲಿಯಾದರೂ ಸ್ಪರ್ಶಿಸಿ'}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
