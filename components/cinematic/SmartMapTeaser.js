"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ExternalLink } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";

const STOPS = [
  {
    name: "BADAMI",
    x: 22,
    y: 30,
    slug: "badami-cave-temples",
    tagline: "Vatapi rock-cut caves & Agastya Lake",
    period: "6th–8th c. CE",
  },
  {
    name: "MAHAKUTA",
    x: 14,
    y: 62,
    slug: "mahakuta-temples",
    tagline: "Spring-fed shrines in the sacred grove",
    period: "6th–7th c. CE",
  },
  {
    name: "PATTADAKAL",
    x: 55,
    y: 26,
    slug: "pattadakal-group-of-monuments",
    tagline: "UNESCO World Heritage coronation city",
    period: "7th–8th c. CE",
  },
  {
    name: "AIHOLE",
    x: 78,
    y: 38,
    slug: "aihole",
    tagline: "Cradle of Indian temple architecture",
    period: "4th–12th c. CE",
  },
];

/**
 * Smart Map teaser — an interactive valley diagram with animated route lines
 * and clickable glowing markers, leading into the full interactive map.
 */
export default function SmartMapTeaser() {
  const [activeStop, setActiveStop] = useState(STOPS[0]);
  const ref = useRef(null);

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-500">
          Smart map
        </p>
        <h2 className="mt-3 font-display text-4xl font-light leading-tight text-ivory md:text-6xl">
          One valley.
          <span className="block text-gold-400">Every monument.</span>
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-stone-400">
          The great sites of the Chalukyan heartland sit within a short drive
          of one another — the Malaprabha valley is one continuous heritage
          corridor.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/map"
            className="inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_28px_rgba(181,137,56,0.35)]"
          >
            <MapPin size={14} strokeWidth={2} aria-hidden="true" />
            Open the Full Map
          </Link>
          <Link
            href={`/map?monument=${activeStop.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-gold-300 transition-colors hover:border-gold-400 hover:text-gold-200"
          >
            Focus {activeStop.name}
          </Link>
        </div>
      </div>

      {/* Stylised valley diagram with interactive nodes */}
      <GlassPanel className="relative overflow-hidden p-6 md:p-10">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #c79a45 0%, transparent 45%), radial-gradient(circle at 75% 65%, #c79a45 0%, transparent 40%)",
          }}
          aria-hidden="true"
        />

        <svg
          viewBox="0 0 100 80"
          className="relative w-full"
          role="img"
          aria-label="Stylised map of the Malaprabha valley heritage sites"
        >
          {/* Route lines */}
          <motion.path
            d="M22 30 C 35 18, 45 18, 55 26"
            fill="none"
            stroke="#c79a45"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3 }}
          />
          <motion.path
            d="M22 30 C 14 40, 12 50, 14 62"
            fill="none"
            stroke="#c79a45"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />
          <motion.path
            d="M55 26 C 65 26, 70 30, 78 38"
            fill="none"
            stroke="#c79a45"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.9 }}
          />

          {/* River */}
          <path
            d="M0 55 C 20 48, 40 60, 60 52 S 90 45, 100 50"
            fill="none"
            stroke="#857a6e"
            strokeWidth="0.8"
            opacity="0.5"
          />
          <text x="4" y="62" fill="#857a6e" fontSize="2.4" letterSpacing="0.3">
            MALAPRABHA RIVER
          </text>

          {/* Interactive Markers */}
          {STOPS.map((stop, i) => {
            const isSelected = activeStop.slug === stop.slug;
            return (
              <g
                key={stop.name}
                onClick={() => setActiveStop(stop)}
                onMouseEnter={() => setActiveStop(stop)}
                className="cursor-pointer group"
                tabIndex={0}
                role="button"
                aria-label={`Select ${stop.name} destination`}
              >
                {/* Outer ripple when selected */}
                {isSelected && (
                  <motion.circle
                    cx={stop.x}
                    cy={stop.y}
                    r="3.8"
                    fill="none"
                    stroke="#c79a45"
                    strokeWidth="0.35"
                    animate={{ scale: [0.9, 1.4, 0.9], opacity: [0.8, 0.2, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Marker circle */}
                <motion.circle
                  cx={stop.x}
                  cy={stop.y}
                  r={isSelected ? "2.2" : "1.6"}
                  fill={isSelected ? "#e5b85e" : "#c79a45"}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.25, duration: 0.4 }}
                  className="transition-transform group-hover:scale-125"
                />

                {/* Label */}
                <motion.text
                  x={stop.x}
                  y={stop.y - 4}
                  textAnchor="middle"
                  fill={isSelected ? "#f5edd8" : "#f8f5ee"}
                  fontSize={isSelected ? "3.2" : "2.8"}
                  fontWeight={isSelected ? "bold" : "normal"}
                  letterSpacing="0.4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.25 }}
                  className="select-none transition-colors group-hover:fill-gold-300"
                >
                  {stop.name}
                </motion.text>
              </g>
            );
          })}
        </svg>

        {/* Selected stop info preview card */}
        <div className="mt-4 rounded-xl border border-stone-400/15 bg-charcoal-950/70 p-4 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gold-400" />
                <p className="font-display text-lg text-ivory">{activeStop.name}</p>
                <span className="font-mono text-[10px] text-gold-500 uppercase tracking-wider">
                  {activeStop.period}
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-300">{activeStop.tagline}</p>
            </div>
            <Link
              href={`/destinations/${activeStop.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-gold-300 transition-colors hover:bg-gold-500/25 hover:text-gold-200"
            >
              Explore Site
              <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
