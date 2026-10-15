"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Utensils, Compass, ArrowRight, Sparkles } from "lucide-react";
import FoodHero from "@/components/food/FoodHero";
import FoodJourney from "@/components/food/FoodJourney";
import FoodPlate from "@/components/food/FoodPlate";
import FoodExplorer from "@/components/food/FoodExplorer";
import FoodTraditions from "@/components/food/FoodTraditions";
import FoodMap from "@/components/food/FoodMap";
import FoodGallery from "@/components/food/FoodGallery";
import FoodStory from "@/components/food/FoodStory";

export default function FoodCulturePage() {
  return (
    <main className="min-h-screen bg-charcoal-950">
      {/* 01 — Cinematic Hero */}
      <FoodHero />

      {/* 02 — Match-Cut Journey: Stone -> Earth -> Jowar -> Kitchen -> Feasting Plate */}
      <FoodJourney />

      {/* 03 — Anatomical Interactive Thali Plate */}
      <FoodPlate />

      {/* 04 — "What Should I Try?" Dish Explorer by Category */}
      <FoodExplorer />

      {/* 05 — Living Heritage & Artisanal Crafts */}
      <FoodTraditions />

      {/* 06 — Traditional Khanavalis & Culinary Geography */}
      <FoodMap />

      {/* 06 — Documentary Hearth Photography Gallery */}
      <FoodGallery />

      {/* 07 — Cultural Stories & Audio Guide */}
      <FoodStory />

      {/* 08 — Cross-Navigation CTA to 360 Heritage & Planner */}
      <section className="py-20 md:py-28 border-t border-stone-800/80 bg-charcoal-900/40">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="rounded-3xl border border-gold-500/30 bg-gradient-to-r from-gold-500/15 via-charcoal-900 to-charcoal-950 p-8 md:p-12 flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400">
                Continue the Valley Journey
              </span>
              <h3 className="mt-2 font-display text-2xl md:text-3xl text-ivory">
                Step Inside the Temples in 360° Vision
              </h3>
              <p className="mt-2 text-xs md:text-sm text-stone-300">
                Experience the rock-cut cave temples of Badami, sacred Agastya Lake, and UNESCO Pattadakal in full panoramic horizontal and vertical rotation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/360-heritage"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(181,137,56,0.35)]"
              >
                <Compass size={14} />
                <span>Enter 360° Heritage</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/planner"
                className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-charcoal-950 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ivory transition-colors hover:border-gold-500"
              >
                <span>Plan Your Route</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
