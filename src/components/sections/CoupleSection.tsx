import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import type { WeddingContent, Language } from '../../types/wedding';
import { resolvePhoto } from '../../utils/image';

interface CoupleSectionProps {
  content: WeddingContent;
  currentLang: Language;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ content, currentLang }) => {
  const groomPhoto = resolvePhoto(content.photos.groomPortrait, content.photos.groomPortraitDummy);
  const bridePhoto = resolvePhoto(content.photos.bridePortrait, content.photos.bridePortraitDummy);

  return (
    <section className="relative py-16 px-4 sm:px-8 max-w-5xl mx-auto z-10">
      {/* Section Subtitle */}
      <div className="text-center mb-12">
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gold-700 uppercase font-sans">
          {currentLang === 'en' ? 'The Couple' : 'ವರ ಹಾಗೂ ವಧು'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-maroon-900 mt-1">
          Akarsh <span className="text-gold-600 font-light font-italiana">&</span> Manasa
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
        {/* GROOM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex"
        >
          <Card className="w-full text-center p-6 sm:p-8 flex flex-col justify-between border border-gold-400/50 hover:border-gold-500 shadow-sm transition-all duration-300">
            <div>
              {/* Badge */}
              <div className="inline-block px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-maroon-900 text-xs font-semibold tracking-wider uppercase mb-5 font-sans">
                {currentLang === 'en' ? 'The Groom' : 'ವರ'}
              </div>

              {/* Groom Portrait Frame */}
              <div className="mx-auto mb-6 w-36 h-48 sm:w-44 sm:h-56 rounded-t-full rounded-b-2xl overflow-hidden p-1 bg-gradient-to-b from-gold-300 via-gold-400/40 to-gold-200 shadow-md group">
                <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-champagne-100">
                  <img
                    src={groomPhoto}
                    alt={content.groom.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Traditional Prefix */}
              <div className="text-xs font-serif italic text-gold-700 tracking-wider mb-1">
                {content.groom.prefix}
              </div>

              {/* Groom Name */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-maroon-950 mb-3">
                {content.groom.name}
              </h3>
            </div>

            {/* Parentage details */}
            <div className="pt-4 border-t border-gold-300/40 text-xs sm:text-sm text-maroon-800/85 leading-relaxed font-sans">
              <span className="font-semibold text-maroon-950 block text-[11px] uppercase tracking-wider text-gold-700 mb-1">
                {currentLang === 'en' ? 'Son of' : 'ಇವರ ಪುತ್ರ'}
              </span>
              <p className="font-serif text-sm sm:text-base text-maroon-900 font-medium">
                {content.groom.parents}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* BRIDE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex"
        >
          <Card className="w-full text-center p-6 sm:p-8 flex flex-col justify-between border border-gold-400/50 hover:border-gold-500 shadow-sm transition-all duration-300">
            <div>
              {/* Badge */}
              <div className="inline-block px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-maroon-900 text-xs font-semibold tracking-wider uppercase mb-5 font-sans">
                {currentLang === 'en' ? 'The Bride' : 'ವಧು'}
              </div>

              {/* Bride Portrait Frame */}
              <div className="mx-auto mb-6 w-36 h-48 sm:w-44 sm:h-56 rounded-t-full rounded-b-2xl overflow-hidden p-1 bg-gradient-to-b from-gold-300 via-gold-400/40 to-gold-200 shadow-md group">
                <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-champagne-100">
                  <img
                    src={bridePhoto}
                    alt={content.bride.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Traditional Prefix */}
              <div className="text-xs font-serif italic text-gold-700 tracking-wider mb-1">
                {content.bride.prefix}
              </div>

              {/* Bride Name */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-maroon-950 mb-3">
                {content.bride.name}
              </h3>
            </div>

            {/* Parentage details */}
            <div className="pt-4 border-t border-gold-300/40 text-xs sm:text-sm text-maroon-800/85 leading-relaxed font-sans">
              <span className="font-semibold text-maroon-950 block text-[11px] uppercase tracking-wider text-gold-700 mb-1">
                {currentLang === 'en' ? 'Daughter of' : 'ಇವರ ಸುಪುತ್ರಿ'}
              </span>
              <p className="font-serif text-sm sm:text-base text-maroon-900 font-medium">
                {content.bride.parents}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Central Modern Union Symbol */}
      <div className="my-8 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-3 text-gold-600">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400" />
          <div className="w-8 h-8 rounded-full border border-gold-400/70 flex items-center justify-center bg-white shadow-sm text-maroon-900 font-cinzel text-xs font-bold">
            &
          </div>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400" />
        </div>
      </div>
    </section>
  );
};
