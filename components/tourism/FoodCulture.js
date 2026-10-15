"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Sparkles, Flame, Wheat, Compass, ArrowRight, Info, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassPanel from "@/components/ui/GlassPanel";

const MATCH_CUT_STEPS = [
  {
    step: "01",
    label: "STONE",
    subtitle: "Chalukyan Monoliths",
    desc: "Red sandstone cliffs cut by wind, sun and chisel across millennia.",
    color: "from-amber-900/60 to-charcoal-950",
  },
  {
    step: "02",
    label: "EARTH",
    subtitle: "Black Deccan Soil",
    desc: "The mineral-rich Malaprabha plains, retaining seasonal monsoon waters.",
    color: "from-stone-900/80 to-charcoal-950",
  },
  {
    step: "03",
    label: "JOWAR",
    subtitle: "White Sorghum (Jola)",
    desc: "Drought-resilient pearly grain hand-harvested by local farming hamlets.",
    color: "from-yellow-900/40 to-charcoal-950",
  },
  {
    step: "04",
    label: "KITCHEN",
    subtitle: "Wood-Fired Iron Tawa",
    desc: "Hand-patted round breads slapped onto raging hearths with water.",
    color: "from-orange-950/50 to-charcoal-950",
  },
  {
    step: "05",
    label: "FOOD",
    subtitle: "The Royal North Karnataka Meal",
    desc: "A living feast of rotti, stuffed eggplants, and nutty spiced powders.",
    color: "from-gold-900/40 to-charcoal-950",
  },
];

const THALI_HOTSPOTS = [
  {
    id: "rotti",
    name: "Jolada Rotti",
    kannada: "ಜೋಳದ ರೊಟ್ಟಿ",
    type: "Hand-Patted Sorghum Bread",
    x: 32,
    y: 42,
    description:
      "The undisputed foundation of North Karnataka food. Made purely from milled white jowar (sorghum) flour and hot water — with zero gluten or oil — each thin disc is swiftly rhythmically patted by hand (thattodu) and blistered over a flaming dry iron pan until it puffs.",
    culturalNote:
      "Eaten soft when hot (Medu Rotti) or sun-baked into crisp discs (Kadak Rotti) that travellers historically carried for weeks across the Deccan trade routes.",
    pairings: ["Yennegayi", "Shenga Chutney Pudi", "Fresh Butter"],
  },
  {
    id: "yennegayi",
    name: "Badnekayi Yennegayi",
    kannada: "ಬದನೆಕಾಯಿ ಎಣ್ಣೆಗಾಯಿ",
    type: "Stuffed Spiced Brinjal Curry",
    x: 65,
    y: 28,
    description:
      "Tender local purple-green baby brinjals slit four ways and packed with an intensely aromatic stuffing of roasted groundnuts, toasted white sesame, dried red Byadgi chillies, coriander seed, garlic, tamarind pulp, and jaggery. Slow-simmered in cold-pressed peanut oil until velvety.",
    culturalNote:
      "The sweet, sour, nutty and fiery balance of Yennegayi is the signature celebration dish across Bagalkot village feasts and festivals.",
    pairings: ["Hot Jolada Rotti", "Sajje Rotti"],
  },
  {
    id: "chutney-pudi",
    name: "Shenga Chutney & Pudi",
    kannada: "ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ",
    type: "Roasted Peanut & Flaxseed Powders",
    x: 75,
    y: 62,
    description:
      "A dry, coarse powder pounded from slow-roasted peanuts, Byadgi chillies, roasted garlic cloves, curry leaves, and cumin. Often served alongside 'Agasi Chutney' (made from nutritious roasted flaxseeds) and moistened on the plate with golden raw groundnut or safflower oil.",
    culturalNote:
      "Every North Karnataka home keeps large earthenware bharanis filled with fresh chutney pudi; it is the soul of daily breakfasts and dinners.",
    pairings: ["Cold-pressed groundnut oil", "Curd", "Ghee"],
  },
  {
    id: "kaalu-palya",
    name: "Hesaru Kaalu Palya",
    kannada: "ಹೆಸರು ಕಾಳು ಪಲ್ಯ",
    type: "Sprouted Whole Green Moong & Pulses",
    x: 25,
    y: 72,
    description:
      "Whole green grams (hesaru kaalu) or sprouted moth beans (matki) gently tempered with black mustard seeds, hing (asafoetida), turmeric, slit green chillies, and tossed with fresh grated coconut. Rich in clean plant protein to sustain agrarian work in the warm valley.",
    culturalNote:
      "Prepared without heavy gravies to preserve the clean, nutty sweetness of the sprouted grain.",
    pairings: ["Crisp onions", "Lemon wedge", "Rotti"],
  },
  {
    id: "mosaru",
    name: "Hasi Mosaru & Majjige",
    kannada: "ಮೊಸರು & ಮಜ್ಜಿಗೆ",
    type: "Clay-Pot Set Curd & Spiced Buttermilk",
    x: 50,
    y: 52,
    description:
      "Dense, naturally sweet buffalo curd fermented in unglazed terracotta pots, or whisked into cool buttermilk tempered with crushed cumin seeds, rock salt, minced ginger, and fresh coriander. Serves as the cooling culinary antidote to the Deccan sun and fiery Byadgi chillies.",
    culturalNote:
      "Customarily savoured at the climax of the meal, poured directly over crushed Kadak Rotti or mixed with soft cooked rice.",
    pairings: ["Crushed Kadak Rotti", "Salted Raw Onions"],
  },
];

