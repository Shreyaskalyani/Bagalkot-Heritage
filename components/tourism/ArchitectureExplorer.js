"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Sparkles, Compass, Check, ArrowRight, Layers } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";

const ARCH_MOTIFS = [
  {
    id: "pillar",
    title: "Monolithic Pillar",
    kannada: "ಕಂಬ (Stambha)",
    category: "Structural Grammar",
    tagline: "Timber joinery translated into massive red sandstone",
    image: "/images/lad-khan-temple.jpg",
    location: "Lad Khan Temple, Aihole & Cave 3, Badami",
    description:
      "The massive square pillars of early Chalukyan halls preserve the exact joints, corbels, and brackets of ancient wooden architecture. In Cave 3 and Lad Khan, you see the decisive historical pivot where timber design was permanently translated into monumental masonry.",
    highlights: [
      "Square base transitioning into octagonal shafts",
      "Roll-bracket capitals supporting stone beams",
      "Carved medallion rosettes with garland-bearing couples",
    ],
    slug: "lad-khan-temple",
  },
  {
    id: "sculpture",
    title: "Narrative Sculpture",
    kannada: "ಶಿಲ್ಪ ಕಲೆ (Shilpa)",
    category: "Iconography & Relief",
    tagline: "Stone friezes reading like an open-air medieval library",
    image: "/images/pattadakal-galaganatha.jpg",
    location: "Virupaksha & Mallikarjuna Temples, Pattadakal",
    description:
      "Wall surfaces unfold continuous narrative panels illustrating the Ramayana, Mahabharata, and Panchatantra fables. Early devotees read these dynamic, deeply undercut friezes chronologically as they performed pradakshina (ritual circumambulation) around the sanctum.",
    highlights: [
      "Eighteen-armed dancing Nataraja carved into Cave 1",
      "Dynamic battle friezes of Arjuna and Bhishma at Pattadakal",
      "Intricate jewelry and garment drapery carved into living sandstone",
    ],
    slug: "virupaksha-temple-pattadakal",
  },
  {
    id: "gopuram",
    title: "Shikhara & Vimana",
    kannada: "ಶಿಖರ ಮತ್ತು ವಿಮಾನ",
    category: "Superstructure",
    tagline: "The historic confluence of Northern and Southern temple spires",
    image: "/images/virupaksha-temple.jpg",
    location: "Pattadakal UNESCO Complex & Galaganatha",
    description:
      "Pattadakal is renowned globally because northern curvilinear spires (Rekha-Nagara) and southern stepped pyramidal towers (Dravida Vimana) stand directly beside each other in one compound. Chalukya royal master-architects actively fused both traditions to create the Vesara style.",
    highlights: [
      "Stepped square tiers crowned with a dome-shaped Shikhara",
      "Curvilinear beehive-shaped towers topped with an Amalaka disc",
      "Architect inscriptions proudly naming master builders (Gunda Anivaritachari)",
    ],
    slug: "pattadakal-group-of-monuments",
  },
  {
    id: "mandapa",
    title: "Pillared Mandapa",
    kannada: "ಮಂಟಪ",
    category: "Assembly & Worship",
    tagline: "Grand columned halls designed for royal gathering and music",
    image: "/images/aihole-4k.jpg",
    location: "Durga Temple, Aihole & Badami Cave Verandahs",
    description:
      "The mandapa serves as the transition from the bustling outside world into the sacred silence of the inner sanctum (garbhagriha). High stone clerestories and pierced window slabs create a dramatic interplay of light and shadow across the assembly floor.",
    highlights: [
      "Apsidal peristyle ambulatory wrapping around the Durga sanctum",
      "Intricate central ceiling slabs featuring coiled serpent king Adisesha",
      "Acoustically resonant stone spaces designed for Vedic chanting",
    ],
    slug: "durga-temple-aihole",
  },
  {
    id: "entrance",
    title: "Dwara & River Goddesses",
    kannada: "ದ್ವಾರ ಮತ್ತು ಗಂಗಾ-ಯಮುನಾ",
    category: "Sacred Threshold",
    tagline: "Stepped portals marking ritual purification before entry",
    image: "/images/upper-shivalaya-6k.jpg",
    location: "Badami Caves & Mahakuta Shrines",
    description:
      "Sanctum doorframes feature multiple concentric carved bands (shakhas) adorned with floral scrolls, rosettes, and guardians. Flanking the lower jambs stand the river goddesses Ganga (on her crocodile) and Yamuna (on her tortoise), symbolically purifying visitors.",
    highlights: [
      "Concentric carved jambs representing cosmic layers",
      "Fierce dwarapalas (door guardians) leaning on heavy stone clubs",
      "Lintel carved with Gajalakshmi showered with holy water by celestial elephants",
    ],
    slug: "badami-cave-temples",
  },
  {
    id: "carving",
    title: "Pierced Lattice (Jali)",
    kannada: "ಜಾಲಂಧ್ರ (Jalandhra)",
    category: "Natural Lighting",
    tagline: "Stone windows sculpting natural daylight into intricate geometric shadows",
    image: "/images/durga-temple-aihole.jpg",
    location: "Durga Temple & Huchappayyagudi, Aihole",
    description:
      "Before glass, Chalukyan artisans cut pierced-stone lattice grilles straight through 6-inch solid sandstone slabs. These windows diffuse the harsh Deccan midday sun into soft patterned shafts that softly illuminate the interior corridor.",
    highlights: [
      "Swastika, floral rosette, and stepped diamond lattice designs",
      "Natural airflow and ventilation through thick thermal stone walls",
      "Creates dynamic geometric shadow patterns changing throughout the day",
    ],
    slug: "durga-temple-aihole",
  },
];

