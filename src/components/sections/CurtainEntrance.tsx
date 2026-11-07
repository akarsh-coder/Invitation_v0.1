import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FBF9F5] select-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* Subtle modern backdrop gradient & hairline grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#C59B27_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F7F2EA]/60 to-[#EFE7DC]/80 pointer-events-none" />

          {/* Luxury Modern Invitation Envelope / Folio Card */}
          <motion.div
            className="relative z-10 w-full max-w-lg bg-[#FFFDF9] border border-gold-400/60 rounded-3xl p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(90,24,24,0.12)] text-center cursor-pointer group"
            onClick={handleOpenClick}
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0, transition: { duration: 0.6 } }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Minimalist Gold Corner Insets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold-500/70" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold-500/70" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold-500/70" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold-500/70" />

            {/* Ganapathi Invocation Tag */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gold-500/10 border border-gold-400/40 text-[11px] font-semibold tracking-widest text-gold-700 uppercase mb-6">
              <span>{currentLang === 'en' ? '|| Sri Mahaganapathaye Namaha ||' : '|| ಶ್ರೀ ಮಹಾಗಣಪತಯೇ ನಮಃ ||'}</span>
            </div>

            {/* Modern Monogram Badge */}
            <div className="mx-auto w-24 h-24 rounded-full border border-gold-400/70 bg-gradient-to-b from-[#FFFDF9] to-[#F7F2EA] flex items-center justify-center shadow-sm relative mb-6 group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-1 rounded-full border border-dashed border-gold-300/80" />
              <div className="font-cinzel text-2xl font-bold tracking-widest text-maroon-900">
                A <span className="text-gold-600 font-light">&</span> M
              </div>
            </div>

            {/* Sub-label */}
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-maroon-800/70 font-sans font-semibold mb-2">
              {currentLang === 'en' ? 'Wedding Invitation' : 'ಶುಭ ವಿವಾಹ ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ'}
            </div>

            {/* Names */}
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-maroon-950 tracking-wide mb-3">
              Akarsh <span className="text-gold-600 font-light">&</span> Manasa
            </h1>

            {/* Dates */}
            <div className="text-xs sm:text-sm font-sans text-maroon-900/80 font-medium tracking-wider mb-8">
              {currentLang === 'en' ? '12 & 13 December 2026 • Bengaluru' : '12 & 13 ಡಿಸೆಂಬರ್ 2026 • ಬೆಂಗಳೂರು'}
            </div>

            {/* Modern Pill CTA */}
            <div className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-maroon-800 to-maroon-900 text-gold-100 font-semibold text-xs sm:text-sm tracking-wide shadow-md group-hover:shadow-gold-subtle group-hover:from-maroon-700 group-hover:to-maroon-800 transition-all duration-300">
              <Sparkles size={14} className="text-gold-300" />
              <span>{currentLang === 'en' ? 'Open Invitation' : 'ಆಮಂತ್ರಣವನ್ನು ವೀಕ್ಷಿಸಿ'}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="mt-4 text-[10px] text-maroon-900/50 uppercase tracking-widest">
              {currentLang === 'en' ? 'Tap anywhere to enter' : 'ತೆರೆಯಲು ಸ್ಪರ್ಶಿಸಿ'}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
