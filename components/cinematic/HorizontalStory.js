"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ArrowRight, Compass } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Pattadakal horizontal story: vertical scroll drives horizontal movement.
 * On mobile (< 768px) becomes a vertical story sequence.
 */
export default function HorizontalStory({ panels }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (isMobile !== false) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        trackRef.current ? Math.max(0, trackRef.current.scrollWidth - window.innerWidth) : 0;

      gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${getDistance() * 1.15}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, rootRef);

    // Dynamic resize & orientation change recalculation
    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      ctx.revert();
    };
  }, [isMobile]);

  /* ---------- Mobile: vertical full-screen story ---------- */
  if (isMobile === true) {
    return (
      <div className="relative" aria-label="Pattadakal mobile narrative">
        {panels.map((panel, i) => (
          <section
            key={panel.id}
            className="relative flex min-h-[90svh] min-h-[90dvh] items-center overflow-hidden"
            aria-label={panel.title}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${panel.image})` }}
              role="img"
              aria-label={`${panel.title} heritage monument`}
            />
            <div className="absolute inset-0 bg-charcoal-950/75" aria-hidden="true" />
            <div className="relative z-10 px-6 py-20">
              <p className="font-mono text-xs tracking-[0.3em] text-gold-500">
                SCENE 0{i + 1} · UNESCO CORRIDOR
              </p>
              <h2 className="mt-3 display-lg text-ivory font-light word-keep">
                {panel.title}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-200">
                {panel.text}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="/destinations/pattadakal-group-of-monuments"
                  className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-charcoal-950/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold-300"
                >
                  <span>Explore Site</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    );
  }

  /* ---------- Desktop: pinned horizontal track ---------- */
  return (
    <div ref={rootRef} className="relative overflow-hidden" aria-label="Pattadakal story">
      <div ref={trackRef} className="flex h-[100svh] h-[100dvh] w-max items-stretch">
        {panels.map((panel, i) => (
          <section
            key={panel.id}
            className="relative flex h-full w-screen items-center overflow-hidden"
            aria-label={panel.title}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${panel.image})` }}
              role="img"
              aria-label={`${panel.title} heritage monument`}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/45 to-transparent"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-xl px-16 xl:px-24">
              <div className="flex items-center gap-3 text-gold-400 font-mono text-xs tracking-[0.3em]">
                <span>CHAPTER 0{i + 1}</span>
                <span>•</span>
                <span>MALAPRABHA VALLEY</span>
              </div>
              <h2 className="mt-4 display-lg font-light leading-[0.95] text-ivory word-keep">
                {panel.title}
              </h2>
              <p className="body-large mt-6 text-stone-200 leading-relaxed font-sans">
                {panel.text}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/destinations/pattadakal-group-of-monuments"
                  className="link-underline inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-400 hover:text-gold-300"
                >
                  <span>Explore Pattadakal Monuments</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        ))}

        {/* Giant outline word at track end with clamp font size */}
        <section className="relative flex h-full w-screen items-center justify-center bg-charcoal-950">
          <p className="text-outline select-none font-display text-[clamp(4rem,14vw,12rem)] font-light leading-none word-keep">
            HERITAGE
          </p>
        </section>
      </div>
    </div>
  );
}
