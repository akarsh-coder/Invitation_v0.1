import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';
import { useInvitationStore } from '../../store/invitationStore';
import { useWeddingContent } from '../../store/weddingStore';

const SCROLL_DISMISS_Y = 48;

export function ScrollHint() {
  const content = useWeddingContent();
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

    const delayMs = reduceMotion ? 400 : 1500;
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
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex justify-center bg-gradient-to-t from-[#F6F1E8] from-35% via-[#F6F1E8]/75 to-transparent px-4 pb-7 pt-20 sm:pb-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          aria-hidden
        >
          <motion.div
            className="flex flex-col items-center gap-2.5 text-center"
            animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={
              reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <motion.p
              className="font-cormorant text-lg italic leading-none text-maroon-900/90 sm:text-xl"
              animate={reduceMotion ? undefined : { opacity: [0.72, 1, 0.72] }}
              transition={
                reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              {content.actions.scrollForDetails}
            </motion.p>

            <span className="flex items-center gap-2 text-gold-600/80">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500/70 sm:w-14" />
              <motion.span
                className="flex text-gold-600"
                animate={reduceMotion ? undefined : { y: [0, 3, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <ChevronsDown size={22} strokeWidth={1.35} aria-hidden />
              </motion.span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500/70 sm:w-14" />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
