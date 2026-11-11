import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  amount?: number;
  once?: boolean;
}

const offsetByDirection: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 34 },
  down: { y: -28 },
  left: { x: 34 },
  right: { x: -34 },
  none: {},
};

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
  const offset = reduceMotion
    ? {}
    : scaleOffset(offsetByDirection[direction], isCompact ? 0.45 : 1);

  return (
    <motion.div
      className={className}
      initial={{ opacity: reduceMotion ? 1 : 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: isCompact ? 0.55 : 0.8,
        delay: isCompact ? Math.min(delay, 0.05) : delay,
        ease: [0.22, 1, 0.36, 1],
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
