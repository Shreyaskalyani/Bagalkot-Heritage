"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";

/**
 * Editorial destination card with hover zoom + lift.
 */
export default function DestinationCard({ monument, index = 0 }) {
  const image = monument.images?.[0]?.url;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-400/15 bg-charcoal-900/40 transition-colors hover:border-gold-500/40"
    >
      {/* Image */}
      <Link
        href={`/destinations/${monument.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative aspect-[4/3] overflow-hidden block"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={monument.images?.[0]?.alt || monument.name}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent"
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 rounded-full border border-gold-500/40 bg-charcoal-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-300 backdrop-blur-sm">
          {monument.category}
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-ivory transition-colors group-hover:text-gold-300">
          <Link href={`/destinations/${monument.slug}`}>
            {monument.name}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-stone-500">
          <MapPin size={12} aria-hidden="true" />
          {monument.location} · {monument.period}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-400">
          {monument.shortDescription}
        </p>
        <Link
          href={`/destinations/${monument.slug}`}
          className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300"
        >
          Explore
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </motion.article>
  );
}
