import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { GoldDivider } from '../ornaments/GoldDivider';
import { ScrollParallaxPhoto, ScrollReveal } from '../ui/ScrollMotion';
import type { EngagementPhotoItem } from '../../types/wedding';
import { resolvePhoto } from '../../utils/image';
import { useWeddingContent } from '../../store/weddingStore';
import { useUiStore } from '../../store/uiStore';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

const frameClass =
  'rounded-2xl p-[2px] bg-gradient-to-b from-[#F3E0A0] via-[#C59B27] to-[#8C6D18] shadow-[0_20px_38px_-24px_rgba(74,21,21,0.45)]';

const MOBILE_AUTO_MS = 2000;
const MOBILE_RESUME_AFTER_TOUCH_MS = 5000;

function MobileEngagementStrip({
  frames,
  lightboxOpen,
  onOpen,
}: {
  frames: EngagementPhotoItem[];
  lightboxOpen: boolean;
  onOpen: (url: string, caption: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLUListElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const pausedRef = useRef(false);
  const autoScrollingRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    pausedRef.current = true;
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
      resumeTimerRef.current = null;
    }, MOBILE_RESUME_AFTER_TOUCH_MS);
  }, []);

  const scrollToIndex = useCallback(
    (index: number, behavior?: ScrollBehavior) => {
      const el = slideRefs.current[index];
      if (!el) return;
      autoScrollingRef.current = true;
      el.scrollIntoView({
        behavior: behavior ?? (reduceMotion ? 'auto' : 'smooth'),
        inline: 'center',
        block: 'nearest',
      });
      activeIndexRef.current = index;
      setActiveIndex(index);
      window.setTimeout(() => {
        autoScrollingRef.current = false;
      }, 700);
    },
    [reduceMotion],
  );

  const syncActiveFromScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(center - elCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    activeIndexRef.current = best;
    setActiveIndex(best);
  }, []);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        pausedRef.current = !entry.isIntersecting;
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (frames.length <= 1 || reduceMotion || lightboxOpen) return;

    const tick = window.setInterval(() => {
      if (pausedRef.current) return;
      const next = (activeIndexRef.current + 1) % frames.length;
      scrollToIndex(next);
    }, MOBILE_AUTO_MS);

    return () => window.clearInterval(tick);
  }, [frames.length, reduceMotion, lightboxOpen, scrollToIndex]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    },
    [],
  );

  const onUserScroll = () => {
    if (autoScrollingRef.current) return;
    scheduleResume();
    syncActiveFromScroll();
  };

  return (
    <div className="-mx-1">
      <p className="text-center font-cormorant italic text-sm text-maroon-800/65 mb-4">
        {frames.length > 1 && !reduceMotion
          ? 'Photos advance on their own — swipe anytime'
          : 'Swipe to browse'}
      </p>
      <ul
        ref={scrollerRef}
        onTouchStart={scheduleResume}
        onScroll={onUserScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-4 pr-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Engagement photo gallery"
      >
        {frames.map((item, index) => (
          <li
            key={item.id}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            className="w-[min(78vw,290px)] shrink-0 snap-center list-none"
          >
            <PhotoCard
              item={item}
              aspectClass="aspect-[4/5]"
              revealDirection={index % 2 === 0 ? 'right' : 'left'}
              revealDelay={index * 0.06}
              onOpen={onOpen}
            />
          </li>
        ))}
      </ul>
      {frames.length > 1 && (
        <div
          className="mt-4 flex justify-center gap-2"
          role="tablist"
          aria-label="Gallery position"
        >
          {frames.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`View photo ${index + 1}`}
              onClick={() => {
                scheduleResume();
                scrollToIndex(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-7 bg-gold-600' : 'w-1.5 bg-gold-600/35'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PhotoCard({
  item,
  aspectClass,
  captionClass,
  revealDirection = 'up',
  revealDelay = 0,
  parallax = 12,
  onOpen,
}: {
  item: EngagementPhotoItem;
  aspectClass: string;
  captionClass?: string;
  revealDirection?: RevealDirection;
  revealDelay?: number;
  parallax?: number;
  onOpen: (url: string, caption: string) => void;
}) {
  const src = resolvePhoto(item.url, item.dummyUrl);

  return (
    <ScrollReveal direction={revealDirection} delay={revealDelay} className="h-full">
      <figure className={captionClass ?? 'text-center'}>
        <ScrollParallaxPhoto intensity={parallax}>
          <button
            type="button"
            onClick={() => onOpen(src, item.title)}
            className={`group relative block w-full border-0 p-0 text-left ${aspectClass} ${frameClass}`}
            aria-label={item.title}
          >
            <span className="block h-full w-full overflow-hidden rounded-[14px] bg-[#EFE6D8]">
              <img
                src={src}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />
            </span>
          </button>
        </ScrollParallaxPhoto>
        <figcaption className="mt-3 sm:mt-4">
          <p className="font-serif text-base sm:text-lg text-maroon-950">{item.title}</p>
          {item.date && (
            <p className="mt-0.5 font-cormorant italic text-sm text-maroon-800/75">{item.date}</p>
          )}
        </figcaption>
      </figure>
    </ScrollReveal>
  );
}

export const EngagementGallery: React.FC = () => {
  const content = useWeddingContent();
  const photos = content.photos;
  const galleryLightbox = useUiStore((state) => state.galleryLightbox);
  const openGalleryLightbox = useUiStore((state) => state.openGalleryLightbox);
  const closeGalleryLightbox = useUiStore((state) => state.closeGalleryLightbox);

  const frames = photos.gallery.filter((item) => {
    if (!item.url || !photos.heroCouple) return true;
    return item.url !== photos.heroCouple;
  });

  const lead = frames[0];
  const side = frames.slice(1, 3);
  const rest = frames.slice(3);

  return (
    <section className="relative py-10 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto z-10">
      <ScrollReveal className="text-center mb-8 sm:mb-10">
        <p className="text-[11px] sm:text-xs uppercase text-gold-700 font-sans tracking-[0.14em]">Engagement</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-4xl text-maroon-950">A few quiet frames</h2>
        <GoldDivider variant="simple" className="my-4 max-w-xs mx-auto" />
      </ScrollReveal>

      {frames.length > 0 && (
        <>
          <div className="sm:hidden">
            <MobileEngagementStrip
              frames={frames}
              lightboxOpen={Boolean(galleryLightbox.image)}
              onOpen={openGalleryLightbox}
            />
          </div>

          {/* Tablet & desktop: featured + grid */}
          <div className="hidden sm:block space-y-9 lg:space-y-10">
            {lead && (
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                <div className="lg:col-span-7 max-w-md lg:max-w-none mx-auto lg:mx-0 w-full">
                  <PhotoCard
                    item={lead}
                    aspectClass="aspect-[4/5]"
                    revealDirection="right"
                    parallax={14}
                    onOpen={openGalleryLightbox}
                  />
                </div>
                {side.length > 0 && (
                  <ul className="lg:col-span-5 flex flex-col gap-8">
                    {side.map((item, index) => (
                      <li key={item.id} className="list-none max-w-sm mx-auto lg:max-w-none w-full">
                        <PhotoCard
                          item={item}
                          aspectClass="aspect-[5/4] lg:aspect-[4/3]"
                          revealDirection="left"
                          revealDelay={0.08 + index * 0.06}
                          onOpen={openGalleryLightbox}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {rest.length > 0 && (
              <ul className="grid sm:grid-cols-2 gap-8 lg:gap-10" aria-label="More engagement photos">
                {rest.map((item, index) => (
                  <li key={item.id} className="list-none max-w-md mx-auto sm:max-w-none w-full">
                    <PhotoCard
                      item={item}
                      aspectClass="aspect-[4/5]"
                      revealDirection="up"
                      revealDelay={index * 0.07}
                      onOpen={openGalleryLightbox}
                    />
                  </li>
                ))}
              </ul>
            )}

          </div>
        </>
      )}

      <AnimatePresence>
        {galleryLightbox.image && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#1A0608]/88"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGalleryLightbox}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] rounded-2xl bg-[#F6F1E8] p-3 sm:p-4 shadow-2xl ring-1 ring-gold-600/25"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeGalleryLightbox}
                className="absolute top-3 right-3 z-10 rounded-full p-2 bg-[#1A0608]/75 text-white backdrop-blur-sm"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <div className={`rounded-xl p-[2px] ${frameClass}`}>
                <img
                  src={galleryLightbox.image}
                  alt={galleryLightbox.caption}
                  className="max-h-[75vh] w-auto rounded-[10px] object-contain mx-auto bg-[#EFE6D8]"
                />
              </div>
              <p className="pt-3 text-center font-serif text-maroon-950">{galleryLightbox.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
