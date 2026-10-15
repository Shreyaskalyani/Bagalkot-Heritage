"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Clock, Sparkles, Filter } from "lucide-react";

const CATEGORIES = [
  "ALL",
  "ARCHITECTURE",
  "SCULPTURE",
  "LANDSCAPE",
  "FOOD",
  "CULTURE",
];

export default function Gallery({ photos, title = "Gallery" }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [openIndex, setOpenIndex] = useState(null);

  // Map photos into categories based on title / description
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === "ALL") return photos;
    return photos.filter((p) => {
      const text = `${p.title} ${p.description} ${p.location}`.toLowerCase();
      if (selectedCategory === "ARCHITECTURE") {
        return text.includes("temple") || text.includes("cave") || text.includes("vimana") || text.includes("arch");
      }
      if (selectedCategory === "SCULPTURE") {
        return text.includes("relief") || text.includes("frieze") || text.includes("carved") || text.includes("sculpt");
      }
      if (selectedCategory === "LANDSCAPE") {
        return text.includes("cliff") || text.includes("lake") || text.includes("hill") || text.includes("sunset") || text.includes("confluence");
      }
      if (selectedCategory === "FOOD") {
        return text.includes("food") || text.includes("rotti") || text.includes("harvest");
      }
      if (selectedCategory === "CULTURE") {
        return text.includes("pilgrim") || text.includes("spring") || text.includes("fair") || text.includes("jathre");
      }
      return true;
    });
  }, [photos, selectedCategory]);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % filteredPhotos.length)),
    [filteredPhotos.length]
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + filteredPhotos.length) % filteredPhotos.length
      ),
    [filteredPhotos.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  const photo = openIndex !== null ? filteredPhotos[openIndex] : null;

  return (
    <section aria-label={title}>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setOpenIndex(null);
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? "bg-gold-500 text-charcoal-950 font-bold shadow-md scale-105"
                : "border border-stone-800 bg-charcoal-900/60 text-stone-400 hover:border-gold-500/40 hover:text-ivory"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Columns */}
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {filteredPhotos.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
            onClick={() => setOpenIndex(i)}
            className={`group relative block w-full overflow-hidden rounded-2xl border border-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 break-inside-avoid ${
              p.tall ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
            aria-label={`Open photograph: ${p.title}`}
          >
            <img
              src={p.url}
              alt={p.title}
              className="cinematic-img object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div className="absolute bottom-3 left-4 right-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-block rounded-md bg-gold-500/20 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-gold-300 border border-gold-500/30">
                {p.location}
              </span>
              <p className="mt-1 text-xs font-medium text-ivory">
                {p.title}
              </p>
              {p.credit && (
                <p className="text-[10px] text-stone-400 mt-0.5">
                  Credit: {p.credit}
                </p>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {photo && (
          <motion.div
            className="fixed inset-0 z-[var(--z-dialog)] flex items-center justify-center bg-charcoal-950/95 p-4 md:p-8 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={photo.title}
          >
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-6 right-6 z-20 rounded-full border border-stone-700 bg-charcoal-900/80 p-3 text-stone-300 transition-colors hover:border-gold-500 hover:text-gold-400"
              aria-label="Close modal (Escape)"
            >
              <X size={20} />
            </button>

            {/* Left Nav */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-stone-800 bg-charcoal-900/80 p-3 text-stone-300 transition-colors hover:border-gold-500 hover:text-gold-400"
              aria-label="Previous photograph (Left Arrow)"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Right Nav */}
            <button
              onClick={next}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-stone-800 bg-charcoal-900/80 p-3 text-stone-300 transition-colors hover:border-gold-500 hover:text-gold-400"
              aria-label="Next photograph (Right Arrow)"
            >
              <ChevronRight size={22} />
            </button>

            {/* Modal Content */}
            <div className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-3xl border border-gold-500/25 bg-charcoal-950 flex flex-col md:flex-row shadow-2xl">
              <div className="relative aspect-[4/3] md:aspect-auto md:w-3/5 overflow-hidden bg-charcoal-950">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="cinematic-img object-contain"
                />
              </div>

              <div className="flex flex-col justify-between p-6 md:w-2/5 md:p-8 bg-charcoal-900/90 overflow-y-auto">
                <div>
                  <span className="eyebrow text-gold-400">
                    {photo.location}
                  </span>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl text-ivory">
                    {photo.title}
                  </h3>
                  <p className="mt-3 text-xs md:text-sm leading-relaxed text-stone-300 font-sans">
                    {photo.description}
                  </p>

                  {photo.cameraTip && (
                    <div className="mt-5 rounded-2xl border border-gold-500/20 bg-charcoal-950/70 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                        <Camera size={13} />
                        Photographer&apos;s Tip
                      </p>
                      <p className="mt-1 text-xs text-stone-300">
                        {photo.cameraTip}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t border-stone-800 pt-4 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Photo {openIndex + 1} of {filteredPhotos.length}</span>
                  {photo.credit && <span>Source: {photo.credit}</span>}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
