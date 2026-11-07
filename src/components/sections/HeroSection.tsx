import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
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
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-8 text-center">
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

        {/* Featured Engagement Couple Portrait (Made significantly bigger & grander) */}
        <motion.div
          className="my-10 relative group"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Outer Royal Gold Glow */}
          <div className="absolute -inset-4 bg-gradient-to-b from-amber-300/20 via-gold-400/20 to-transparent rounded-t-[200px] rounded-b-[40px] blur-xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Arched Luxury Gold Frame */}
          <div className="relative w-72 h-[380px] sm:w-[350px] sm:h-[470px] md:w-[410px] md:h-[540px] rounded-t-[190px] rounded-b-3xl overflow-hidden p-2 bg-gradient-to-b from-[#FFE89E] via-[#D4AF37] to-[#8C6D18] shadow-2xl">
            <div className="w-full h-full rounded-t-[180px] rounded-b-2xl overflow-hidden relative bg-[#F7F2EA]">
              <img
                src={heroImage}
                alt="Akarsh & Manasa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Subtle Warm Inset Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
            </div>
          </div>

          {/* Prominent "Forever & Always" Badge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-white/95 border border-gold-400/80 shadow-lg text-xs font-sans font-bold uppercase tracking-wider text-maroon-950 flex items-center gap-2 backdrop-blur-md">
            <Sparkles size={12} className="text-gold-600 animate-spin-slow" />
            <Heart size={13} className="text-rose-600 fill-rose-600" />
            <span>Forever & Always</span>
            <Sparkles size={12} className="text-gold-600 animate-spin-slow" />
          </div>
        </motion.div>

        {/* Lead Phrase: Together with their families */}
        <div className="font-serif italic text-base sm:text-xl text-maroon-800/90 mb-5 mt-4">
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
