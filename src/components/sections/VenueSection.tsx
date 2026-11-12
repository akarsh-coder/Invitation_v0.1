import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GoldDivider } from '../ornaments/GoldDivider';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollMotion';
import { useWeddingContent } from '../../store/weddingStore';
import { useUiStore } from '../../store/uiStore';

export const VenueSection: React.FC = () => {
  const content = useWeddingContent();
  const selectedVenue = useUiStore((state) => state.selectedVenue);
  const setSelectedVenue = useUiStore((state) => state.setSelectedVenue);

  const isBlr = selectedVenue === 'bengaluru';
  const currentVenue = isBlr ? content.mainVenue : content.hiremagaluruVenue;

  const steps = isBlr
    ? ['Mysore Road', 'Ullal Main Road', '8th Cross, Jnana Jyothi Nagar']
    : ['Chikkamagaluru', 'Hiremagaluru', 'Near the Kodandarama Temple'];

  const note = isBlr
    ? 'Near Bangalore University. Parking is available at the mantapa.'
    : 'A short drive into Hiremagaluru. Parking is available at the mantapa.';

  return (
    <section id="venue" className="relative py-10 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto z-10">
      <ScrollReveal className="text-center">
        <p className="text-[11px] sm:text-xs uppercase text-gold-700 font-sans">Locations</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-4xl text-maroon-950">How to arrive</h2>
        <GoldDivider variant="simple" className="my-4 max-w-xs" />
      </ScrollReveal>

      

      <ScrollReveal className="flex justify-center mt-6 sm:mt-8 mb-8 sm:mb-10" delay={0.08}>
        <div className="inline-flex w-full max-w-xs p-1 bg-[#FDFBF8] shadow-sm">
          <button
            type="button"
            onClick={() => setSelectedVenue('bengaluru')}
            className={`flex-1 px-3 sm:px-5 py-2.5 text-xs sm:text-sm ${
              isBlr ? 'bg-maroon-900 text-gold-100' : 'text-maroon-900'
            }`}
          >
            Bengaluru
          </button>
          <button
            type="button"
            onClick={() => setSelectedVenue('hiremagaluru')}
            className={`flex-1 px-3 sm:px-5 py-2.5 text-xs sm:text-sm ${
              !isBlr ? 'bg-maroon-900 text-gold-100' : 'text-maroon-900'
            }`}
          >
            Hiremagaluru
          </button>
        </div>
      </ScrollReveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedVenue}
          className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 lg:gap-16 items-start"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="text-[11px] uppercase text-gold-700 font-sans">
              {isBlr
                ? 'Reception, 12 December · Muhurtha, 13 December'
                : 'Reception, 16 December'}
            </p>
            <h3 className="mt-3 font-serif text-2xl sm:text-4xl text-maroon-950 leading-tight">
              {currentVenue.name}
            </h3>
            <p className="mt-4 font-cormorant text-base sm:text-lg text-maroon-900 leading-relaxed">
              {currentVenue.address}
            </p>
            <p className="mt-3 text-sm text-maroon-800/75 font-sans">{note}</p>
            <div className="mt-6 sm:mt-8">
              <a href={currentVenue.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="md">
                  {content.actions.getDirections}
                </Button>
              </a>
            </div>
          </div>

          <div>
            <p className="font-cormorant italic text-lg sm:text-xl text-maroon-800">The way there</p>
            <ol className="relative mt-5 sm:mt-6 ml-3 border-l border-gold-500/50 pl-6 space-y-4 sm:space-y-5">
              {steps.map((step, index) => (
                <li key={step} className="relative">
                  <span className="absolute -left-[1.72rem] top-1.5 h-2 w-2 rounded-full bg-gold-500" />
                  <span className="block text-[11px] uppercase text-gold-700 font-sans">
                    {`Step ${index + 1}`}
                  </span>
                  <span className="font-serif text-base sm:text-lg text-maroon-950">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