const MONUMENT_FOOD_PAIRS = [
  {
    monument: "Badami Cave Temples",
    focus: "Post-Climb Sustenance",
    dish: "Hot Jolada Rotti with Yennegayi & Raw Onion",
    location: "Heritage Khanavalis near Badami Bus Stand & Agastya Lake road",
    tip: "After climbing the 200+ stone stairs of Cave 1 to Cave 4, traditional Khanavalis serve piping hot, unlimited vegetarian meals on plantain leaves.",
  },
  {
    monument: "Pattadakal UNESCO Complex",
    focus: "Midday Temple Travellers",
    dish: "Kadak Rotti with Shenga Pudi & Chilled Majjige",
    location: "Local village eateries right outside the Malaprabha river gate",
    tip: "Kadak Rotti crushed by hand and bathed in curd and peanut oil provides an energizing, lightweight meal between temple studies.",
  },
  {
    monument: "Aihole & Mahakuta",
    focus: "Pilgrim & Village Flavours",
    dish: "Sprouted Kaalu Palya & Girmit (Masala Puffed Rice)",
    location: "Shaded roadside stalls near Durga Temple & Mahakuta grove",
    tip: "Try the afternoon street delicacy 'Girmit' — puffed rice tossed with tangy tamarind-chilli gravy, roasted gram flour, and sev, paired with hot mirchi bajji.",
  },
];

