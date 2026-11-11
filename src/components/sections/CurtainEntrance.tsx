import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { musicPlayer } from '../../utils/audio';
import { useInvitationStore } from '../../store/invitationStore';
import { useWeddingContent } from '../../store/weddingStore';

function showerAkshate() {
  const rice = ['#F2C94C', '#E8B923', '#F7DC6F', '#D4A017', '#FFF8E1'];
  [0.3, 0.5, 0.7].forEach((x, i) => {
    window.setTimeout(() => {
      confetti({
        particleCount: 36,
        angle: 270,
        spread: 70,
        startVelocity: 12,
        gravity: 0.55,
        drift: 0,
        ticks: 320,
        scalar: 0.55,
        shapes: ['square'],
        colors: rice,
        origin: { x, y: -0.05 },
        disableForReducedMotion: true,
      });
    }, 250 + i * 120);
  });
}

export const CurtainEntrance: React.FC = () => {
  const content = useWeddingContent();
  const hasOpenedInvitation = useInvitationStore((state) => state.hasOpenedInvitation);
  const openInvitation = useInvitationStore((state) => state.openInvitation);
  const reduceMotion = useReducedMotion();
  const groomInitial = content.display.groomFirstName.charAt(0);
  const brideInitial = content.display.brideFirstName.charAt(0);

  const handleOpenClick = () => {
    musicPlayer.start().catch(() => {});
    if (!reduceMotion) showerAkshate();
    openInvitation();
  };

  return (
    <AnimatePresence>
      {!hasOpenedInvitation && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden select-none bg-[#1E0507]/50 backdrop-blur-md"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0.25 : 0.5 },
          }}
        >
          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="relative">
              {!reduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full border border-gold-500"
                  initial={{ opacity: 0, scale: 1 }}
                  exit={{
                    opacity: [0.85, 0],
                    scale: [1, 2.6],
                    transition: { duration: 0.6, ease: 'easeOut' },
                  }}
                />
              )}
              <motion.button
                type="button"
                onClick={handleOpenClick}
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                exit={
                  reduceMotion
                    ? { opacity: 0, transition: { duration: 0.2 } }
                    : {
                        scale: [1, 1.08, 1.08],
                        opacity: [1, 1, 0],
                        transition: { duration: 0.45, times: [0, 0.4, 1] },
                      }
                }
                className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border border-gold-500/70 bg-[#FDFBF8] shadow-[0_18px_40px_-28px_rgba(61,18,18,0.45)]"
                aria-label={content.actions.openInvitation}
              >
                <span className="font-italiana text-2xl leading-none text-maroon-950">
                  {groomInitial} <span className="text-gold-600">&</span> {brideInitial}
                </span>
                <span className="mt-2 whitespace-nowrap text-[8px] uppercase tracking-[0.12em] text-gold-700 font-sans">
                  {content.display.monthYear}
                </span>
              </motion.button>
            </div>

            <motion.p
              className="mt-5 font-cormorant italic text-base text-[#F3E0A0]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ delay: reduceMotion ? 0 : 0.35, duration: 0.45 }}
            >
              {content.actions.tapToOpen}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
