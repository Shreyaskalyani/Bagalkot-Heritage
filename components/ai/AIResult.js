"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, RotateCcw, TriangleAlert } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";

/**
 * Recognition result panel. Displays confidence honestly — including
 * low-confidence states, which never pretend an identification was made.
 * Never relies on color alone: icons + text labels carry the meaning.
 */
export default function AIResult({ result, onReset }) {
  const { monument, confidence, detected_features, message, demo } = result;
  const pct = Math.round((confidence || 0) * 1000) / 10; // one decimal
  const high = confidence >= 0.75;

  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-5"
      >
        {/* ---------- high confidence: identification ---------- */}
        {high && monument && (
          <GlassPanel className="overflow-hidden p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-400">
              AI Identification
            </p>

            <h2 className="mt-4 font-display text-4xl leading-tight text-ivory">
              {monument.name}
            </h2>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-stone-400">
              <MapPin size={14} aria-hidden="true" />
              {monument.location}, Bagalkot, Karnataka
            </p>

            {/* Confidence */}
            <div className="mt-7">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
                  {demo ? "SIMULATED / DEMO MATCH" : "Recognition confidence"}
                </span>
                <span className="font-mono text-xl md:text-2xl font-medium text-gold-400">
                  {demo ? `DEMO MATCH: ${pct}%` : `${pct}%`}
                </span>
              </div>
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-400/20"
                role="meter"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Recognition confidence ${pct} percent`}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="h-full origin-left rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Detected features */}
            {detected_features?.length > 0 && (
              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
                  What the AI detected
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {detected_features.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3.5 py-1.5 text-xs text-stone-200"
                    >
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 4l2.5 2.5L9 1"
                          stroke="#c79a45"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-6 text-sm leading-relaxed text-stone-400">
              {message}
              {demo && (
                <span className="ml-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-400">
                  Demo
                </span>
              )}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/destinations/${monument.slug}`}
                className="flex-1 rounded-full bg-gold-500 py-3.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_24px_rgba(181,137,56,0.35)]"
              >
                Explore Monument
              </Link>
              <Link
                href={`/map?monument=${monument.slug}`}
                className="flex-1 rounded-full border border-gold-500/50 py-3.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-gold-300 transition-colors hover:border-gold-400"
              >
                View on Map
              </Link>
            </div>
          </GlassPanel>
        )}

        {/* ---------- low confidence: honest non-answer ---------- */}
        {(!high || !monument) && (
          <GlassPanel className="p-8 text-center md:p-10">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold-500/40 text-gold-400">
              <TriangleAlert size={20} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-500">
              Possible match
            </p>
            <h2 className="mt-3 font-display text-2xl text-ivory">
              The AI is not sufficiently confident.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              We couldn't confidently identify this monument. Try:
            </p>
            <ul className="mx-auto mt-4 max-w-xs space-y-2 text-left text-sm text-stone-300">
              {[
                "A wider photograph showing more of the monument",
                "A front-facing view of the structure",
                "Better lighting, without strong shadows",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                  {tip}
                </li>
              ))}
            </ul>
            <button
              onClick={onReset}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-stone-400/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-200 transition-colors hover:border-gold-500/60"
            >
              <RotateCcw size={13} aria-hidden="true" />
              Try another photograph
            </button>
          </GlassPanel>
        )}
      </motion.div>
    </div>
  );
}