export default function FoodCulture() {
  const [activeHotspot, setActiveHotspot] = useState(THALI_HOTSPOTS[0]);

  return (
    <section
      className="relative bg-charcoal-950 py-24 md:py-36 border-t border-gold-500/15"
      aria-label="Bagalkot Food Culture — Taste the Story"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <p className="eyebrow text-gold-400">Regional Culinary Heritage</p>
          <h2 className="mt-3 display-lg text-ivory font-light">
            Taste the story.
            <span className="block text-gold-400">Bagalkot Food Culture.</span>
          </h2>
          <p className="body-large mx-auto mt-5 max-w-2xl text-stone-300 font-sans">
            In North Karnataka, stone and food share the same deep Deccan roots.
            From rain-fed pearl jowar harvested along the Malaprabha river to fire-baked
            rotti and slow-simmered eggplants, every bite reflects centuries of agrarian wisdom.
          </p>
        </div>

        {/* ======================================================== */}
        {/* MATCH-CUT PROGRESSION: STONE -> EARTH -> JOWAR -> KITCHEN -> FOOD */}
        {/* ======================================================== */}
        <div className="mt-16">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-stone-400 mb-6">
            The Journey of Flavour — From Temple Rock to Table
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {MATCH_CUT_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="group relative overflow-hidden rounded-2xl border border-gold-500/20 bg-charcoal-900/60 p-5 transition-all hover:border-gold-400 hover:bg-charcoal-900"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gold-500 font-semibold tracking-wider">
                    {step.step}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400 opacity-60 group-hover:scale-150 transition-transform" />
                </div>
                <h3 className="mt-3 font-display text-2xl text-ivory font-normal tracking-wide">
                  {step.label}
                </h3>
                <p className="mt-1 text-xs font-semibold text-gold-400 uppercase tracking-wider">
                  {step.subtitle}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-stone-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE TRADITIONAL MEAL THALI (Hotspots & Detail)   */}
        {/* ======================================================== */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-400">
              <Utensils size={13} />
              Interactive Traditional Thali
            </span>
            <h3 className="mt-4 font-display text-3xl md:text-4xl text-ivory font-light">
              Explore the North Karnataka Feast
            </h3>
            <p className="mt-2 text-xs md:text-sm text-stone-400">
              Tap any item on the plate or select from the menu to discover its ingredients,
              wood-fired preparation, and historical folklore.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] items-center">
            {/* Visual Thali Composition with Clickable Hotspots */}
            <GlassPanel className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-3xl p-6 flex items-center justify-center border-gold-500/25">
              {/* Radial warm lighting & platter rim */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,137,56,0.15)_0%,transparent_70%)]" />

              {/* Stylised Brass Platter Ring */}
              <div className="relative h-[85%] aspect-square rounded-full border-4 border-amber-600/40 bg-gradient-to-br from-charcoal-900 via-charcoal-950 to-charcoal-900 shadow-2xl flex items-center justify-center p-6">
                {/* Banana Leaf Base Layer Ring */}
                <div className="absolute inset-3 rounded-full border border-emerald-900/40 bg-emerald-950/20" />

                {/* Hotspot Dots */}
                {THALI_HOTSPOTS.map((dish) => {
                  const isSelected = activeHotspot.id === dish.id;
                  return (
                    <button
                      key={dish.id}
                      onClick={() => setActiveHotspot(dish)}
                      style={{ left: `${dish.x}%`, top: `${dish.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group flex flex-col items-center focus:outline-none`}
                      aria-label={`Select ${dish.name}`}
                    >
                      <span className="relative flex h-8 w-8 items-center justify-center">
                        {isSelected && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                        )}
                        <span
                          className={`relative inline-flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold transition-all shadow-md ${
                            isSelected
                              ? "bg-gold-500 text-charcoal-950 border-gold-300 scale-110"
                              : "bg-charcoal-900/90 text-gold-300 border-gold-500/50 hover:bg-gold-500 hover:text-charcoal-950 hover:scale-105"
                          }`}
                        >
                          <Utensils size={12} />
                        </span>
                      </span>
                      <span
                        className={`mt-1 whitespace-nowrap rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md transition-all ${
                          isSelected
                            ? "bg-gold-500 text-charcoal-950 font-bold shadow-md"
                            : "bg-charcoal-950/80 text-stone-300 border border-stone-800"
                        }`}
                      >
                        {dish.name}
                      </span>
                    </button>
                  );
                })}

                {/* Center Platter Inscription */}
                <div className="text-center pointer-events-none opacity-40">
                  <p className="font-display text-sm tracking-[0.25em] text-gold-400">
                    BAGALKOT
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-stone-400">
                    Oota Platter
                  </p>
                </div>
              </div>
            </GlassPanel>

            {/* Selected Dish Detail Card */}
            <div className="rounded-3xl border border-gold-500/25 bg-charcoal-900/80 p-7 md:p-8 backdrop-blur-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-gold-400">
                    {activeHotspot.type}
                  </span>
                  <h4 className="mt-1 font-display text-3xl text-ivory font-light">
                    {activeHotspot.name}
                  </h4>
                  <p className="text-sm text-gold-500/90 font-medium mt-0.5">
                    {activeHotspot.kannada}
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400">
                  <Flame size={18} />
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-stone-300 font-sans">
                {activeHotspot.description}
              </p>

              {/* Cultural Note Box */}
              <div className="mt-6 rounded-2xl border border-gold-500/15 bg-charcoal-950/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                  <Sparkles size={12} />
                  Living Heritage Note
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-stone-300">
                  {activeHotspot.culturalNote}
                </p>
              </div>

              {/* Traditional Pairings */}
              <div className="mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  Traditional Accompaniments:
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeHotspot.pairings.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-stone-800 bg-stone-900/60 px-3 py-1 text-xs text-stone-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SEE THE MONUMENT. TASTE THE REGION.                     */}
        {/* ======================================================== */}
        <div className="mt-24 border-t border-gold-500/15 pt-16">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow text-gold-400">Heritage + Dining Experience</p>
              <h3 className="mt-2 font-display text-3xl md:text-5xl text-ivory font-light">
                See the monument.
                <span className="block text-gold-400">Taste the region.</span>
              </h3>
            </div>
            <p className="max-w-md text-xs md:text-sm text-stone-400 leading-relaxed">
              Never finish your temple circuit without experiencing the local Khanavalis (traditional
              eating homes) that have fed pilgrims and travellers for centuries.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {MONUMENT_FOOD_PAIRS.map((pair, i) => (
              <div
                key={pair.monument}
                className="rounded-2xl border border-gold-500/20 bg-charcoal-900/60 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gold-400 font-mono">
                    <span>CIRCUIT 0{i + 1}</span>
                    <span className="text-stone-400">{pair.focus}</span>
                  </div>
                  <h4 className="mt-3 font-display text-2xl text-ivory">
                    {pair.monument}
                  </h4>
                  <p className="mt-2 text-sm font-semibold text-gold-300">
                    {pair.dish}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-stone-400">
                    {pair.tip}
                  </p>
                </div>
                <div className="mt-6 border-t border-stone-800/80 pt-3 flex items-center justify-between text-[11px] text-stone-400">
                  <span>{pair.location}</span>
                  <CheckCircle2 size={13} className="text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
