"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Heritage timeline — a vertical spine that draws itself as the visitor
 * scrolls, with milestones alternating left/right (desktop) and stacked
 * (mobile). Only well-attested periods used; no invented dates.
 */
export default function Timeline({ milestones }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Draw the spine
      gsap.fromTo(
        "[data-spine]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      // Reveal milestones
      gsap.utils.toArray("[data-milestone]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto max-w-5xl px-5 md:px-8">
      {/* Central spine */}
      <div
        data-spine
        className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold-500/60 via-gold-500/30 to-transparent md:left-1/2"
        aria-hidden="true"
      />

      <ol className="space-y-16 md:space-y-24" role="list">
        {milestones.map((m, i) => (
          <li
            key={m.id}
            data-milestone
            className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16 items-start"
          >
            {/* Node */}
            <span
              className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2 z-10"
              aria-hidden="true"
            >
              <span className="block h-3.5 w-3.5 rounded-full border-2 border-gold-400 bg-charcoal-950 shadow-[0_0_10px_rgba(199,154,69,0.6)]" />
            </span>

            <div
              className={
                i % 2 === 0
                  ? "md:col-start-1 md:pr-10 md:text-right"
                  : "md:col-start-2 md:pl-10"
              }
            >
              <p className="font-mono text-xs tracking-[0.25em] text-gold-500">
                {m.period}
              </p>
              <h3 className="mt-2 font-display text-3xl text-ivory">
                {m.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">
                {m.text}
              </p>
              {m.slug && (
                <Link
                  href={`/destinations/${m.slug}`}
                  className="link-underline mt-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold-400"
                >
                  View destination →
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
