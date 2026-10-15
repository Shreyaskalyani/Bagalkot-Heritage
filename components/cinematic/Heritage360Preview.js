"use client";

import Link from "next/link";
import Image from "next/image";
import { Compass, Eye, ArrowRight, Sparkles, MapPin, Maximize2 } from "lucide-react";

export default function Heritage360Preview() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold-500/25 bg-charcoal-950 p-6 md:p-10">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
        {/* Left: Teaser Visual */}
        <div className="group relative h-[280px] sm:h-[340px] w-full overflow-hidden rounded-2xl border border-stone-800 bg-charcoal-900 shadow-xl">
          <Image
            src="/images/badami-panorama-8k.jpg"
            alt="360 panoramic preview of Badami sandstone caves"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/25 to-charcoal-950/40" />

          {/* Compass & HUD Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-charcoal-950/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-400 backdrop-blur-md">
              <Compass size={13} className="animate-spin text-gold-400" />
              <span>Interactive 360° Spherical Views</span>
            </span>
          </div>

          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between">
            <div className="rounded-lg bg-charcoal-950/85 px-3 py-1 font-mono text-[10px] text-stone-300 backdrop-blur-md border border-stone-800">
              6 Curated 360° Sanctuaries Available
            </div>

            <Link
              href="/360-heritage"
              className="flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 shadow-lg"
            >
              <span>Launch 360°</span>
              <Maximize2 size={12} />
            </Link>
          </div>
        </div>

        {/* Right: Context & CTAs */}
        <div className="space-y-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500">
              Virtual Sanctuary Experience
            </span>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl text-ivory">
              Stand Inside the Monuments in 360°.
            </h3>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-stone-300 font-sans">
            Rotate 360° horizontally, tilt up into towering Dravidian vimanas, and inspect rock-cut sculptures with smooth touch and mouse navigation or Google Maps Street View photospheres.
          </p>

          {/* Viewpoint Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              "Badami Caves Cliff",
              "Agastya Lake",
              "Upper Shivalaya",
              "UNESCO Pattadakal",
              "Aihole Durga Temple",
              "Mahakuta Springs",
            ].map((name) => (
              <span
                key={name}
                className="rounded-full border border-stone-800 bg-charcoal-900/60 px-2.5 py-1 text-[11px] text-stone-300"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/360-heritage"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(181,137,56,0.35)]"
            >
              <Eye size={14} />
              <span>Explore All 360° Sanctuaries</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
