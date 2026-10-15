"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

/**
 * Clip-path curtain reveal on scroll into view.
 * (Framer Motion — used for single reveals, not scroll-scrubbed work.)
 */
export default function ImageReveal({
  src,
  alt,
  className = "",
  children,
  overlay = true,
}) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(12% 12% 12% 12%)", scale: 1.12 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
