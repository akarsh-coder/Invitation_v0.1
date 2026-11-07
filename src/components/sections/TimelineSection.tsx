import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Download, ExternalLink, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { GoldDivider } from '../ornaments/GoldDivider';
import type { WeddingContent, Language } from '../../types/wedding';
import { generateGoogleCalendarUrl, downloadICSFile } from '../../utils/calendar';

interface TimelineSectionProps {
  content: WeddingContent;
  currentLang: Language;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ content, currentLang }) => {
  return (
    <section id="ceremonies" className="relative py-16 px-4 sm:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gold-700 uppercase font-sans">
          {currentLang === 'en' ? 'Itinerary' : 'ಶುಭ ಕಾರ್ಯಕ್ರಮಗಳು'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-maroon-900 mt-1">
          {currentLang === 'en' ? 'Wedding Ceremonies' : 'ಕಾರ್ಯಕ್ರಮಗಳ ವಿವರ'}
        </h2>
        <GoldDivider variant="simple" className="my-4 max-w-xs" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {content.events.map((event, index) => {
          const isMuhurtha = event.type === 'muhurtha';

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              className="flex"
            >
              <Card
                className={`flex-1 flex flex-col justify-between p-6 sm:p-7 ${
                  isMuhurtha
                    ? 'border-1.5 border-gold-500 bg-gradient-to-b from-white via-[#FCFBF7] to-[#F9F5EC] shadow-md ring-1 ring-gold-400/40'
                    : 'border border-gold-300/60 hover:border-gold-400'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                        isMuhurtha
                          ? 'bg-maroon-800 text-gold-200 shadow-sm'
                          : 'bg-gold-500/10 text-maroon-900 border border-gold-400/30'
                      }`}
                    >
                      {isMuhurtha && <Sparkles size={11} className="text-gold-300" />}
                      <span>{currentLang === 'en' ? event.title : event.titleKannada}</span>
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-maroon-950 mb-3">
                    {currentLang === 'en' ? event.title : event.titleKannada}
                  </h3>

                  {/* Makara Lagna Highlight (Muhurtha only - Clean & Modern) */}
                  {isMuhurtha && event.lagna && (
                    <div className="my-3 px-3.5 py-2 rounded-xl bg-gold-100/70 border border-gold-400/60 flex items-center justify-between">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-maroon-800">
                        {currentLang === 'en' ? 'Lagna' : 'ಲಗ್ನ'}
                      </span>
                      <span className="text-xs sm:text-sm font-serif font-bold text-maroon-950">
                        {currentLang === 'en' ? event.lagna : event.lagnaKannada}
                      </span>
                    </div>
                  )}

                  {/* Details List */}
                  <div className="space-y-3 mt-4 text-xs sm:text-sm text-maroon-900/90 font-sans">
                    {/* Date */}
                    <div className="flex items-start gap-2.5">
                      <Calendar size={15} className="text-gold-600 shrink-0 mt-0.5" />
                      <div className="font-semibold text-maroon-950">
                        {currentLang === 'en' ? event.date : event.dateKannada}
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-2.5">
                      <Clock size={15} className="text-gold-600 shrink-0 mt-0.5" />
                      <div className="font-semibold text-maroon-950">
                        {currentLang === 'en' ? event.time : event.timeKannada}
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-start gap-2.5">
                      <MapPin size={15} className="text-gold-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-maroon-950 font-serif">
                          {currentLang === 'en' ? event.venueName : event.venueNameKannada}
                        </div>
                        <div className="text-[11px] text-maroon-700/80 mt-0.5 leading-tight">
                          {currentLang === 'en' ? event.venueAddress : event.venueAddressKannada}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons (Add to Calendar & Map) */}
                <div className="mt-6 pt-4 border-t border-gold-300/40 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Add to Google Calendar */}
                    <a
                      href={generateGoogleCalendarUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        variant={isMuhurtha ? 'gold' : 'outline'}
                        size="sm"
                        icon={<ExternalLink size={12} />}
                        className="w-full text-[11px] py-1.5"
                      >
                        {currentLang === 'en' ? 'Google Cal' : 'ಕ್ಯಾಲೆಂಡರ್'}
                      </Button>
                    </a>

                    {/* Download ICS file */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadICSFile(event)}
                      icon={<Download size={12} />}
                      className="w-full text-[11px] py-1.5"
                    >
                      {currentLang === 'en' ? '.ICS File' : '.ICS ಫೈಲ್'}
                    </Button>
                  </div>

                  {/* Directions Button */}
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <button
                      type="button"
                      className="w-full py-1 text-center text-[11px] text-gold-700 hover:text-maroon-900 font-medium hover:underline flex items-center justify-center gap-1 transition-colors"
                    >
                      <MapPin size={11} />
                      <span>{currentLang === 'en' ? 'View Location Map' : 'ನಕ್ಷೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ'}</span>
                    </button>
                  </a>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
