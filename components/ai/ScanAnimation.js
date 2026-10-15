"use client";

import { motion } from "framer-motion";

const STAGES = [
  { label: "Visual Analysis", key: "analysis" },
  { label: "Structure Detected", key: "structure" },
  { label: "Architectural Features", key: "architecture" },
  { label: "Sculptural Features", key: "sculpture" },
  { label: "Match Found", key: "match" },
];

/**
 * Premium AI scanning animation: HUD frame, travelling scan line,
 * stage checklist that ticks off over the analysis period.
 */
export default function ScanAnimation({ active, progress }) {
  if (!active) return null;

  const completed = Math.floor(progress * STAGES.length);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto max-w-2xl"
      role="status"
      aria-live="polite"
    >
      {/* HUD frame */}
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-charcoal-900/80 p-8 md:p-10">
        {/* Corner brackets */}
        {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map(
          (pos) => (
            <span
              key={pos}
              className={`absolute ${pos} h-5 w-5 border-gold-500/60 ${
                pos.includes("top") ? "border-t" : "border-b"
              } ${pos.includes("left") ? "border-l" : "border-r"}`}
              aria-hidden="true"
            />
          )
        )}

        {/* Travelling scan line */}
        <motion.div
          className="absolute inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-[0_0_18px_rgba(199,154,69,0.8)]"
          animate={{ top: ["12%", "88%", "12%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <p className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-400">
          Analyzing photograph
        </p>
        <p className="mt-2 text-center font-display text-2xl text-ivory">
          Scanning…
        </p>

        {/* Stage checklist */}
        <ul className="mt-8 space-y-3.5">
          {STAGES.map((stage, i) => {
            const done = i < completed;
            return (
              <li
                key={stage.key}
                className="flex items-center gap-3 text-sm"
                aria-live="off"
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full border transition-colors ${
                    done
                      ? "border-gold-500 bg-gold-500/20 text-gold-400"
                      : "border-stone-400/40 text-stone-500"
                  }`}
                >
                  {done ? (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path
                        d="M1 4l2.5 2.5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span className="block h-1.5 w-1.5 rounded-full bg-stone-600" />
                  )}
                </span>
                <span
                  className={
                    done ? "text-stone-200" : "text-stone-500"
                  }
                >
                  {stage.label}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Progress dots */}
        <div className="mt-8 flex items-center justify-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((n) => (
            <motion.span
              key={n}
              className="h-1.5 w-1.5 rounded-full bg-gold-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: n * 0.2,
              }}
            />
          ))}
        </div>
      </div>
      <p className="sr-only">AI analysis in progress — please wait</p>
    </motion.div>
  );
}
