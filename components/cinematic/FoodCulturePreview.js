"use client";

import Link from "next/link";
import Image from "next/image";
import { Utensils, ArrowRight, Wheat, Flame, Heart, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FoodCulturePreview() {
  return (
    <section className="relative py-24 md:py-32 bg-charcoal-950 border-t border-gold-500/15" aria-label="Food Culture Preview">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              <Utensils size={13} className="text-gold-400" />
              <span>Taste the Story · Bagalkot Food Culture</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-light text-ivory tracking-tight">
              Born of the Stone.
              <span className="block text-gold-400 font-normal">Nurtured by the Soil.</span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-stone-300 font-sans">
              The cuisine of Bagalkot was shaped by the same red cliffs and black cotton soil that built the Chalukyan empire. Hand-patted sorghum breads, wood-fired hearths, and slow-simmered stuffed eggplants have nourished pilgrims and stonemasons for over a millennium.
            </p>

            {/* Quick 5-Step Journey Teaser */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {[
                { step: "01", name: "Stone" },
                { step: "02", name: "Earth" },
                { step: "03", name: "Jowar" },
                { step: "04", name: "Kitchen" },
                { step: "05", name: "Thali" },
              ].map((s) => (
                <div key={s.step} className="rounded-xl border border-stone-800 bg-charcoal-900/60 p-2.5 text-center">
                  <span className="block font-mono text-[9px] text-gold-500 font-bold">{s.step}</span>
                  <span className="block text-[11px] font-semibold text-ivory mt-0.5">{s.name}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/food-culture"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(181,137,56,0.35)]"
              >
                <span>Explore Full Food Culture Experience</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right: Teaser Plate Card */}
          <div className="relative overflow-hidden rounded-3xl border border-gold-500/25 bg-charcoal-900 shadow-2xl p-6 sm:p-8">
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-6">
              <Image
                src="/images/akki-roti.jpg"
                alt="Traditional North Karnataka Feast"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-md bg-charcoal-950/90 px-2.5 py-1 text-[11px] font-semibold text-gold-400 border border-gold-500/30">
                Jolada Rotti Oota &amp; Yennegayi
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>Featured Specialty:</span>
                <span className="font-semibold text-ivory">Unlimited Vegetarian Feast</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Discover authentic family-run Khanavalis, the sacred hand-patting technique, nutritional millet secrets, and where to eat across Badami, Pattadakal, and Aihole.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-800">
                <span className="text-gold-400 font-mono text-[11px]">100% Pure Vegetarian</span>
                <Link
                  href="/food-culture#khanavalis"
                  className="font-semibold uppercase tracking-wider text-stone-300 hover:text-gold-300 transition-colors"
                >
                  Khanavali Directory →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
