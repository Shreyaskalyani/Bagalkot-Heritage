"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Utensils, Heart, Check, Info, Flame, X } from "lucide-react";
import { THALI_ITEMS } from "@/data/food-culture";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassPanel from "@/components/ui/GlassPanel";

export default function FoodPlate() {
  const [selectedItem, setSelectedItem] = useState(THALI_ITEMS[0]);

  // Coordinates on overhead plate representation (percentage-based)
  const PIN_POSITIONS = {
    "jolada-rotti": { top: "45%", left: "28%" },
    "yennegayi": { top: "25%", left: "62%" },
    "shenga-chutney-pudi": { top: "68%", left: "70%" },
    "kaalu-palya": { top: "72%", left: "32%" },
    "hasi-mosaru-majjige": { top: "32%", left: "42%" },
    "ranjaka": { top: "54%", left: "55%" },
  };

  return (
    <section id="food-plate" className="py-24 md:py-32 scroll-mt-24" aria-label="Interactive Traditional Thali Plate">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="The Royal North Karnataka Oota"
          title={
            <>
              Anatomy of the
              <span className="block text-gold-400">Traditional Feasting Plate.</span>
            </>
          }
          lead="Every element of the authentic Bagalkot thali balances heat, digestion, nutrition, and texture. Tap any item on the plate to uncover its preparation, cultural lore, and nutritional secrets."
        />

        {/* Quick Dish Selection Chips */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {THALI_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedItem.id === item.id
                  ? "bg-gold-500 text-charcoal-950 shadow-[0_0_15px_rgba(181,137,56,0.4)]"
                  : "border border-stone-800 bg-charcoal-950/80 text-stone-300 hover:border-gold-500/40 hover:text-ivory"
              }`}
            >
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Plate Interactive Showcase */}
        <div className="mt-12 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
          {/* Overhead Plate Visual with Hotspot Pins */}
          <div className="relative aspect-square max-w-[550px] mx-auto w-full rounded-full border-4 border-gold-500/20 bg-charcoal-900 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden p-6 sm:p-10 flex items-center justify-center">
            {/* Background Thali Feast Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/images/akki-roti.jpg"
                alt="Traditional North Karnataka Thali Feast"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-charcoal-950/30" />
            </div>

            {/* Interactive Pins over Plate */}
            {THALI_ITEMS.map((item) => {
              const pos = PIN_POSITIONS[item.id] || { top: "50%", left: "50%" };
              const isSelected = selectedItem.id === item.id;

              return (
                <div
                  key={item.id}
                  style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -50%)" }}
                  className="absolute z-20"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="group relative flex items-center justify-center focus:outline-none"
                    aria-label={`Inspect ${item.name}`}
                  >
                    {/* Pulsing halo */}
                    <span className="absolute h-9 w-9 rounded-full bg-gold-400/40 animate-ping opacity-75" />

                    {/* Button circle */}
                    <span
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isSelected
                          ? "border-ivory bg-gold-400 text-charcoal-950 scale-125 shadow-[0_0_20px_rgba(234,179,8,1)]"
                          : "border-gold-400 bg-charcoal-950/90 text-gold-400 group-hover:scale-115 group-hover:bg-gold-500 group-hover:text-charcoal-950 shadow-lg"
                      }`}
                    >
                      <Sparkles size={13} strokeWidth={2.5} />
                    </span>

                    {/* Floating label */}
                    <span className="absolute top-full mt-1.5 whitespace-nowrap rounded-md border border-gold-500/30 bg-charcoal-950/95 px-2 py-0.5 text-[10px] font-semibold text-ivory opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md pointer-events-none">
                      {item.name}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active Dish Detail Card */}
          <GlassPanel className="p-8 sm:p-10 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="rounded-full border border-gold-500/40 bg-gold-500/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold-400">
                  {selectedItem.badge}
                </span>
                <span className="font-display text-base text-gold-500 font-medium">
                  {selectedItem.kannada}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-ivory">
                {selectedItem.name}
              </h3>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-800">
              <div className="rounded-xl border border-stone-800/80 bg-charcoal-950/60 p-3">
                <p className="text-[10px] uppercase tracking-wider text-stone-400">Flavor Profile</p>
                <p className="text-xs font-semibold text-ivory mt-0.5">{selectedItem.spiciness}</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-charcoal-950/60 p-3">
                <p className="text-[10px] uppercase tracking-wider text-stone-400">Texture</p>
                <p className="text-xs font-semibold text-ivory mt-0.5">{selectedItem.texture}</p>
              </div>
            </div>

            {/* Culinary Description */}
            <p className="text-sm leading-relaxed text-stone-300 font-sans">
              {selectedItem.description}
            </p>

            {/* Cultural Significance */}
            <div className="rounded-2xl border border-gold-500/25 bg-gold-500/5 p-4 text-xs leading-relaxed text-stone-300">
              <strong className="text-gold-400 block mb-1">Cultural Tradition:</strong>
              {selectedItem.culturalSignificance}
            </div>

            {/* Nutrition & Pairings */}
            <div className="space-y-3 pt-2 border-t border-stone-800 text-xs">
              <div>
                <span className="text-stone-400 font-medium">Nutritional Character: </span>
                <span className="text-stone-200">{selectedItem.nutrition}</span>
              </div>
              <div>
                <span className="text-stone-400 font-medium">Best Paired With: </span>
                <span className="text-gold-300">{selectedItem.pairings.join(" · ")}</span>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
