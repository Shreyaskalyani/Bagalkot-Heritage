"use client";

import { motion } from "framer-motion";

/**
 * Editorial section heading: micro label + display title + optional lead.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}) {
  const alignCls =
    align === "center"
      ? "text-center mx-auto items-center"
      : align === "right"
      ? "text-right ml-auto items-end"
      : "";

  return (
    <div className={`flex max-w-3xl flex-col ${alignCls} ${className}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-500"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="mt-3 font-display text-4xl leading-[1.05] text-ivory md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-stone-400"
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