export default function ArchitectureExplorer() {
  const [activeMotif, setActiveMotif] = useState(ARCH_MOTIFS[0]);

  return (
    <section
      className="relative bg-charcoal-900/50 py-24 md:py-36 border-t border-gold-500/15"
      aria-label="Interactive Architecture Explorer"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <p className="eyebrow text-gold-400">Architectural Grammar</p>
          <h2 className="mt-3 display-lg text-ivory font-light">
            Architecture,
            <span className="block text-gold-400">element by element.</span>
          </h2>
          <p className="body-large mx-auto mt-5 max-w-2xl text-stone-300 font-sans">
            Six architectural motifs that define the Chalukyan idiom — each one a golden thread
            running from the rock-cut caves of Badami to the royal temples of Pattadakal and Aihole.
          </p>
        </div>

        {/* Interactive Selector Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {ARCH_MOTIFS.map((motif) => {
            const isSelected = activeMotif.id === motif.id;
            return (
              <button
                key={motif.id}
                onClick={() => setActiveMotif(motif)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  isSelected
                    ? "bg-gold-500 text-charcoal-950 shadow-[0_0_20px_rgba(181,137,56,0.35)] scale-105"
                    : "border border-stone-800 bg-charcoal-950/70 text-stone-300 hover:border-gold-500/40 hover:text-ivory"
                }`}
              >
                <span>{motif.title}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Visual Stage & Analytical Panel */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
          {/* Architectural Image Showcase with Overlay HUD */}
          <div className="relative aspect-[16/10] md:aspect-[16/11] overflow-hidden rounded-3xl border border-gold-500/25 shadow-2xl">
            <img
              src={activeMotif.image}
              alt={activeMotif.title}
              className="cinematic-img object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent pointer-events-none" />

            {/* Top HUD Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-gold-500/30 bg-charcoal-950/80 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest text-gold-400 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Feature Detected: {activeMotif.category}</span>
            </div>

            {/* Bottom Caption on Image */}
            <div className="absolute bottom-4 left-6 right-6 z-10">
              <p className="text-xs font-mono uppercase tracking-widest text-gold-400">
                {activeMotif.location}
              </p>
              <h4 className="font-display text-2xl md:text-3xl text-ivory">
                {activeMotif.tagline}
              </h4>
            </div>
          </div>

          {/* Detailed Explanatory Panel */}
          <GlassPanel className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="eyebrow text-gold-400">
                  {activeMotif.category}
                </span>
                <span className="font-display text-sm text-stone-400">
                  {activeMotif.kannada}
                </span>
              </div>

              <h3 className="mt-2 font-display text-4xl text-ivory font-light">
                {activeMotif.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-stone-300 font-sans">
                {activeMotif.description}
              </p>

              {/* Key Architectural Signatures */}
              <div className="mt-6 border-t border-gold-500/15 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold-400 mb-3 flex items-center gap-1.5">
                  <Sparkles size={13} />
                  Architectural Signatures
                </p>
                <ul className="space-y-2 text-xs text-stone-300">
                  {activeMotif.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-stone-800 pt-5 flex items-center justify-between">
              <Link
                href={`/destinations/${activeMotif.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors"
              >
                <span>Explore Site Details</span>
                <ArrowRight size={14} />
              </Link>
              <span className="text-[10px] text-stone-500 uppercase tracking-widest">
                ASI Monitored Site
              </span>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
