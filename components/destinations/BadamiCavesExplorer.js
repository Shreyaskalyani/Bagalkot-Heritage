"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  MapPin,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Eye,
  Camera,
  Layers,
  CheckCircle2,
  Volume2,
} from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";
import { ALL_BADAMI_CAVES } from "@/data/badami-caves-data";
import { useLanguage } from "@/context/LanguageContext";
import { getHeritageAudioEngine } from "@/lib/heritage-audio";

export default function BadamiCavesExplorer() {
  const { currentLang: globalLang } = useLanguage();
  const [activeCaveIndex, setActiveCaveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "south" | "north" | "lake"
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentLang, setCurrentLang] = useState(globalLang || "en");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Sync with global language changes
  useEffect(() => {
    if (globalLang) {
      setCurrentLang(globalLang);
    }
  }, [globalLang]);

  const activeCave = ALL_BADAMI_CAVES[activeCaveIndex] || ALL_BADAMI_CAVES[0];

  const filteredCaves = ALL_BADAMI_CAVES.filter((c) => {
    if (activeFilter === "south") return c.hillLocation === "South Hill";
    if (activeFilter === "north") return c.hillLocation === "North Hill";
    if (activeFilter === "lake") return c.hillLocation === "Agastya Lake East Bank";
    return true;
  });

  // Stop audio on cave change, language change, or unmount
  useEffect(() => {
    const engine = getHeritageAudioEngine();
    if (engine) engine.stop();
    setIsPlayingAudio(false);
    setActiveImageIndex(0);
  }, [activeCaveIndex, currentLang]);

  useEffect(() => {
    return () => {
      const engine = getHeritageAudioEngine();
      if (engine) engine.stop();
    };
  }, []);

  const handleNextCave = () => {
    setActiveCaveIndex((prev) => (prev + 1) % ALL_BADAMI_CAVES.length);
  };

  const handlePrevCave = () => {
    setActiveCaveIndex((prev) => (prev - 1 + ALL_BADAMI_CAVES.length) % ALL_BADAMI_CAVES.length);
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
      activeCave.audioGuideText?.[currentLang] ||
      activeCave.description?.[currentLang] ||
      activeCave.audioGuideText?.en ||
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

  const gallery = [activeCave.image, ...(activeCave.galleryImages || [])].filter(
    (v, i, a) => v && a.indexOf(v) === i
  );

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
            Architectural Masterpieces
          </span>
          <h3 className="mt-1 font-display text-2xl md:text-3xl text-ivory">
            The 8 Caves &amp; Rock Sanctuaries of Badami
          </h3>
          <p className="mt-0.5 text-xs text-stone-400">
            Comprehensive guide across the South Cliff, North Hill Fort, and Agastya Lake rock shelters.
          </p>
        </div>

        {/* Language & Hill Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Selector */}
          <div className="flex rounded-xl border border-stone-800 bg-charcoal-900/80 p-1">
            {[
              { code: "en", label: "EN" },
              { code: "kn", label: "ಕನ್ನಡ" },
              { code: "hi", label: "हिंदी" },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setCurrentLang(lang.code)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  currentLang === lang.code
                    ? "bg-gold-500 text-charcoal-950 font-bold"
                    : "text-stone-400 hover:text-ivory"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Hill Location Filter */}
          <div className="flex rounded-xl border border-stone-800 bg-charcoal-900/80 p-1 text-xs">
            {[
              { id: "all", label: "All 8" },
              { id: "south", label: "South Hill (1–5)" },
              { id: "north", label: "North Hill (6–7)" },
              { id: "lake", label: "Lakeside (8)" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                  activeFilter === f.id
                    ? "bg-stone-800 text-gold-300 font-bold"
                    : "text-stone-400 hover:text-ivory"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Cave Card */}
      <GlassPanel className="p-6 md:p-8 overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Visual Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-72 md:h-84 w-full overflow-hidden rounded-2xl border border-stone-800 shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gallery[activeImageIndex] || activeCave.image}
                alt={activeCave.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-gold-500/50 bg-charcoal-950/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-300 backdrop-blur-md">
                  {activeCave.category}
                </span>
                <span className="rounded-full border border-stone-700 bg-charcoal-900/80 px-3 py-1 text-[11px] font-bold text-stone-300 backdrop-blur-md">
                  {activeCave.hillLocation}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-300">
                <span className="font-mono bg-charcoal-950/80 px-2.5 py-1 rounded-lg backdrop-blur-md">
                  {activeCave.stepsCount}
                </span>
                <span className="font-mono bg-charcoal-950/80 px-2.5 py-1 rounded-lg backdrop-blur-md">
                  {activeCave.period}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
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

          {/* Details Column */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-gold-400">
                Cave #{activeCave.number}
              </span>
              <h3 className="mt-1 font-display text-2xl md:text-3xl text-ivory">
                {currentLang === "kn"
                  ? activeCave.kannadaName
                  : currentLang === "hi"
                  ? activeCave.hindiName
                  : activeCave.name}
              </h3>
              <p className="mt-1 text-xs text-gold-300/90 font-medium">
                {currentLang === "kn"
                  ? activeCave.kannadaTheme
                  : currentLang === "hi"
                  ? activeCave.hindiTheme
                  : activeCave.deityAndTheme}
              </p>
            </div>

            {/* Audio Button */}
            <div>
              <button
                onClick={handleToggleAudio}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  isPlayingAudio
                    ? "bg-emerald-500 text-charcoal-950 animate-pulse"
                    : "border border-gold-500/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500 hover:text-charcoal-950"
                }`}
              >
                {isPlayingAudio ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlayingAudio ? "Stop Audio" : "Listen Cave Audio"}</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm leading-relaxed text-stone-300">
              {activeCave.description[currentLang] || activeCave.description.en}
            </p>

            {/* Key Sculptures */}
            {activeCave.keySculptures && (
              <div className="space-y-1.5 border-t border-stone-800 pt-3.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gold-400">
                  Key Sculptures &amp; Iconography
                </h4>
                <ul className="space-y-1 text-xs text-stone-300">
                  {activeCave.keySculptures.map((sculp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{sculp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Historical Epigraphy */}
            {activeCave.historicalEpigraphy && (
              <div className="rounded-xl border border-stone-800 bg-charcoal-900/60 p-3 text-xs text-stone-400">
                <strong className="text-gold-300 block mb-0.5">Inscriptions &amp; Epigraphy:</strong>
                <span>{activeCave.historicalEpigraphy}</span>
              </div>
            )}

            {/* Photography Tip */}
            {activeCave.photographyTip && (
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Camera size={13} className="text-gold-400 shrink-0" />
                <span>
                  <strong className="text-stone-300">Photo Tip:</strong> {activeCave.photographyTip}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Prev / Next Controls */}
        <div className="mt-8 border-t border-stone-800 pt-5 flex items-center justify-between">
          <button
            onClick={handlePrevCave}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-gold-300 transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Previous Cave</span>
          </button>

          <span className="font-mono text-xs text-stone-500">
            Cave {activeCave.number} of {ALL_BADAMI_CAVES.length}
          </span>

          <button
            onClick={handleNextCave}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-gold-300 transition-colors"
          >
            <span>Next Cave</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </GlassPanel>

      {/* Grid of All 8 Caves */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {filteredCaves.map((c) => {
          const isSelected = ALL_BADAMI_CAVES.indexOf(c) === activeCaveIndex;
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaveIndex(ALL_BADAMI_CAVES.indexOf(c));
                setActiveImageIndex(0);
              }}
              className={`flex flex-col text-left overflow-hidden rounded-xl border p-2 transition-all ${
                isSelected
                  ? "border-gold-400 bg-gold-500/10 shadow-lg scale-102"
                  : "border-stone-800/80 bg-charcoal-900/60 opacity-75 hover:opacity-100 hover:border-stone-700"
              }`}
            >
              <div className="relative h-16 w-full overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="mt-1.5 text-[11px] font-bold text-ivory truncate">
                Cave #{c.number}
              </span>
              <span className="text-[10px] text-stone-400 truncate">
                {c.category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
