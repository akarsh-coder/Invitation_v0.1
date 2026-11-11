import React from 'react';
import { ScrollParallaxPhoto, ScrollReveal } from '../ui/ScrollMotion';
import { resolvePhoto } from '../../utils/image';
import { useWeddingContent } from '../../store/weddingStore';

export const CoupleSection: React.FC = () => {
  const content = useWeddingContent();
  const groomPhoto = resolvePhoto(content.photos.groomPortrait, content.photos.groomPortraitDummy);
  const bridePhoto = resolvePhoto(content.photos.bridePortrait, content.photos.bridePortraitDummy);

  return (
    <section className="relative py-6 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto z-10">
      <ScrollReveal>
        <p className="text-center text-[11px] sm:text-xs uppercase text-gold-700 font-sans">The couple</p>
      </ScrollReveal>

      <div className="mt-7 sm:mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-7 sm:gap-10 md:gap-6 items-center">
        <ScrollReveal direction="right" delay={0.05}>
          <figure className="text-center md:text-right">
            <ScrollParallaxPhoto intensity={16}>
              <div className="mx-auto md:ml-auto md:mr-0 w-full max-w-[220px] sm:max-w-[300px] md:max-w-[320px] aspect-[3/4] p-[2px] bg-gradient-to-b from-[#F3E0A0] via-[#C59B27] to-[#8C6D18] shadow-[0_20px_38px_-24px_rgba(74,21,21,0.45)]">
                <div className="h-full w-full overflow-hidden bg-[#EFE6D8]">
                  <img
                    src={groomPhoto}
                    alt={content.groom.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.035]"
                  />
                </div>
              </div>
            </ScrollParallaxPhoto>
            <p className="mt-4 sm:mt-5 font-cormorant italic text-gold-700">{content.groom.prefix}</p>
            <h3 className="mt-1 font-serif text-xl sm:text-3xl text-maroon-950">{content.groom.name}</h3>
            <p className="mt-2 text-[11px] uppercase text-gold-700 font-sans">Son of</p>
            <p className="mt-1 font-cormorant text-base sm:text-lg text-maroon-900">
              {content.hosts.groomFamily.parents}
            </p>
            <p className="font-cormorant italic text-maroon-800/70">{content.hosts.groomFamily.origin}</p>
          </figure>
        </ScrollReveal>

        <ScrollReveal direction="none" delay={0.12}>
          <div className="flex md:flex-col items-center justify-center gap-4 text-gold-600" aria-hidden="true">
            <span className="hidden md:block h-16 w-px bg-gradient-to-b from-transparent to-gold-500/80" />
            <span className="font-italiana text-5xl leading-none">&</span>
            <span className="hidden md:block h-16 w-px bg-gradient-to-t from-transparent to-gold-500/80" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={0.1}>
          <figure className="text-center md:text-left">
            <ScrollParallaxPhoto intensity={16}>
              <div className="mx-auto md:mr-auto md:ml-0 w-full max-w-[220px] sm:max-w-[300px] md:max-w-[320px] aspect-[3/4] p-[2px] bg-gradient-to-b from-[#F3E0A0] via-[#C59B27] to-[#8C6D18] shadow-[0_20px_38px_-24px_rgba(74,21,21,0.45)]">
                <div className="h-full w-full overflow-hidden bg-[#EFE6D8]">
                  <img
                    src={bridePhoto}
                    alt={content.bride.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.035]"
                  />
                </div>
              </div>
            </ScrollParallaxPhoto>
            <p className="mt-4 sm:mt-5 font-cormorant italic text-gold-700">{content.bride.prefix}</p>
            <h3 className="mt-1 font-serif text-xl sm:text-3xl text-maroon-950">{content.bride.name}</h3>
            <p className="mt-2 text-[11px] uppercase text-gold-700 font-sans">Daughter of</p>
            <p className="mt-1 font-cormorant text-base sm:text-lg text-maroon-900">
              {content.hosts.brideFamily.parents}
            </p>
            <p className="font-cormorant italic text-maroon-800/70">{content.hosts.brideFamily.origin}</p>
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
};
