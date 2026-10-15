"use client";

import { MapPin, Clock, Star, Phone, Utensils, Award } from "lucide-react";
import { KHANAVALI_LOCATIONS } from "@/data/food-culture";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassPanel from "@/components/ui/GlassPanel";

export default function FoodMap() {
  return (
    <section id="khanavalis" className="py-24 md:py-32 scroll-mt-24" aria-label="Where to Eat — Traditional Khanavalis">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Dining Directory & Culinary Geography"
          title={
            <>
              Where to Eat in the Valley.
              <span className="block text-gold-400">Authentic Khanavalis &amp; Hearth Stalls.</span>
            </>
          }
          lead="North Karnataka's legendary Khanavalis serve hot, freshly hand-patted Jolada Rottis with unlimited refills. Here are the revered family-run dining institutions across the heritage corridor."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {KHANAVALI_LOCATIONS.map((place, idx) => (
            <GlassPanel key={place.name} className="flex flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-400">
                    {place.type}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {place.rating}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-xl text-ivory">
                  {place.name}
                </h3>

                <div className="mt-3 flex items-start gap-2 text-xs text-stone-400">
                  <MapPin size={14} className="shrink-0 text-gold-400 mt-0.5" />
                  <span>{place.location}</span>
                </div>

                <div className="mt-4 rounded-xl border border-stone-800 bg-charcoal-950/70 p-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-500">
                    Signature Feast
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-stone-300">
                    {place.specialty}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-gold-400" />
                  <span className="text-[11px]">{place.timings.split("&")[0].trim()}</span>
                </div>
                <span className="text-[11px] text-stone-500">{place.contact}</span>
              </div>
            </GlassPanel>
          ))}
        </div>

        {/* Etiquette and Traveler Tip */}
        <div className="mt-10 rounded-2xl border border-gold-500/25 bg-gradient-to-r from-gold-500/10 via-charcoal-900 to-charcoal-950 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-500/20 text-gold-400">
              <Award size={20} />
            </span>
            <div>
              <h4 className="font-display text-base text-ivory">Khanavali Dining Etiquette</h4>
              <p className="text-xs text-stone-300 mt-0.5">
                Always wash hands at the brass tap before taking your seat. Crush Kadak Rotti with your knuckles before bathing it in curd and spiced powders!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
