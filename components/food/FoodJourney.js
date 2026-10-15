"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { FOOD_JOURNEY_STAGES } from "@/data/food-culture";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FoodJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const currentStage = FOOD_JOURNEY_STAGES[activeStage];

  return (
    <section className="relative py-24 md:py-32 bg-charcoal-900/40 border-y border-stone-800/80" aria-label="The 5-Stage Culinary Journey">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="The Match-Cut Transformation"
          title={
            <>
              From Sacred Stone.
              <span className="block text-gold-400">To the Feasting Plate.</span>
            </>
          }
          lead="Trace the unbroken lineage connecting 6th-century Chalukyan geology, drought-resilient black soil, white pearl sorghum harvests, and the hand-patted rotti hearths of today."
        />

        {/* Step Indicator Bar */}
        <div className="mt-14 flex items-center justify-between overflow-x-auto pb-4 gap-2 border-b border-stone-800/80 scrollbar-none">
          {FOOD_JOURNEY_STAGES.map((stage, idx) => (
            <button
              key={stage.step}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all shrink-0 text-left ${
                activeStage === idx
                  ? "bg-gold-500/15 border border-gold-400 text-gold-300 shadow-[0_0_15px_rgba(181,137,56,0.25)]"
                  : "border border-transparent text-stone-400 hover:text-ivory hover:bg-charcoal-900/60"
              }`}
            >
              <span className={`font-mono text-sm font-bold ${activeStage === idx ? "text-gold-400" : "text-stone-500"}`}>
                {stage.step}
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ivory">
                  {stage.title}
                </p>
                <p className="text-[10px] text-stone-400 line-clamp-1">
                  {stage.subtitle.split("(")[0].trim()}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Showcase Card */}
        <div className="mt-10 rounded-3xl border border-gold-500/25 bg-charcoal-950 overflow-hidden shadow-2xl grid lg:grid-cols-2 items-center">
          {/* Image Side */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] w-full overflow-hidden bg-charcoal-900">
            <Image
              src={currentStage.image}
              alt={currentStage.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />

            <div className="absolute top-4 left-4 rounded-full border border-gold-500/40 bg-charcoal-950/85 px-3.5 py-1 text-[10px] font-mono uppercase tracking-widest text-gold-400 backdrop-blur-md">
              STAGE {currentStage.step} OF 05
            </div>
          </div>

          {/* Text Side */}
          <div className="p-8 sm:p-12 space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-gold-500">
              {currentStage.tag}
            </span>

            <h3 className="font-display text-3xl sm:text-4xl text-ivory">
              {currentStage.title}: {currentStage.subtitle}
            </h3>

            <p className="text-sm sm:text-base leading-relaxed text-stone-300 font-sans">
              {currentStage.desc}
            </p>

            <div className="rounded-2xl border border-stone-800 bg-charcoal-900/60 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <p className="text-xs leading-relaxed text-stone-300">
                  <strong className="text-ivory">Agrarian Lore: </strong>
                  {currentStage.details}
                </p>
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-800/80">
              <button
                type="button"
                onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
                disabled={activeStage === 0}
                className="text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-ivory disabled:opacity-30"
              >
                ← Previous Stage
              </button>

              <button
                type="button"
                onClick={() => setActiveStage((prev) => Math.min(FOOD_JOURNEY_STAGES.length - 1, prev + 1))}
                disabled={activeStage === FOOD_JOURNEY_STAGES.length - 1}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400 hover:text-gold-300 disabled:opacity-30"
              >
                <span>Next Stage</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
