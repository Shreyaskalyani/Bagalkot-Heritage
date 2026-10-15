"use client";

import { ShieldCheck, Heart, Sparkles, AlertCircle } from "lucide-react";

const PRINCIPLES = [
  {
    title: "Respect the Living Stone",
    desc: "Ancient sandstone surfaces and relief friezes are fragile. Avoid touching or leaning on delicate carvings.",
  },
  {
    title: "Zero Waste & Plastic Free",
    desc: "Keep the temple courtyards and Agastya Lake pristine by carrying all litter back with you.",
  },
  {
    title: "Honor Sacred Traditions",
    desc: "Many shrines in Mahakuta, Banashankari, and Badami remain living places of worship. Remove footwear where requested.",
  },
  {
    title: "Support Local Artisans",
    desc: "Encourage genuine village livelihoods by purchasing Ilkal handloom sarees and locally made crafts directly.",
  },
];

export default function ResponsibleHeritage() {
  return (
    <section
      className="relative bg-charcoal-950 py-24 md:py-36 border-t border-gold-500/15"
      aria-label="Responsible Heritage & Conservation"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* ======================================================== */}
        {/* CHAPTER 1: CONSERVATION MANIFESTO                       */}
        {/* ======================================================== */}
        <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-charcoal-900/60 p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,137,56,0.12)_0%,transparent_65%)]" />

          <p className="eyebrow text-gold-400">
            Archaeological Preservation
          </p>

          <h2 className="mt-6 font-display text-3xl md:text-5xl lg:text-6xl text-ivory font-light leading-tight max-w-3xl mx-auto">
            Heritage is not just what we inherit.
            <span className="block text-gold-400 font-normal mt-2">
              It is what we protect.
            </span>
          </h2>

          <p className="body-large mt-6 max-w-2xl mx-auto text-stone-300 font-sans">
            The Archaeological Survey of India (ASI) actively conserves over a hundred monolithic
            shrines across the Malaprabha corridor. Every visitor plays an indispensable role in ensuring
            these 1,400-year-old sanctuaries endure for future generations.
          </p>
        </div>

        {/* ======================================================== */}
        {/* CHAPTER 2: LEAVE THE STONE AS YOU FOUND IT              */}
        {/* ======================================================== */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow text-gold-400">Responsible Tourism</p>
            <h3 className="mt-3 font-display text-4xl md:text-5xl text-ivory font-light">
              Leave the stone
              <span className="block text-gold-400">as you found it.</span>
            </h3>
            <p className="mt-3 text-sm text-stone-400">
              Simple mindfulness safeguards centuries of Deccan craft and community heritage.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-2xl border border-stone-800 bg-charcoal-900/40 p-6 flex flex-col justify-between transition-colors hover:border-gold-500/30"
              >
                <div>
                  <div className="flex items-center justify-between text-gold-400 font-mono text-xs">
                    <span>0{idx + 1}</span>
                    <ShieldCheck size={16} />
                  </div>
                  <h4 className="mt-4 font-display text-xl text-ivory">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-stone-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
