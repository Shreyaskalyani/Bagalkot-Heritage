"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Button/Link that gently follows the cursor with smooth 120fps spring physics.
 * Automatically bypassed on touch and prefers-reduced-motion.
 */
export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.25 });

  const canMagnetize =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function handleMove(e) {
    if (!canMagnetize || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const variants = {
    primary:
      "bg-gold-500 text-charcoal-950 hover:bg-gold-400 hover:shadow-[0_0_28px_rgba(181,137,56,0.35)]",
    outline:
      "border border-gold-500/50 text-gold-300 hover:border-gold-400 hover:text-gold-200",
    ghost:
      "border border-stone-400/30 text-ivory hover:border-gold-500/50",
  };

  const styles = `inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="inline-block"
      >
        <Link href={href} className={styles} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={styles}
      {...props}
    >
      {children}
    </motion.button>
  );
}
