// ─────────────────────────────────────────────────────────────────────────────
// Motion variants
// ─────────────────────────────────────────────────────────────────────────────
import { type Variants } from 'motion/react';

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] },
  }),
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export const textSlideVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
};

export const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};
