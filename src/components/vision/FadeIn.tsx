import { motion } from 'motion/react';
import { ReactNode, useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal wrapper. Uses a getBoundingClientRect check on mount, scroll,
 * and resize (reliable in every environment, unlike IntersectionObserver which
 * can stay dormant in background/headless tabs). Rechecks after layout settles
 * (rAF + window load) so late image/font shifts don't strand visible content.
 * Off-screen content stays hidden until it actually scrolls into view.
 */
export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string, key?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let revealed = false;
    const check = () => {
      if (revealed) return true;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh - 50 && r.bottom > 0) {
        revealed = true;
        setShow(true);
        cleanup();
        return true;
      }
      return false;
    };

    const onScroll = () => check();
    const cleanup = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('load', onScroll);
    };

    if (check()) return;

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', onScroll);
    const raf = requestAnimationFrame(() => check());

    return () => { cleanup(); cancelAnimationFrame(raf); };
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
