"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PHOTO =
  "/images/badami-caves-4k.jpg";

const HUD_LINES = [
  "OBJECT DETECTED",
  "ARCHITECTURE DETECTED",
  "SCULPTURE DETECTED",
  "STRUCTURE DETECTED",
];

/**
 * AI Transformation — the section that visually communicates the core
 * innovation: heritage photography resolving into an AI vision interface.
 * Scroll-scrubbed: photograph → HUD → identification.
 */
export default function AITransformation() {
  const rootRef = useRef(null);
  const [identified, setIdentified] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setIdentified(true);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 60%",
        onEnter: () => setIdentified(true),
        once: true,
      });

      gsap.fromTo(
        "[data-hud-line]",
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 55%" },
        }
      );

      gsap.fromTo(
        "[data-hud-frame]",
        { opacity: 0, scale: 1.06 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-charcoal-950 py-24 md:py-36"
      aria-label="AI vision — from photograph to identification"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">
            The innovation
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ivory md:text-6xl">
            A photograph becomes
            <span className="block text-gold-400">AI vision.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-400">
            Point the scanner at any monument in Bagalkot. The AI reads the
            stone — architecture, sculpture, structure — and names what you are
            seeing.
          </p>
        </div>

        <div
          data-hud-frame
          className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl border border-gold-500/25"
        >
          {/* Photograph */}
          <div
            className="aspect-[16/9] bg-cover bg-center"
            style={{ backgroundImage: `url(${PHOTO})` }}
            role="img"
            aria-label="Sandstone cliff with cave openings under AI analysis"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-charcoal-950/40"
            aria-hidden="true"
          />

          {/* Scan line */}
          <div
            className="absolute inset-x-8 h-[2px] animate-scan-line bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-[0_0_20px_rgba(199,154,69,0.85)] motion-reduce:animate-none"
            aria-hidden="true"
          />

          {/* HUD overlay */}
          <div className="absolute left-5 top-6 md:left-8 md:top-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-400">
              Visual analysis
            </p>
            <ul className="mt-3 space-y-1.5">
              {HUD_LINES.map((line) => (
                <li
                  key={line}
                  data-hud-line
                  className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-200 md:text-[11px]"
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path
                      d="M1 4l2.5 2.5L9 1"
                      stroke="#c79a45"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Identification result */}
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 md:bottom-8 md:left-8 md:right-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-stone-400">
                Identification
              </p>
              <p className="mt-1 font-mono text-3xl font-medium text-gold-400">
                {identified ? "96.4%" : "···"}
              </p>
            </div>
            <p
              className={`font-display text-2xl text-ivory transition-opacity duration-700 md:text-3xl ${
                identified ? "opacity-100" : "opacity-0"
              }`}
            >
              Badami Cave Temples
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/scanner"
            className="inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_28px_rgba(181,137,56,0.35)]"
          >
            Try the Monument Scanner
          </Link>
        </div>
      </div>
    </section>
  );
}
