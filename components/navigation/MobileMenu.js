"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ScanSearch, MapPin, Route, Search, Globe, Utensils } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/destinations", label: "Destinations" },
  { href: "/waterfalls", label: "Waterfalls & Rapids" },
  { href: "/360-heritage", label: "360° Heritage View" },
  { href: "/food-culture", label: "Food & Culture" },
  { href: "/heritage", label: "Heritage" },
  { href: "/planner", label: "Trip Planner" },
  { href: "/map", label: "Heritage Map" },
  { href: "/stories", label: "Stories" },
  { href: "/guide", label: "AI Guide" },
  { href: "/visitor-center", label: "Visitor Center" },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "hi", label: "हिन्दी" },
];

export default function MobileMenu({
  open,
  onClose,
  onOpenSearch,
}) {
  const { language: currentLang, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[var(--z-dialog)] bg-charcoal-950/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-safe pb-safe overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span className="font-display text-sm tracking-[0.25em] text-gold-400">
              BAGALKOT HERITAGE
            </span>
            <button
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-full border border-stone-800 text-ivory hover:border-gold-500 hover:text-gold-400"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Quick Search Action */}
          <div className="mt-4">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between rounded-2xl border border-gold-500/25 bg-charcoal-900/80 px-5 py-3 text-xs text-stone-300"
            >
              <span className="flex items-center gap-2.5">
                <Search size={15} className="text-gold-400" />
                <span>Search Bagalkot (monuments, food, stories...)</span>
              </span>
              <span className="text-[10px] font-mono text-gold-400">⌘K</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="my-auto py-6" aria-label="Mobile">
            <ul className="space-y-1">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.08, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 py-2"
                  >
                    <span className="font-mono text-xs text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl md:text-4xl text-ivory transition-colors group-hover:text-gold-400">
                      {t(link.href, link.label)}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Language Selector & Bottom Actions */}
          <div className="border-t border-stone-800/80 pt-4 space-y-4">
            {/* Language Pills */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-400 flex items-center gap-1.5 font-medium">
                <Globe size={14} className="text-gold-400" /> Language:
              </span>
              <div className="flex items-center gap-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`rounded-full px-3 py-1 text-xs transition-colors ${
                      currentLang === lang.code
                        ? "bg-gold-500 text-charcoal-950 font-bold"
                        : "border border-stone-800 text-stone-400"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Scan + Planner Dual CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/scanner"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-full bg-gold-500 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-charcoal-950"
              >
                <ScanSearch size={16} strokeWidth={1.75} />
                {t("ai_scan", "AI Scan")}
              </Link>
              <Link
                href="/planner"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-full border border-gold-500/50 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gold-300"
              >
                <Route size={16} strokeWidth={1.75} />
                {t("/planner", "Trip Planner")}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
