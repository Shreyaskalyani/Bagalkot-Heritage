"use client";

import Image from "next/image";
import { Sparkles, MapPin, Award, Layers } from "lucide-react";
import { CULTURAL_TRADITIONS } from "@/data/food-culture.js";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FoodTraditions() {
  return (
    <section className="py-24 md:py-32 bg-charcoal-950 border-t border-stone-800/80" aria-label="Living Traditions and Crafts">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Living Heritage & Artisanal Crafts"
          title={
            <>
              Beyond the Stone.
              <span className="block text-gold-400">Living Crafts of Bagalkot.</span>
            </>
          }
          lead="The artisanal spirit of the Chalukyas lives on through GI-tagged handlooms, centuries-old embroidery techniques, and high-energy folk rhythms."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {CULTURAL_TRADITIONS.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-800/90 bg-charcoal-900/60 transition-all duration-300 hover:border-gold-500/40 hover:shadow-2xl"
            >
              {/* Image banner */}
              <div className="relative h-64 w-full overflow-hidden bg-charcoal-950">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-gold-500/40 bg-charcoal-950/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-400 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-serif text-xs text-gold-400 font-medium">
                    {item.kannadaName}
                  </p>
                  <h3 className="font-display text-2xl text-ivory group-hover:text-gold-300 transition-colors">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Content body */}
              <div className="flex flex-1 flex-col justify-between p-6 md:p-8 space-y-5">
                <p className="text-sm leading-relaxed text-stone-300">
                  {item.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-stone-800/80 text-xs">
                  <div className="flex items-start gap-2.5 text-stone-300">
                    <Award size={15} className="shrink-0 text-gold-400 mt-0.5" />
                    <div>
                      <span className="font-semibold text-ivory">Historical Origins: </span>
                      <span className="text-stone-400">{item.historicalOrigins}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-stone-300">
                    <Layers size={15} className="shrink-0 text-gold-400 mt-0.5" />
                    <div>
                      <span className="font-semibold text-ivory">Cultural Significance: </span>
                      <span className="text-stone-400">{item.significance}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-stone-300">
                    <MapPin size={15} className="shrink-0 text-gold-400 mt-0.5" />
                    <div>
                      <span className="font-semibold text-ivory">Where to Experience: </span>
                      <span className="text-stone-400">{item.whereToExperience}</span>
                    </div>
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
