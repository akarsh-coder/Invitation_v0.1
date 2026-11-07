import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Heart, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { GoldDivider } from '../ornaments/GoldDivider';
import type { WeddingPhotos, Language } from '../../types/wedding';
import { resolvePhoto } from '../../utils/image';

interface EngagementGalleryProps {
  photos: WeddingPhotos;
  currentLang: Language;
}

export const EngagementGallery: React.FC<EngagementGalleryProps> = ({ photos, currentLang }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCaption, setActiveCaption] = useState<string>('');

  const openLightbox = (imgUrl: string, caption: string) => {
    setSelectedImage(imgUrl);
    setActiveCaption(caption);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section className="relative py-16 px-4 sm:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/40 text-[11px] font-semibold tracking-[0.25em] text-gold-700 uppercase mb-2">
          <Camera size={12} className="text-gold-600" />
          <span>{currentLang === 'en' ? 'Engagement Moments' : 'ನಿಶ್ಚಿತಾರ್ಥದ ನೆನಪುಗಳು'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-maroon-950 mt-1">
          {currentLang === 'en' ? 'Our Journey of Love' : 'ಒಲವಿನ ಸುಂದರ ಪಯಣ'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-maroon-800/80 max-w-md mx-auto font-sans">
          {currentLang === 'en'
            ? 'Glances into our beginning, filled with laughter, vows, and timeless memories.'
            : 'ಪ್ರೀತಿಯ ಪಯಣದ ಸವಿ ನೆನಪುಗಳ ಸುಂದರ ಝಲಕ್.'}
        </p>
        <GoldDivider variant="simple" className="my-4 max-w-xs" />
      </div>

      {/* Modern Editorial Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {photos.gallery.map((item, idx) => {
          const resolvedUrl = resolvePhoto(item.url, item.dummyUrl);
          const title = currentLang === 'en' ? item.titleEn : item.titleKn;
          const dateTag = currentLang === 'en' ? item.dateEn : item.dateKn;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(resolvedUrl, title)}
            >
              <Card className="p-2 sm:p-2.5 overflow-hidden border border-gold-300/60 hover:border-gold-500 transition-all duration-300 shadow-sm">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-champagne-100">
                  <img
                    src={resolvedUrl}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Elegant Gradient Inset Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] font-sans tracking-widest uppercase text-gold-300 font-semibold mb-0.5">
                      {dateTag}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-semibold leading-snug">
                      {title}
                    </h4>
                    <span className="text-[10px] text-gold-200/80 flex items-center gap-1 mt-1 font-sans">
                      <Sparkles size={10} /> View full photo
                    </span>
                  </div>
                </div>

                {/* Bottom Minimalist Label */}
                <div className="pt-3 pb-1 px-2 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-maroon-900 group-hover:text-gold-700 transition-colors">
                      {title}
                    </h4>
                    <span className="text-[10px] text-maroon-700/70 font-sans block mt-0.5">
                      {dateTag}
                    </span>
                  </div>
                  <Heart size={14} className="text-gold-500 group-hover:fill-gold-500 transition-colors" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] bg-[#FAF8F5] rounded-2xl overflow-hidden border border-gold-400 p-2 sm:p-3 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>

              <div className="relative rounded-xl overflow-hidden max-h-[75vh] flex items-center justify-center bg-black">
                <img
                  src={selectedImage}
                  alt={activeCaption}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              <div className="p-3 text-center">
                <div className="font-serif text-base sm:text-lg font-bold text-maroon-950">
                  {activeCaption}
                </div>
                <div className="text-xs text-gold-700 font-sans mt-0.5">
                  Akarsh & Manasa • Engagement Moments
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
