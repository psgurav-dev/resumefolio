import { type Variants } from 'motion/react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

// Card animation variants
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.98,
  },
} as const;

// Icon container variants
const iconContainerVariants: Variants = {
  initial: {
    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
  },
  hover: {
    background: 'linear-gradient(135deg, #B2CD9C 0%, #B2CD9C 100%)',
    transition: {
      duration: 0.3,
    },
  },
} as const;

// Icon animation variants
const iconVariants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      rotate: {
        repeat: Infinity,
        duration: 0.5,
      },
      scale: {
        duration: 0.2,
      },
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Shimmer effect for loading state
const shimmerVariants: Variants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear' as const,
    },
  },
} as const;

export {
  containerVariants,
  cardVariants,
  iconContainerVariants,
  iconVariants,
  shimmerVariants,
};
