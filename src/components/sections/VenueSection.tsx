import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, Landmark, ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { GoldDivider } from '../ornaments/GoldDivider';
import type { WeddingContent, Language } from '../../types/wedding';

interface VenueSectionProps {
  content: WeddingContent;
  currentLang: Language;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ content, currentLang }) => {
  const [selectedVenue, setSelectedVenue] = useState<'bengaluru' | 'hiremagaluru'>('bengaluru');

  const isBlr = selectedVenue === 'bengaluru';
  const currentVenue = isBlr ? content.mainVenue : content.hiremagaluruVenue;

  return (
    <section id="venue" className="relative py-16 px-4 sm:px-8 max-w-5xl mx-auto z-10">
      {/* Section Title */}
      <div className="text-center mb-8">
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gold-700 uppercase font-sans">
          {currentLang === 'en' ? 'Locations' : 'ವಿವಾಹ ಸ್ಥಳಗಳು'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-maroon-900 mt-1">
          {currentLang === 'en' ? 'Venues & Directions' : 'ಸ್ಥಳ ಹಾಗೂ ಮಾರ್ಗದರ್ಶಿ'}
        </h2>
        <GoldDivider variant="simple" className="my-4 max-w-xs" />
      </div>

      {/* Modern Venue Switcher Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-full bg-gold-100/70 border border-gold-300/50 shadow-sm backdrop-blur-md">
          <button
            type="button"
            onClick={() => setSelectedVenue('bengaluru')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
              isBlr
                ? 'bg-gradient-to-r from-maroon-800 to-maroon-900 text-gold-100 shadow-sm'
                : 'text-maroon-900 hover:text-maroon-800'
            }`}
          >
            {currentLang === 'en' ? 'Bengaluru (Main Venue)' : 'ಬೆಂಗಳೂರು (ಮುಖ್ಯ ಮಂಟಪ)'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedVenue('hiremagaluru')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
              !isBlr
                ? 'bg-gradient-to-r from-maroon-800 to-maroon-900 text-gold-100 shadow-sm'
                : 'text-maroon-900 hover:text-maroon-800'
            }`}
          >
            {currentLang === 'en' ? 'Hiremagaluru (Reception)' : 'ಹಿರೇಮಗಳೂರು (ಆರತಕ್ಷತೆ)'}
          </button>
        </div>
      </div>

      {/* Venue Detail Card */}
      <motion.div
        key={selectedVenue}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border border-gold-300/80 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Venue Info & Quick Transit */}
            <div className="lg:col-span-7 space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-maroon-900 border border-gold-400/30 text-xs font-semibold uppercase tracking-wider">
                <MapPin size={12} className="text-gold-700" />
                <span>
                  {isBlr
                    ? (currentLang === 'en' ? 'Reception (Dec 12) & Muhurtha (Dec 13)' : 'ಆರತಕ್ಷತೆ (ಡಿ 12) & ಮುಹೂರ್ತ (ಡಿ 13)')
                    : (currentLang === 'en' ? 'Hiremagaluru Reception (Dec 16)' : 'ಹಿರೇಮಗಳೂರು ಆರತಕ್ಷತೆ (ಡಿ 16)')}
                </span>
              </div>

              {/* Venue Name */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-maroon-950 leading-tight">
                {currentVenue.name}
              </h3>

              {/* Full Address */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gold-50/50 border border-gold-300/40">
                <MapPin size={18} className="text-gold-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-maroon-900/90 leading-relaxed font-sans">
                  <div className="font-semibold text-maroon-950">
                    {currentVenue.address}
                  </div>
                  {isBlr && (
                    <div className="text-[11px] text-maroon-700/80 mt-1">
                      {currentLang === 'en'
                        ? 'Near Bangalore University campus / Ullal Upanagara'
                        : 'ಬೆಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ ಸಮೀಪ / ಉಳ್ಳಾಲ ಉಪನಗರ'}
                    </div>
                  )}
                </div>
              </div>

              {/* Transit & Amenities Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs text-maroon-900/85">
                  <Car size={15} className="text-gold-700 shrink-0" />
                  <span>
                    {currentLang === 'en' ? 'Parking space available' : 'ವಾಹನ ನಿಲುಗಡೆ ವ್ಯವಸ್ಥೆ ಇದೆ'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-maroon-900/85">
                  <Landmark size={15} className="text-gold-700 shrink-0" />
                  <span>
                    {isBlr
                      ? (currentLang === 'en' ? 'Accessible via Mysore Rd & Outer Ring Rd' : 'ಮೈಸೂರು ರಸ್ತೆ ಹಾಗೂ ರಿಂಗ್ ರಸ್ತೆಗೆ ಸುಲಭ ಸಂಪರ್ಕ')
                      : (currentLang === 'en' ? 'Near historic Kodandarama Temple' : 'ಐತಿಹಾಸಿಕ ಕೋದಂಡರಾಮ ಸ್ವಾಮಿ ದೇವಾಲಯದ ಸಮೀಪ')}
                  </span>
                </div>
              </div>

              {/* Action Button: Get Directions */}
              <div className="pt-3">
                <a
                  href={currentVenue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    variant="gold"
                    size="md"
                    icon={<Navigation size={15} className="text-maroon-950" />}
                  >
                    {content.actions.getDirections}
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column: Styled Map Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-gold-300 shadow-sm aspect-video sm:aspect-square flex flex-col justify-between p-5 bg-[#F6F2EA]">
                {/* Modern subtle map grid lines */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="px-3 py-1 rounded-full bg-white/95 border border-gold-300 text-[11px] font-semibold text-maroon-900 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span>{isBlr ? 'Bengaluru' : 'Hiremagaluru'}</span>
                  </div>
                  <a
                    href={currentVenue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-white/95 hover:bg-gold-50 text-maroon-800 border border-gold-300 shadow-sm transition-colors"
                    title="Open in Maps"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>

                {/* Center Pin */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                  <div className="w-12 h-12 rounded-full bg-maroon-800 text-gold-200 border-2 border-gold-400 flex items-center justify-center shadow-md">
                    <MapPin size={22} className="text-gold-300" />
                  </div>
                  <div className="mt-3 font-serif font-bold text-sm sm:text-base text-maroon-950 px-2 max-w-xs">
                    {currentVenue.name}
                  </div>
                  <div className="text-[11px] text-maroon-800/80 font-sans mt-0.5">
                    {currentVenue.address}
                  </div>
                </div>

                {/* Bottom Overlay Pill */}
                <div className="relative z-10 text-center">
                  <a
                    href={currentVenue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-maroon-800 text-gold-200 text-xs font-medium hover:bg-maroon-900 shadow-sm transition-all"
                  >
                    <span>{currentLang === 'en' ? 'Open in Google Maps' : 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ'}</span>
                    <Navigation size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};
