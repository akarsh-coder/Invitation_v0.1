import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInvitationStore } from '../../store/invitationStore';

const SCROLL_DISMISS_Y = 40;

export function ScrollHint() {
  const revealed = useInvitationStore((state) => state.hasOpenedInvitation);
  const reduceMotion = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const [showAfterReveal, setShowAfterReveal] = useState(false);

  useEffect(() => {
    if (!revealed) {
      setDismissed(false);
      setShowAfterReveal(false);
      return;
    }

    const delayMs = reduceMotion ? 350 : 1400;
    const timer = window.setTimeout(() => setShowAfterReveal(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [revealed, reduceMotion]);

  useEffect(() => {
    if (!revealed) return;

    const onScroll = () => {
      if (window.scrollY > SCROLL_DISMISS_Y) {
        setDismissed(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [revealed]);

  const visible = revealed && showAfterReveal && !dismissed;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center sm:bottom-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          aria-hidden
        >
          <motion.div
            className="flex flex-col items-center text-gold-700/75"
            animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 1.85, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <span className="block h-7 w-px bg-gradient-to-b from-gold-600/0 via-gold-600/55 to-gold-600/80" />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 opacity-90"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
