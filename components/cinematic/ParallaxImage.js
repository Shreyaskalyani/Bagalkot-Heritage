"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Image with gentle scroll parallax (image moves slower than page).
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.2,
}) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [speed]);

  const hasPosition =
    className.includes("absolute") ||
    className.includes("fixed") ||
    className.includes("relative") ||
    className.includes("static");

  return (
    <div
      ref={wrapRef}
      className={`overflow-hidden ${hasPosition ? "" : "relative"} ${className}`}
    >
      <div
        ref={imgRef}
        className="absolute inset-x-0 -top-[15%] h-[130%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
    </div>
  );
}
