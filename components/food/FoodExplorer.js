"use client";

import { useState } from "react";
import Image from "next/image";
import { Filter, MapPin, Tag, Sparkles, Flame, Check } from "lucide-react";
import { EXPLORER_DISHES } from "@/data/food-culture";
import SectionHeading from "@/components/ui/SectionHeading";

const CATEGORIES = [
  "All Dishes",
  "Traditional Feast",
  "Street Snacks",
  "Sweets & Desserts",
  "Vegetarian Staples",
];

export default function FoodExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("All Dishes");

  const filteredDishes =
    selectedCategory === "All Dishes"
      ? EXPLORER_DISHES
      : EXPLORER_DISHES.filter((d) => d.category === selectedCategory);

  return (
    <section className="py-24 md:py-32 bg-charcoal-900/30 border-t border-stone-800/80" aria-label="What Should I Try Food Explorer">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Curated Gastronomy Guide"
            title={
              <>
                What Should I Try?
                <span className="block text-gold-400">Valley Delicacies by Taste.</span>
              </>
            }
            lead="Whether you are craving an unlimited village feast after climbing Badami's rock stairs or an evening snack of fiery Girmit beside Agastya Lake, discover the essential culinary stops."
          />
        </div>

        {/* Filter Category Pills */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? "bg-gold-500 text-charcoal-950 shadow-[0_0_15px_rgba(181,137,56,0.35)]"
                  : "border border-stone-800 bg-charcoal-950/70 text-stone-300 hover:border-gold-500/40 hover:text-ivory"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-stone-800/90 bg-charcoal-950 transition-all duration-300 hover:border-gold-500/40 hover:shadow-2xl"
            >
              {/* Photo */}
              <div className="relative h-52 w-full overflow-hidden bg-charcoal-900">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />

                <span className="absolute top-3 left-3 rounded-full border border-gold-500/30 bg-charcoal-950/85 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-400 backdrop-blur-md">
                  {dish.category}
                </span>

                <span className="absolute bottom-3 right-3 rounded-md bg-charcoal-950/90 px-2 py-0.5 font-mono text-[10px] text-stone-300 backdrop-blur-sm">
                  {dish.dietary}
                </span>
              </div>

              {/* Information */}
              <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ivory group-hover:text-gold-300 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-300 line-clamp-3">
                    {dish.summary}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-800/80 text-xs">
                  <div className="flex items-start gap-2 text-stone-400">
                    <MapPin size={13} className="shrink-0 text-gold-400 mt-0.5" />
                    <span>{dish.bestPlace}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 font-mono text-stone-400">
                    <span>Estimate:</span>
                    <strong className="text-gold-400 font-semibold">{dish.priceRange}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
