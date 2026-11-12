import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useInvitationStore } from '../../store/invitationStore';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  amount?: number;
  once?: boolean;
}

interface RevealPose {
  x?: number;
  y?: number;
  rotateX?: number;
  rotateY?: number;
  rotate?: number;
  scale: number;
  origin: string;
}

const poseByDirection: Record<RevealDirection, RevealPose> = {
  up: { y: 42, rotateX: 18, scale: 0.95, origin: '50% 100%' },
  down: { y: -34, rotateX: -16, scale: 0.95, origin: '50% 0%' },
  left: { x: 48, rotateY: -22, rotate: 1.5, scale: 0.93, origin: '100% 50%' },
  right: { x: -48, rotateY: 22, rotate: -1.5, scale: 0.93, origin: '0% 50%' },
  none: { scale: 0.84, origin: '50% 50%' },
};

const settledPose = { opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, rotate: 0, scale: 1, filter: 'blur(0px)' };

function useCompactMotion() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const update = () => setIsCompact(media.matches);

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isCompact;
}

function scaleOffset(offset: { x?: number; y?: number }, scale: number) {
  return {
    x: offset.x ? offset.x * scale : undefined,
    y: offset.y ? offset.y * scale : undefined,
  };
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  amount = 0.22,
  once = true,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const isCompact = useCompactMotion();
  const scrollReady = useInvitationStore((state) => state.hasOpenedInvitation);
  const pose = poseByDirection[direction];
  const offset = scaleOffset(pose, isCompact ? 0.45 : 1);
  const tilt = isCompact ? 0.6 : 1;
  const hiddenPose = reduceMotion
    ? settledPose
    : {
        opacity: 0,
        x: offset.x ?? 0,
        y: offset.y ?? 0,
        rotateX: (pose.rotateX ?? 0) * tilt,
        rotateY: (pose.rotateY ?? 0) * tilt,
        rotate: (pose.rotate ?? 0) * tilt,
        scale: pose.scale,
        filter: `blur(${isCompact ? 4 : 8}px)`,
      };
  const viewportAmount = isCompact ? Math.min(amount, 0.15) : amount;
  const viewportMargin = '0px 0px -5% 0px';
  const revealDelay = isCompact ? Math.min(delay, 0.08) : delay;

  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 900, transformOrigin: pose.origin }}
      initial={hiddenPose}
      animate={scrollReady || reduceMotion ? undefined : hiddenPose}
      whileInView={scrollReady ? settledPose : undefined}
      viewport={{ once, amount: viewportAmount, margin: viewportMargin }}
      transition={{
        default: {
          type: 'spring',
          duration: isCompact ? 0.85 : 1.1,
          bounce: 0.28,
          delay: revealDelay,
        },
        opacity: { duration: 0.6, ease: 'easeOut', delay: revealDelay },
        filter: { duration: isCompact ? 0.6 : 0.8, ease: [0.22, 1, 0.36, 1], delay: revealDelay },
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollParallaxPhotoProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function ScrollParallaxPhoto({
  children,
  className,
  intensity = 34,
}: ScrollParallaxPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isCompact = useCompactMotion();
  const responsiveIntensity = isCompact ? Math.min(intensity, 10) : intensity;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-responsiveIntensity, responsiveIntensity],
  );

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
