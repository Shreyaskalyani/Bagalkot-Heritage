"use client";

import { motion } from "framer-motion";
import { MapPin, CalendarClock } from "lucide-react";

/**
 * Event card. Sample events carry a "SAMPLE EVENT" badge — they are never
 * presented as official listings.
 */
export default function EventCard({ event, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-400/15 bg-charcoal-900/40 p-6 transition-colors hover:border-gold-500/40"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-300">
          {event.category}
        </span>
        {event.sample && (
          <span className="rounded-full border border-stone-400/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Sample event
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-2xl leading-snug text-ivory group-hover:text-gold-300 transition-colors">
        {event.title}
      </h3>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-stone-500">
        <MapPin size={12} aria-hidden="true" />
        {event.location}
      </p>
      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-500">
        <CalendarClock size={12} aria-hidden="true" />
        {event.duration}
      </p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-400">
        {event.description}
      </p>

      <p className="mt-4 text-[11px] leading-relaxed text-stone-500">
        {event.note}
      </p>
    </motion.article>
  );
}
