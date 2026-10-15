"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";

/**
 * "What am I looking at?" — a monument photograph with animated hotspots.
 * Selecting a feature zooms the image toward it and opens a glass info panel.
 */
export default function VisionHotspots({ image, alt, hotspots, title }) {
  const [activeId, setActiveId] = useState(null);
  const active = hotspots.find((h) => h.id === activeId);

  function select(hotspot) {
    setActiveId((prev) => (prev === hotspot.id ? null : hotspot.id));
  }

  // Zoom the image toward the active hotspot's position
  const zoomStyle = active
    ? {
        transform: `scale(1.35) translate(${(0.5 - active.x) * 12}%, ${(0.5 - active.y) * 12}%)`,
      }
    : { transform: "scale(1) translate(0, 0)" };

  return (
    <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
      {/* Image with hotspots */}
      <div
        className="relative overflow-hidden rounded-2xl border border-stone-400/20"
        role="img"
        aria-label={alt}
      >
        <div
          className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ backgroundImage: `url(${image})`, ...zoomStyle }}
        />

        {/* Hotspot buttons */}
        {hotspots.map((h, i) => {
          const isActive = h.id === activeId;
          return (
            <button
              key={h.id}
              onClick={() => select(h)}
              style={{ left: `${h.x * 100}%`, top: `${h.y * 100}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
              aria-label={`Feature: ${h.label}`}
              aria-pressed={isActive}
            >
              {/* Pulsing dot */}
              <motion.span
                className="relative block"
                animate={
                  isActive
                    ? { scale: 1.2 }
                    : { scale: [1, 1.35, 1] }
                }
                transition={
                  isActive
                    ? {}
                    : { duration: 2.4, repeat: Infinity, delay: i * 0.5 }
                }
              >
                <span
                  className={`block h-4 w-4 rounded-full border-2 transition-colors ${
                    isActive
                      ? "border-gold-300 bg-gold-400 shadow-[0_0_16px_rgba(199,154,69,0.9)]"
                      : "border-gold-500/80 bg-charcoal-950/60"
                  }`}
                />
                {isActive && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/40" />
                )}
              </motion.span>

              {/* Label line + tag */}
              <span
                className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-sm transition-opacity ${
                  isActive
                    ? "border-gold-400/60 bg-charcoal-950/85 text-gold-300"
                    : "border-stone-400/30 bg-charcoal-950/70 text-stone-200 opacity-80"
                }`}
              >
                {h.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Info panel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <GlassPanel className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
                  AI detected
                </p>
                <h3 className="mt-3 font-display text-3xl text-ivory">
                  {active.label}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  {active.description}
                </p>
                {active.detail && (
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">
                    {active.detail}
                  </p>
                )}
                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href={`/destinations/${active.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gold-500/90 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal-950 transition-colors hover:bg-gold-400"
                  >
                    Learn more
                  </Link>
                  <button
                    onClick={() => setActiveId(null)}
                    className="text-xs font-semibold uppercase tracking-widest text-stone-400 transition-colors hover:text-ivory"
                  >
                    Close
                  </button>
                </div>
              </GlassPanel>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlassPanel className="flex h-full min-h-[280px] flex-col items-center justify-center p-7 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
                  What am I looking at?
                </p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-300">
                  Select a glowing marker on the photograph to see what the AI
                  detected — architectural features, sculpture and structure,
                  each with its own story.
                </p>
                <p className="mt-6 text-xs text-stone-500">
                  {hotspots.length} features detected in {title}
                </p>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
