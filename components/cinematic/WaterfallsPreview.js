"use client";

import Link from "next/link";
import Image from "next/image";
import { Waves, ArrowRight, MapPin, Volume2, ShieldAlert } from "lucide-react";

export default function WaterfallsPreview() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold-500/25 bg-charcoal-950 p-6 md:p-10">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
        {/* Left: Real Waterfall Visual */}
        <div className="group relative h-[280px] sm:h-[340px] w-full overflow-hidden rounded-2xl border border-stone-800 bg-charcoal-900 shadow-xl">
          <Image
            src="/images/waterfalls/akka-tangi-falls.jpg"
            alt="Akka-Tangi Twin Sisters Falls cascading down Badami sandstone cliffs"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-charcoal-950/40" />

          {/* Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-charcoal-950/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-400 backdrop-blur-md">
              <Waves size={13} className="text-cyan-400" />
              <span>Monsoon Cascades & Natural Springs</span>
            </span>
          </div>

          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between">
            <div className="rounded-lg bg-charcoal-950/85 px-3 py-1 font-mono text-[10px] text-stone-300 backdrop-blur-md border border-stone-800">
              12 Waterfalls & Streams Across 9 Taluks
            </div>

            <Link
              href="/waterfalls"
              className="flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 shadow-lg"
            >
              <span>Explore Falls</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Right: Narrative & Taluks */}
        <div className="space-y-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500">
              Seasonal Natural Wonders
            </span>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl text-ivory">
              Chasing Waterfalls Across Bagalkot.
            </h3>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-stone-300 font-sans">
            When the Deccan monsoon arrives, crimson sandstone ravines transform into roaring cascades. From the 70m plunge of Akka-Tangi behind Bhutanatha Temple to pristine hidden forest streams in Guledgudda.
          </p>

          {/* Quick Taluk Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              "Badami Gorge",
              "Guledgudda",
              "Hungund",
              "Mudhol Weir",
              "Kudalasangama",
              "Bilagi Barrage",
            ].map((name) => (
              <span
                key={name}
                className="rounded-full border border-stone-800 bg-charcoal-900/60 px-2.5 py-1 text-[11px] text-stone-300"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/waterfalls"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(181,137,56,0.35)]"
            >
              <Waves size={14} />
              <span>Launch Waterfalls Explorer</span>
              <ArrowRight size={14} />
            </Link>

            <span className="text-[11px] text-stone-400 flex items-center gap-1.5">
              <Volume2 size={13} className="text-gold-400" />
              Includes Multilingual Audio Narration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
