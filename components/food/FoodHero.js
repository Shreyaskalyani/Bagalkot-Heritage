"use client";

import Link from "next/link";
import { Utensils, Wheat, Flame, Heart, ArrowDown, MapPin } from "lucide-react";
import ParallaxImage from "@/components/cinematic/ParallaxImage";

export default function FoodHero() {
  return (
    <section
      className="relative flex min-h-[88svh] items-center justify-center overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
      aria-label="Bagalkot Food Culture Hero"
    >
      {/* Background Photography with Dedicated Layering */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <ParallaxImage
          src="/images/akki-roti.jpg"
          alt="Traditional North Karnataka feast with Jolada Rotti, Yennegayi and spiced condiments"
          className="absolute inset-0 h-full w-full"
          speed={0.2}
        />
        {/* Warm Cinematic Overlays: Highlights feast photography while ensuring high contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/75 to-charcoal-950/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/70 via-transparent to-charcoal-950/70" />
        <div className="absolute inset-0 bg-stone-950/25" />
      </div>

      {/* Main Centered Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center md:px-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400 backdrop-blur-md">
          <Utensils size={14} className="text-gold-400" />
          <span>Taste the Story · Bagalkot Food Culture</span>
        </div>

        {/* Title */}
        <h1 className="mt-6 font-display text-4xl sm:text-6xl md:text-7xl font-light text-ivory tracking-tight leading-[1.05]">
          Born of the Stone.
          <span className="block text-gold-400 font-normal">Nurtured by the Soil.</span>
        </h1>

        {/* Lead */}
        <p className="mt-6 mx-auto max-w-2xl font-sans text-sm md:text-base leading-relaxed text-stone-200">
          The culinary heritage of the Malaprabha Valley was born of the same red sandstone cliffs, mineral-rich black cotton soil, and ancient agrarian wisdom that built the Chalukyan empire. Hand-patted sorghum breads, slow-simmered stuffed eggplants, and nutrient-dense flaxseed chutneys sustained a thousand years of temple builders.
        </p>

        {/* Quick Cultural Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-stone-300">
          <span className="flex items-center gap-1.5 rounded-full border border-stone-800 bg-charcoal-950/80 px-3.5 py-1.5 backdrop-blur-md">
            <Wheat size={13} className="text-gold-400" />
            Gluten-Free Sorghum Heritage
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-stone-800 bg-charcoal-950/80 px-3.5 py-1.5 backdrop-blur-md">
            <Flame size={13} className="text-gold-400" />
            Wood-Fired Iron Tawa
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-stone-800 bg-charcoal-950/80 px-3.5 py-1.5 backdrop-blur-md">
            <Heart size={13} className="text-gold-400" />
            100% Pure Vegetarian Oota
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#food-plate"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_25px_rgba(181,137,56,0.4)]"
          >
            <span>Explore the Thali Plate</span>
            <ArrowDown size={14} />
          </a>

          <a
            href="#khanavalis"
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-charcoal-950/80 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-ivory transition-colors hover:border-gold-400 hover:bg-gold-500/10"
          >
            <MapPin size={14} className="text-gold-400" />
            <span>Where to Eat</span>
          </a>
        </div>
      </div>
    </section>
  );
}
