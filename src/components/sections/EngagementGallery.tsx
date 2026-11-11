import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GoldDivider } from '../ornaments/GoldDivider';
import { ScrollParallaxPhoto, ScrollReveal } from '../ui/ScrollMotion';
import type { EngagementPhotoItem } from '../../types/wedding';
import { resolvePhoto } from '../../utils/image';
import { useWeddingContent } from '../../store/weddingStore';
import { useUiStore } from '../../store/uiStore';

function Frame({
  item,
  className,
  aspect,
  onOpen,
}: {
  item: EngagementPhotoItem;
  className?: string;
  aspect: string;
  onOpen: (url: string, caption: string) => void;
}) {
  const src = resolvePhoto(item.url, item.dummyUrl);

  return (
    <ScrollReveal className={className}>
      <figure className="mx-auto w-full max-w-[280px] sm:max-w-none">
        <ScrollParallaxPhoto intensity={16}>
          <button
            type="button"
            onClick={() => onOpen(src, item.title)}
            className={`group relative block w-full overflow-hidden border-0 p-0 bg-[#EFE6D8] text-left ${aspect}`}
            aria-label={item.title}
          >
            <img
              src={src}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045] group-hover:brightness-105"
            />
          </button>
        </ScrollParallaxPhoto>
        <figcaption className="mt-3">
          <p className="font-serif text-base sm:text-lg text-maroon-950">{item.title}</p>
          {item.date && (
            <p className="mt-0.5 font-cormorant italic text-maroon-800/75">{item.date}</p>
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
        <p className="text-[11px] sm:text-xs uppercase text-gold-700 font-sans">Engagement</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-4xl text-maroon-950">A few quiet frames</h2>
        <GoldDivider variant="simple" className="my-4 max-w-xs" />
      </ScrollReveal>

      {lead && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-8 items-start">
          <Frame item={lead} className="lg:col-span-7" aspect="aspect-[4/5]" onOpen={openGalleryLightbox} />
          {side.length > 0 && (
            <div className="lg:col-span-5 flex flex-col gap-7 sm:gap-10">
              {side.map((item) => (
                <Frame
                  key={item.id}
                  item={item}
                  aspect="aspect-[4/5] lg:aspect-[5/4]"
                  onOpen={openGalleryLightbox}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-7 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-10">
          {rest.map((item) => (
            <Frame key={item.id} item={item} aspect="aspect-[4/5]" onOpen={openGalleryLightbox} />
          ))}
        </div>
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
              className="relative max-w-4xl max-h-[90vh] bg-[#F6F1E8] p-3 sm:p-4 shadow-2xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeGalleryLightbox}
                className="absolute top-5 right-5 z-10 p-2 bg-[#1A0608]/70 text-white"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <img
                src={galleryLightbox.image}
                alt={galleryLightbox.caption}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
              <p className="pt-3 text-center font-serif text-maroon-950">{galleryLightbox.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
