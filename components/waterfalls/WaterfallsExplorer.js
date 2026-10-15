"use client";

import { useState, useEffect } from "react";
import {
  Waves,
  Droplets,
  MapPin,
  Compass,
  Calendar,
  Sparkles,
  AlertTriangle,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  Navigation,
  Eye,
  CheckCircle2,
  Volume2,
} from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";
import { ALL_BAGALKOT_WATERFALLS, TALUK_LIST } from "@/data/waterfalls-data";
import { useLanguage } from "@/context/LanguageContext";
import { getHeritageAudioEngine } from "@/lib/heritage-audio";

export default function WaterfallsExplorer() {
  const { currentLang: globalLang } = useLanguage();
  const [selectedTaluk, setSelectedTaluk] = useState("all");
  const [activeWaterfallId, setActiveWaterfallId] = useState(ALL_BAGALKOT_WATERFALLS[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentLang, setCurrentLang] = useState(globalLang || "en");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [viewMode, setViewMode] = useState("detail"); // "detail" | "grid"

  // Sync with global language changes
  useEffect(() => {
    if (globalLang) {
      setCurrentLang(globalLang);
    }
  }, [globalLang]);

  const activeWaterfall =
    ALL_BAGALKOT_WATERFALLS.find((w) => w.id === activeWaterfallId) ||
    ALL_BAGALKOT_WATERFALLS[0];

  const filteredWaterfalls = ALL_BAGALKOT_WATERFALLS.filter((w) => {
    if (selectedTaluk === "all") return true;
    return w.taluk === selectedTaluk;
  });

  // Stop audio on waterfall change, language change, or unmount
  useEffect(() => {
    const engine = getHeritageAudioEngine();
    if (engine) engine.stop();
    setIsPlayingAudio(false);
    setActiveImageIndex(0);
  }, [activeWaterfallId, currentLang]);

  useEffect(() => {
    return () => {
      const engine = getHeritageAudioEngine();
      if (engine) engine.stop();
    };
  }, []);

  const handleNextWaterfall = () => {
    const currentIndex = ALL_BAGALKOT_WATERFALLS.findIndex((w) => w.id === activeWaterfallId);
    const nextIndex = (currentIndex + 1) % ALL_BAGALKOT_WATERFALLS.length;
    setActiveWaterfallId(ALL_BAGALKOT_WATERFALLS[nextIndex].id);
  };

  const handlePrevWaterfall = () => {
    const currentIndex = ALL_BAGALKOT_WATERFALLS.findIndex((w) => w.id === activeWaterfallId);
    const prevIndex =
      (currentIndex - 1 + ALL_BAGALKOT_WATERFALLS.length) % ALL_BAGALKOT_WATERFALLS.length;
    setActiveWaterfallId(ALL_BAGALKOT_WATERFALLS[prevIndex].id);
  };

  const handleToggleAudio = () => {
    const engine = getHeritageAudioEngine();
    if (!engine) return;

    if (isPlayingAudio) {
      engine.stop();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak =
      activeWaterfall.audioGuideText?.[currentLang] ||
      activeWaterfall.description?.[currentLang] ||
      activeWaterfall.audioGuideText?.en ||
      "";

    if (!textToSpeak) return;

    setIsPlayingAudio(true);
    engine.speak({
      text: textToSpeak,
      lang: currentLang,
      callbacks: {
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
      },
    });
  };

  const gallery = [activeWaterfall.image, ...(activeWaterfall.galleryImages || [])].filter(
    (v, i, a) => a.indexOf(v) === i
  );

  return (
    <div className="space-y-8">
      {/* Top Header & Language Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <Droplets size={13} />
            <span>Monsoon Cascades &amp; River Rapids</span>
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-ivory">
            Waterfalls of Bagalkot District
          </h2>
          <p className="mt-1 text-sm text-stone-400">
            Explore 11 majestic seasonal waterfalls, river cascades, and hidden canyon gorges across all 9 taluks.
          </p>
        </div>

        {/* View Mode & Language Selector */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switch */}
          <div className="flex rounded-xl border border-stone-800 bg-charcoal-900/80 p-1">
            {[
              { code: "en", label: "EN" },
              { code: "kn", label: "ಕನ್ನಡ" },
              { code: "hi", label: "हिंदी" },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setCurrentLang(lang.code)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  currentLang === lang.code
                    ? "bg-gold-500 text-charcoal-950 font-bold"
                    : "text-stone-400 hover:text-ivory"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex rounded-xl border border-stone-800 bg-charcoal-900/80 p-1">
            <button
              onClick={() => setViewMode("detail")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                viewMode === "detail"
                  ? "bg-stone-800 text-gold-300 font-bold"
                  : "text-stone-400 hover:text-ivory"
              }`}
            >
              Showcase
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                viewMode === "grid"
                  ? "bg-stone-800 text-gold-300 font-bold"
                  : "text-stone-400 hover:text-ivory"
              }`}
            >
              Grid ({ALL_BAGALKOT_WATERFALLS.length})
            </button>
          </div>
        </div>
      </div>

      {/* Taluk Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {TALUK_LIST.map((t) => {
          const isActive = selectedTaluk === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTaluk(t.id);
                if (t.id !== "all") {
                  const firstOfTaluk = ALL_BAGALKOT_WATERFALLS.find((w) => w.taluk === t.id);
                  if (firstOfTaluk) setActiveWaterfallId(firstOfTaluk.id);
                }
              }}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-gold-500 text-charcoal-950 shadow-[0_0_20px_rgba(181,137,56,0.3)] font-bold"
                  : "border border-stone-800 bg-charcoal-900/60 text-stone-300 hover:border-gold-500/40 hover:text-ivory"
              }`}
            >
              {t.label[currentLang] || t.label.en}
            </button>
          );
        })}
      </div>

      {/* VIEW MODE 1: DETAIL SHOWCASE */}
      {viewMode === "detail" && (
        <div className="space-y-6">
          {/* Main Showcase Panel */}
          <GlassPanel className="p-6 md:p-8 overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              {/* Image & Gallery Column */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-2xl border border-stone-800 shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={gallery[activeImageIndex] || activeWaterfall.image}
                    alt={activeWaterfall.name}
                    className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-gold-500/50 bg-charcoal-950/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-300 backdrop-blur-md">
                      {activeWaterfall.category}
                    </span>
                    {activeWaterfall.isHiddenGem && (
                      <span className="rounded-full border border-purple-500/50 bg-purple-950/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-300 backdrop-blur-md">
                        Hidden Gem
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-300">
                    <span className="font-mono bg-charcoal-950/80 px-2.5 py-1 rounded-lg backdrop-blur-md">
                      Drop: {activeWaterfall.dropHeight}
                    </span>
                    <span className="font-mono bg-charcoal-950/80 px-2.5 py-1 rounded-lg backdrop-blur-md">
                      Best: {activeWaterfall.bestMonths}
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {gallery.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {gallery.map((img, idx) => (
                      <button
                        key={img}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                          activeImageIndex === idx
                            ? "border-gold-400 scale-105"
                            : "border-stone-800 opacity-60 hover:opacity-100"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt="Thumbnail"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Information Column */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400">
                    <MapPin size={13} />
                    <span>
                      {currentLang === "kn"
                        ? activeWaterfall.kannadaTaluk
                        : currentLang === "hi"
                        ? activeWaterfall.hindiTaluk
                        : activeWaterfall.taluk}{" "}
                      Taluk
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-2xl md:text-3xl text-ivory">
                    {currentLang === "kn"
                      ? activeWaterfall.kannadaName
                      : currentLang === "hi"
                      ? activeWaterfall.hindiName
                      : activeWaterfall.name}
                  </h3>

                  <p className="mt-1 text-xs text-stone-400">
                    {currentLang === "kn"
                      ? activeWaterfall.kannadaLocation
                      : currentLang === "hi"
                      ? activeWaterfall.hindiLocation
                      : activeWaterfall.location}
                  </p>
                </div>

                {/* Audio Guide Button */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleAudio}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      isPlayingAudio
                        ? "bg-emerald-500 text-charcoal-950 animate-pulse"
                        : "border border-gold-500/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500 hover:text-charcoal-950"
                    }`}
                  >
                    {isPlayingAudio ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isPlayingAudio ? "Stop Audio Guide" : "Listen Audio Narration"}</span>
                  </button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      activeWaterfall.name + " " + activeWaterfall.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-stone-800 bg-charcoal-900/80 px-4 py-2.5 text-xs font-semibold text-stone-300 hover:border-gold-500/40 hover:text-ivory"
                  >
                    <Navigation size={13} className="text-emerald-400" />
                    <span>Get Directions</span>
                  </a>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-stone-300">
                  {activeWaterfall.description[currentLang] || activeWaterfall.description.en}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 border-t border-stone-800 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                    <Sparkles size={13} />
                    <span>Key Highlights</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {(currentLang === "kn"
                      ? activeWaterfall.kannadaHighlights || activeWaterfall.highlights
                      : currentLang === "hi"
                      ? activeWaterfall.hindiHighlights || activeWaterfall.highlights
                      : activeWaterfall.highlights
                    ).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety Advisory Box */}
                {activeWaterfall.safetyAdvisory && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 text-xs text-amber-200/90 flex items-start gap-2.5">
                    <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-amber-300 block mb-0.5">
                        Safety Advisory:
                      </strong>
                      <span>
                        {activeWaterfall.safetyAdvisory[currentLang] ||
                          activeWaterfall.safetyAdvisory.en}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Prev / Next Controls */}
            <div className="mt-8 border-t border-stone-800 pt-5 flex items-center justify-between">
              <button
                onClick={handlePrevWaterfall}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-gold-300 transition-colors"
              >
                <ChevronLeft size={16} />
                <span>Previous Waterfall</span>
              </button>

              <span className="font-mono text-xs text-stone-500">
                {ALL_BAGALKOT_WATERFALLS.findIndex((w) => w.id === activeWaterfallId) + 1} of{" "}
                {ALL_BAGALKOT_WATERFALLS.length}
              </span>

              <button
                onClick={handleNextWaterfall}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-gold-300 transition-colors"
              >
                <span>Next Waterfall</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </GlassPanel>

          {/* Quick Carousel Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredWaterfalls.map((w) => {
              const isSelected = w.id === activeWaterfallId;
              return (
                <button
                  key={w.id}
                  onClick={() => {
                    setActiveWaterfallId(w.id);
                    setActiveImageIndex(0);
                  }}
                  className={`flex flex-col text-left overflow-hidden rounded-xl border p-2 transition-all ${
                    isSelected
                      ? "border-gold-400 bg-gold-500/10 shadow-lg scale-102"
                      : "border-stone-800/80 bg-charcoal-900/60 opacity-75 hover:opacity-100 hover:border-stone-700"
                  }`}
                >
                  <div className="relative h-20 w-full overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.image}
                      alt={w.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="mt-2 text-[11px] font-semibold text-ivory truncate">
                    {w.name}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {w.taluk} • {w.dropHeight}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: GRID GALLERY */}
      {viewMode === "grid" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWaterfalls.map((w) => (
            <GlassPanel
              key={w.id}
              className="flex flex-col justify-between p-5 overflow-hidden group hover:border-gold-500/40 transition-colors"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden rounded-xl border border-stone-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.image}
                    alt={w.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 rounded-full border border-gold-500/40 bg-charcoal-950/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-300">
                    {w.category}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 font-mono text-[10px] bg-charcoal-950/80 px-2 py-0.5 rounded text-stone-300">
                    {w.dropHeight}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-400">
                    {w.taluk} Taluk
                  </span>
                  <h3 className="mt-1 font-display text-xl text-ivory">
                    {currentLang === "kn"
                      ? w.kannadaName
                      : currentLang === "hi"
                      ? w.hindiName
                      : w.name}
                  </h3>
                  <p className="mt-1 text-xs text-stone-400 flex items-center gap-1">
                    <MapPin size={11} className="text-gold-400 shrink-0" />
                    <span className="truncate">{w.location}</span>
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-stone-300 line-clamp-3">
                    {w.description[currentLang] || w.description.en}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-stone-800 pt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-stone-400">
                  Best: {w.bestMonths}
                </span>
                <button
                  onClick={() => {
                    setActiveWaterfallId(w.id);
                    setViewMode("detail");
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300"
                >
                  <span>Explore</span>
                  <Eye size={12} />
                </button>
              </div>
            </GlassPanel>
          ))}
        </div>
      )}
    </div>
  );
}
