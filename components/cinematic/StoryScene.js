"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky cinematic story: each scene pins fullscreen with cross-fading
 * imagery, a giant title, and metadata. Under reduced motion, scenes
 * render as a simple stacked sequence.
 */
export default function StoryScene({ scenes }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const sceneEls = gsap.utils.toArray("[data-scene]", rootRef.current);

      sceneEls.forEach((scene, i) => {
        // Each scene sticks while its progress runs with natural spacing
        gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
          .fromTo(
            scene.querySelector("[data-scene-img]"),
            { scale: 1.12, opacity: i === 0 ? 1 : 0.5 },
            { scale: 1, opacity: 1, ease: "none" },
            0
          )
          .fromTo(
            scene.querySelector("[data-scene-title]"),
            { yPercent: 20, opacity: i === 0 ? 1 : 0 },
            { yPercent: 0, opacity: 1, ease: "power2.out" },
            0.1
          )
          .fromTo(
            scene.querySelector("[data-scene-meta]"),
            { y: 16, opacity: i === 0 ? 1 : 0 },
            { y: 0, opacity: 1, ease: "power2.out" },
            0.2
          )
          .to(
            scene,
            { opacity: 0, pointerEvents: "none", ease: "power1.in" },
            0.85
          );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [scenes]);

  return (
    <div ref={rootRef} className="relative">
      {scenes.map((scene, i) => (
        <section
          key={scene.slug || scene.title || i}
          data-scene
          className="relative flex h-[100svh] items-center overflow-hidden"
          aria-label={`${scene.title} — scene ${i + 1}`}
        >
          {/* Fullscreen image */}
          <div
            data-scene-img
            className="absolute inset-0 bg-cover bg-center will-change-transform bg-charcoal-900"
            style={{ backgroundImage: `url(${scene.image})` }}
            role="img"
            aria-label={`${scene.title} heritage landscape`}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-charcoal-950/60"
            aria-hidden="true"
          />

          {/* Number + metadata */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-sm tracking-[0.3em] text-gold-500">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2
                  data-scene-title
                  className="mt-4 display-xl font-light leading-[0.92] text-ivory word-keep"
                >
                  {scene.title}
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-stone-200 md:text-lg">
                  {scene.description}
                </p>
                {scene.slug && (
                  <Link
                    href={`/destinations/${scene.slug}`}
                    className="relative z-30 pointer-events-auto link-underline mt-8 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold-400 hover:text-gold-300"
                  >
                    View destination →
                  </Link>
                )}
              </div>

              {/* Vertical metadata rail */}
              <div
                data-scene-meta
                className="hidden max-w-[180px] flex-col gap-2 text-right md:flex"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-600">
                  {scene.location}
                </p>
                {scene.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] uppercase tracking-widest text-stone-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
