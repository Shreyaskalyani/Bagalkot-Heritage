"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Final cinematic scene — the emotional conclusion of the homepage.
 * Text reveals in sequence; the giant BAGALKOT word anchors the close.
 */
export default function FinalCTA() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(4);
      return;
    }

    let timers = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timers = [
          setTimeout(() => setStep(1), 500),
          setTimeout(() => setStep(2), 1600),
          setTimeout(() => setStep(3), 2600),
          setTimeout(() => setStep(4), 3600),
        ];
      },
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-charcoal-950 px-6 py-28 text-center grain border-t border-gold-500/15"
      aria-label="Start your journey — Final Bagalkot Invitation"
    >
      {/* Cinematic subtle golden glow */}
      <div
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 35%, #b58938 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="font-display text-xl font-light text-stone-300 md:text-3xl word-keep uppercase tracking-widest"
          >
            You came looking for monuments.
          </motion.p>
        )}

        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="mt-3 font-display text-xl font-light text-stone-300 md:text-3xl word-keep uppercase tracking-widest"
          >
            You found <span className="text-gold-400 font-normal">stories.</span>
          </motion.p>
        )}

        {step >= 3 && (
          <motion.h2
            initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 font-display text-[15vw] font-light leading-none text-ivory md:text-[10vw] word-keep drop-shadow-2xl"
          >
            BAGALKOT
          </motion.h2>
        )}

        {step >= 4 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-gold-400"
            >
              <span>See it.</span>
              <span className="text-stone-600">•</span>
              <span>Learn it.</span>
              <span className="text-stone-600">•</span>
              <span>Taste it.</span>
              <span className="text-stone-600">•</span>
              <span>Experience it.</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/explore"
                className="inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_36px_rgba(181,137,56,0.45)] hover:scale-105 active:scale-95"
              >
                <span>Explore Bagalkot</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/planner"
                className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 bg-charcoal-950/60 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-300 transition-all hover:border-gold-400 hover:bg-gold-500/15 hover:scale-105 active:scale-95"
              >
                Plan Your Journey
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
