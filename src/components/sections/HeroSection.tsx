import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { GoldDivider } from '../ornaments/GoldDivider';
import type { WeddingContent, Language } from '../../types/wedding';
import { resolvePhoto } from '../../utils/image';

interface HeroSectionProps {
  content: WeddingContent;
  currentLang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content, currentLang }) => {
  const heroImage = resolvePhoto(content.photos.heroCouple, content.photos.heroCoupleDummy);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-8 text-center">
      <motion.div
        className="max-w-4xl mx-auto flex flex-col items-center z-10 w-full"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {/* Sole Invocation: Ganapathi Only */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-gold-400/50 bg-white/80 shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-maroon-900 uppercase font-sans">
              {content.invocation.ganapathi}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
          </div>
        </div>

        {/* Modern High-Editorial Names */}
        <div className="my-2">
          <div className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-gold-700 font-semibold mb-3">
            {content.headerTagline}
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-maroon-950 tracking-tight leading-none">
            Akarsh <span className="text-gold-600 font-light font-italiana">&</span> Manasa
          </h1>
          <div className="text-xs sm:text-sm font-sans text-maroon-800/80 tracking-widest uppercase mt-3 font-medium">
            12 & 13 December 2026 • Bengaluru
          </div>
        </div>

        {/* Featured Engagement Couple Portrait (with fallback to dummy) */}
        <motion.div
          className="my-8 relative group"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="relative w-44 h-56 sm:w-56 sm:h-72 rounded-t-[100px] rounded-b-2xl overflow-hidden p-1 bg-gradient-to-b from-gold-300 via-gold-400/50 to-gold-300 shadow-luxury-card">
            <div className="w-full h-full rounded-t-[96px] rounded-b-xl overflow-hidden relative">
              <img
                src={heroImage}
                alt="Akarsh & Manasa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/95 border border-gold-400/60 shadow-sm text-[10px] font-sans font-semibold uppercase tracking-wider text-maroon-900 flex items-center gap-1.5">
            <Heart size={10} className="text-gold-600 fill-gold-600" />
            <span>Forever</span>
          </div>
        </motion.div>

        {/* Lead Phrase: Together with their families */}
        <div className="font-serif italic text-base sm:text-xl text-maroon-800/90 mb-5">
          {content.hosts.invitationLead}
        </div>

        {/* Two Families Presented Equitably and Elegantly */}
        <div className="w-full max-w-3xl my-2 p-6 sm:p-8 rounded-2xl bg-white/80 border border-gold-300/50 backdrop-blur-md shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center text-center">
            {/* Groom's Parents */}
            <div className="space-y-1 md:border-r md:border-gold-300/40 md:pr-4">
              <div className="text-[11px] uppercase tracking-wider text-gold-700 font-semibold font-sans">
                {currentLang === 'en' ? "Groom's Parents" : 'ವರನ ಪೋಷಕರು'}
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-maroon-950">
                {content.hosts.groomFamily.parents}
              </h3>
              <div className="text-xs text-maroon-800/70 font-sans">
                {content.hosts.groomFamily.origin}
              </div>
            </div>

            {/* Bride's Parents */}
            <div className="space-y-1 md:pl-4">
              <div className="text-[11px] uppercase tracking-wider text-gold-700 font-semibold font-sans">
                {currentLang === 'en' ? "Bride's Parents" : 'ವಧುವಿನ ಪೋಷಕರು'}
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-maroon-950">
                {content.hosts.brideFamily.parents}
              </h3>
              <div className="text-xs text-maroon-800/70 font-sans">
                {content.hosts.brideFamily.origin}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <GoldDivider variant="simple" className="my-6 max-w-md" />

        {/* Unified Invitation Text */}
        <motion.p
          className="max-w-2xl text-maroon-900/90 text-sm sm:text-base md:text-lg font-serif leading-relaxed px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          &ldquo;{content.invitationText}&rdquo;
        </motion.p>
      </motion.div>
    </section>
  );
};
