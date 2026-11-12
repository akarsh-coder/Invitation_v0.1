import React from 'react';
import { motion } from 'framer-motion';
import { GoldDivider } from '../ornaments/GoldDivider';
import { LotusOrnament } from '../ornaments/LotusOrnament';
import { ScrollParallaxPhoto, ScrollReveal } from '../ui/ScrollMotion';
import { resolvePhoto } from '../../utils/image';
import { useWeddingContent } from '../../store/weddingStore';
import { useInvitationStore } from '../../store/invitationStore';

export const HeroSection: React.FC = () => {
  const content = useWeddingContent();
  const revealed = useInvitationStore((state) => state.hasOpenedInvitation);
  const heroImage = resolvePhoto(content.photos.heroCouple, content.photos.heroCoupleDummy);

  return (
    <section className="relative flex flex-col items-center justify-center pb-10 px-4 pt-14 sm:pb-16 sm:px-8 sm:pt-[4.25rem] text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center z-10 w-full -mt-1 sm:-mt-0.5">
        <ScrollReveal direction="down" amount={0.1}>
          <LotusOrnament size={48} className="text-gold-600 sm:scale-[1.08]" />
        </ScrollReveal>

        <ScrollReveal className="mt-2 sm:mt-2.5" delay={0.05} amount={0.1}>
          <p className="font-cormorant text-lg text-maroon-950 sm:text-2xl">{content.invocation.ganapathi}</p>
        </ScrollReveal>

        <ScrollReveal className="mt-6 sm:mt-8" delay={0.1} amount={0.1}>
          <h1 className="text-[2.35rem] sm:text-6xl md:text-7xl font-serif text-maroon-950 tracking-tight leading-tight">
            {content.display.groomFirstName}{' '}
            <span className="text-gold-600 font-light font-italiana">&</span>{' '}
            {content.display.brideFirstName}
          </h1>
          <p className="text-[11px] sm:text-sm font-sans text-maroon-800/80 uppercase mt-3 sm:mt-4">
            {content.display.dateLine}
            <span className="mx-2 text-gold-600">·</span>
            {content.display.city}
          </p>
        </ScrollReveal>

        <div className="my-6 sm:my-8 relative w-full flex justify-center">
          <ScrollParallaxPhoto className="w-full flex justify-center" intensity={18}>
            <div className="relative w-full max-w-[220px] sm:max-w-[300px] md:max-w-[360px] aspect-[4/5] rounded-t-[110px] sm:rounded-t-[150px] md:rounded-t-[180px] rounded-b-2xl p-[2px] bg-gradient-to-b from-[#F3E0A0] via-[#C59B27] to-[#8C6D18] shadow-[0_20px_38px_-24px_rgba(74,21,21,0.45)]">
              <motion.div
                className="w-full h-full rounded-t-[108px] sm:rounded-t-[148px] md:rounded-t-[178px] rounded-b-[14px] overflow-hidden bg-[#EFE6D8]"
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: revealed ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
                transition={{ duration: 1.3, delay: 0.45, ease: [0.77, 0, 0.18, 1] }}
              >
                <img
                  src={heroImage}
                  alt={content.display.coupleAlt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.035]"
                />
              </motion.div>
            </div>
          </ScrollParallaxPhoto>
        </div>

        <ScrollReveal delay={0.05}>
          <p className="font-cormorant italic text-lg sm:text-3xl text-maroon-900">
            {content.hosts.invitationLead}
          </p>
        </ScrollReveal>

        <ScrollReveal className="w-full max-w-3xl mt-6 sm:mt-8" delay={0.1}>
          <div className="px-4 py-6 sm:px-10 sm:py-8 bg-[#FDFBF8]/80 shadow-[0_18px_40px_-30px_rgba(61,18,18,0.35)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-start text-center">
              <div className="md:border-r md:border-maroon-900/10 md:pr-8">
                <p className="text-[11px] uppercase text-gold-700 font-sans">Groom&apos;s parents</p>
                <h3 className="mt-2 text-sm sm:text-lg font-serif text-maroon-950 text-balance">
                  {content.hosts.groomFamily.parents}
                </h3>
                <p className="mt-1 font-cormorant italic text-maroon-800/75">
                  {content.hosts.groomFamily.origin}
                </p>
              </div>

              <div className="md:pl-2">
                <p className="text-[11px] uppercase text-gold-700 font-sans">Bride&apos;s parents</p>
                <h3 className="mt-2 text-sm sm:text-lg font-serif text-maroon-950 text-balance">
                  {content.hosts.brideFamily.parents}
                </h3>
                <p className="mt-1 font-cormorant italic text-maroon-800/75">
                  {content.hosts.brideFamily.origin}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <GoldDivider variant="simple" className="my-6 sm:my-8 max-w-xs" />

        <ScrollReveal className="max-w-2xl" delay={0.1}>
          <p className="font-cormorant italic text-lg sm:text-2xl leading-relaxed text-maroon-900 px-2">
            {content.invitationText}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
