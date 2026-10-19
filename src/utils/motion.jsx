import { motion, useReducedMotion } from 'framer-motion';
import { ANIMATION } from '../config';

const SPEED = { SLOW: 1.5, NORMAL: 1, FAST: 0.6 };
const DIST = { LIGHT: 14, MEDIUM: 26, STRONG: 44 };

export function useMotion() {
  const reduce = useReducedMotion();
  const k = SPEED[ANIMATION.speed] ?? 1;
  return { off: reduce || ANIMATION.speed === 'OFF', duration: 0.45 * k, distance: DIST[ANIMATION.intensity] ?? 26, stagger: 0.1 * k };
}

export function Reveal({ children, delay = 0, className = '' }) {
  const m = useMotion();
  if (m.off) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: m.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: m.duration, delay: delay * m.stagger, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}
