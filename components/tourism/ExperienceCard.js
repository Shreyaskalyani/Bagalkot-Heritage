"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Wide editorial experience row — image on one side, oversized type on the
 * other. Used for homepage/culture editorial blocks.
 */
export default function ExperienceCard({
  experience,
  index = 0,
  reverse = false,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: 0.05 }}
      className={`group grid items-center gap-8 md:grid-cols-2 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          style={{ backgroundImage: `url(${experience.image})` }}
          role="img"
          aria-label={experience.alt || experience.title}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Text */}
      <div>
        <p className="font-mono text-xs tracking-[0.3em] text-gold-500">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-3 font-display text-4xl leading-tight text-ivory md:text-5xl">
          {experience.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400 md:text-base">
          {experience.text}
        </p>
        {experience.href && (
          <Link
            href={experience.href}
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300"
          >
            {experience.cta || "Learn more"}
            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
