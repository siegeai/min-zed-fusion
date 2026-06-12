import { motion } from 'motion/react';
import { ReactNode, useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal wrapper. Uses a getBoundingClientRect check on mount + scroll
 * (reliable in every environment, unlike IntersectionObserver which can stay
 * dormant in background/headless tabs) plus a short mount safety-net so content
 * is never left permanently hidden.
 */
export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string, key?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh - 50 && r.bottom > 0) {
        setShow(true);
        return true;
      }
      return false;
    };

    if (check()) return;

    const onScroll = () => { if (check()) cleanup(); };
    const cleanup = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Safety net: reveal shortly after mount even if no scroll occurs.
    const t = setTimeout(() => setShow(true), 600);

    return () => { cleanup(); clearTimeout(t); };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
