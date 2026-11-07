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
          className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none perspective-[1400px]"
          onClick={handleOpenClick}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { delay: 0.8, duration: 0.8, ease: 'easeInOut' },
          }}
        >
          {/* ============================================================ */}
          {/* 1. LEFT SLIDING INVITATION CARD (Door 1)                     */}
          {/* ============================================================ */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#2E0707] via-[#4A0E17] to-[#3B0909] border-r border-[#D4AF37] shadow-[15px_0_40px_rgba(0,0,0,0.6)] flex flex-col justify-between p-6 sm:p-12 overflow-hidden"
            initial={{ x: 0 }}
            exit={{
              x: '-102%',
              rotateY: -15,
              transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            {/* Royal Gold Jacquard Micro-Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1.2px,transparent_1.2px)] [background-size:28px_28px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />

            {/* Inner Ornate Gold Border Frame on Left Card */}
            <div className="absolute inset-3 sm:inset-6 border border-gold-400/40 rounded-l-2xl border-r-0 pointer-events-none" />
            <div className="absolute inset-5 sm:inset-9 border border-gold-400/25 rounded-l-xl border-r-0 pointer-events-none" />

            {/* Left Corner Flourishes */}
            <div className="absolute top-8 left-8 sm:top-12 sm:left-12 w-8 h-8 border-t-2 border-l-2 border-gold-400/80 pointer-events-none" />
            <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 w-8 h-8 border-b-2 border-l-2 border-gold-400/80 pointer-events-none" />

            {/* Top Content: Invocation & Sacred Crest */}
            <div className="relative z-10 text-left pt-6 sm:pt-10 pl-2 sm:pl-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-[10px] sm:text-xs font-semibold tracking-widest text-[#FDF0CD] uppercase">
                <span>{currentLang === 'en' ? '|| Sri Mahaganapathaye Namaha ||' : '|| ಶ್ರೀ ಮಹಾಗಣಪತಯೇ ನಮಃ ||'}</span>
              </div>
              <div className="mt-4 font-serif text-xs sm:text-sm text-gold-200/80 tracking-widest uppercase">
                {currentLang === 'en' ? 'Auspicious Union' : 'ಶುಭ ವಿವಾಹ ಆಹ್ವಾನ'}
              </div>
            </div>

            {/* Center Content: Left half of royal watermark */}
            <div className="relative z-10 my-auto text-right pr-6 sm:pr-12 opacity-20 hidden sm:block pointer-events-none">
              <div className="font-serif text-8xl font-black text-gold-400 tracking-tighter">
                A
              </div>
            </div>

            {/* Bottom Content: Host Family Inscription */}
            <div className="relative z-10 pb-6 sm:pb-10 pl-2 sm:pl-4 text-left">
              <div className="text-[10px] sm:text-xs text-gold-300/80 uppercase tracking-widest font-sans font-semibold">
                {currentLang === 'en' ? 'Groom Side' : 'ವರನ ಕುಟುಂಬ'}
              </div>
              <div className="font-serif text-xs sm:text-sm text-gold-100 font-medium mt-0.5">
                {currentLang === 'en' ? 'Savithri & Ravishankar K.S.' : 'ಸಾವಿತ್ರಿ ಮತ್ತು ರವಿಶಂಕರ್ ಕೆ.ಎಸ್.'}
              </div>
              <div className="text-[10px] text-gold-400/60 font-sans">
                Hiremagaluru
              </div>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* 2. RIGHT SLIDING INVITATION CARD (Door 2)                    */}
          {/* ============================================================ */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#2E0707] via-[#4A0E17] to-[#3B0909] border-l border-[#D4AF37] shadow-[-15px_0_40px_rgba(0,0,0,0.6)] flex flex-col justify-between p-6 sm:p-12 overflow-hidden"
            initial={{ x: 0 }}
            exit={{
              x: '102%',
              rotateY: 15,
              transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            {/* Royal Gold Jacquard Micro-Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1.2px,transparent_1.2px)] [background-size:28px_28px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/30 pointer-events-none" />

            {/* Inner Ornate Gold Border Frame on Right Card */}
            <div className="absolute inset-3 sm:inset-6 border border-gold-400/40 rounded-r-2xl border-l-0 pointer-events-none" />
            <div className="absolute inset-5 sm:inset-9 border border-gold-400/25 rounded-r-xl border-l-0 pointer-events-none" />

            {/* Right Corner Flourishes */}
            <div className="absolute top-8 right-8 sm:top-12 sm:right-12 w-8 h-8 border-t-2 border-r-2 border-gold-400/80 pointer-events-none" />
            <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 w-8 h-8 border-b-2 border-r-2 border-gold-400/80 pointer-events-none" />

            {/* Top Content: Wedding Date & Year */}
            <div className="relative z-10 text-right pt-6 sm:pt-10 pr-2 sm:pr-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-[10px] sm:text-xs font-semibold tracking-widest text-[#FDF0CD] uppercase">
                <span>12 • 13 Dec 2026</span>
              </div>
              <div className="mt-4 font-serif text-xs sm:text-sm text-gold-200/80 tracking-widest uppercase">
                Bengaluru • Karnataka
              </div>
            </div>

            {/* Center Content: Right half of royal watermark */}
            <div className="relative z-10 my-auto text-left pl-6 sm:pl-12 opacity-20 hidden sm:block pointer-events-none">
              <div className="font-serif text-8xl font-black text-gold-400 tracking-tighter">
                M
              </div>
            </div>

            {/* Bottom Content: Bride Host Family Inscription */}
            <div className="relative z-10 pb-6 sm:pb-10 pr-2 sm:pr-4 text-right">
              <div className="text-[10px] sm:text-xs text-gold-300/80 uppercase tracking-widest font-sans font-semibold">
                {currentLang === 'en' ? 'Bride Side' : 'ವಧುವಿನ ಕುಟುಂಬ'}
              </div>
              <div className="font-serif text-xs sm:text-sm text-gold-100 font-medium mt-0.5">
                {currentLang === 'en' ? 'Sulochana S. & Ramamurthy K.A.' : 'ಸುಲೋಚನ ಎಸ್. ಮತ್ತು ರಾಮಮೂರ್ತಿ ಕೆ.ಎ.'}
              </div>
              <div className="text-[10px] text-gold-400/60 font-sans">
                Bengaluru
              </div>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* 3. CENTER BUTTON "Open Invitation" (DEAD CENTER)             */}
          {/* ============================================================ */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 0.8,
              opacity: 0,
              transition: { duration: 0.4, ease: 'easeIn' },
            }}
          >
            {/* Glowing Golden Aura */}
            <div className="absolute w-72 h-36 rounded-full bg-amber-400/25 blur-3xl animate-pulse pointer-events-none" />

            {/* Perfectly Centered "Open Invitation" Button */}
            <motion.button
              type="button"
              onClick={handleOpenClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE89E] to-[#C59B27] text-maroon-950 font-cinzel font-bold text-sm sm:text-base tracking-[0.2em] uppercase shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(212,175,55,0.45)] border-2 border-[#FFF9C4] flex items-center gap-3 cursor-pointer group hover:brightness-110 transition-all"
            >
              <Sparkles size={18} className="text-maroon-900 animate-spin-slow shrink-0" />
              <span className="whitespace-nowrap font-bold drop-shadow-sm">
                {currentLang === 'en' ? 'Open Invitation' : 'ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ'}
              </span>
              <Sparkles size={18} className="text-maroon-900 animate-spin-slow shrink-0" />
            </motion.button>

            <div className="mt-4 text-xs text-gold-200/90 font-sans tracking-widest uppercase font-medium">
              {currentLang === 'en' ? 'Tap anywhere to open' : 'ತೆರೆಯಲು ಎಲ್ಲಿಯಾದರೂ ಸ್ಪರ್ಶಿಸಿ'}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
