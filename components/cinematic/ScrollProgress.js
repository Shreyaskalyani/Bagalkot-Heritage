"use client";

import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin reading-progress line at the very top of the viewport.
 */
export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (pathname === "/visitor-center" || pathname === "/display") return null;

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
