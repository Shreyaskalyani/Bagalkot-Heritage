"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MapPin, Clock, Sparkles, Route, Car, Printer, Calendar } from "lucide-react";
import { createTripPlan, isDemoMode } from "@/lib/api";
import GlassPanel from "@/components/ui/GlassPanel";

const DURATIONS = [1, 2, 3];
const INTERESTS = ["History", "Architecture", "Photography", "Culture", "Food", "Nature"];
const STYLES = ["Relaxed", "Balanced", "Explorer"];

function getTransitBetween(prevMonument, currMonument) {
  if (!prevMonument || !currMonument) return null;
  if (prevMonument.slug === currMonument.slug) return null;
  const locA = prevMonument.location;
  const locB = currMonument.location;
  if (!locA || !locB) return null;
  if (locA === locB) {
    return { distance: "1 - 2 km", duration: "5 mins (walk / drive)" };
  }
  const key = [locA, locB].sort().join("-");
  const distances = {
    "Badami-Pattadakal": { distance: "22 km", duration: "~30 mins drive" },
    "Aihole-Pattadakal": { distance: "14 km", duration: "~20 mins drive" },
    "Aihole-Badami": { distance: "35 km", duration: "~45 mins drive" },
    "Badami-Mahakuta": { distance: "14 km", duration: "~25 mins drive" },
    "Badami-Banashankari": { distance: "5 km", duration: "~10 mins drive" },
    "Banashankari-Mahakuta": { distance: "12 km", duration: "~20 mins drive" },
    "Mahakuta-Pattadakal": { distance: "14 km", duration: "~20 mins drive" },
    "Banashankari-Pattadakal": { distance: "24 km", duration: "~35 mins drive" },
  };
  return distances[key] || { distance: "15 km", duration: "~25 mins drive" };
}

/**
 * AI Trip Planner. Form → generate → animated itinerary.
 * Uses createTripPlan via lib/api.js (demo fallback included).
 */
export default function TripPlanner({ compact = false }) {
  const [duration, setDuration] = useState(1);
  const [interests, setInterests] = useState(["History", "Architecture"]);
  const [style, setStyle] = useState("Balanced");
  const [start, setStart] = useState("Badami");
  const [plan, setPlan] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  function toggleInterest(interest) {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  }

  async function generate() {
    setBusy(true);
    setPlan(null);
    setError(null);
    try {
      const result = await createTripPlan({
        duration,
        interests,
        style: style.toLowerCase(),
        start,
      });
      setPlan(result);
    } catch {
      setError(
        "The planner is temporarily unavailable. Please try again shortly."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={compact ? "w-full" : "mx-auto max-w-5xl"}>
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
        {/* ---------- Form ---------- */}
        <GlassPanel className="h-fit p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
            Your journey, your way
          </p>

          {/* Duration */}
          <fieldset className="mt-7">
            <legend className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
              Duration
            </legend>
            <div className="mt-3 flex gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  aria-pressed={duration === d}
                  className={`flex-1 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    duration === d
                      ? "bg-gold-500 text-charcoal-950"
                      : "border border-stone-400/25 text-stone-300 hover:border-gold-500/50"
                  }`}
                >
                  {d} {d === 1 ? "Day" : "Days"}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Interests */}
          <fieldset className="mt-7">
            <legend className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
              Interests
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {INTERESTS.map((interest) => {
                const active = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    aria-pressed={active}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                      active
                        ? "border border-gold-500/60 bg-gold-500/15 text-gold-300"
                        : "border border-stone-400/25 text-stone-300 hover:border-gold-500/50"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Travel style */}
          <fieldset className="mt-7">
            <legend className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
              Travel style
            </legend>
            <div className="mt-3 flex gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  aria-pressed={style === s}
                  className={`flex-1 rounded-full px-3 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    style === s
                      ? "bg-gold-500 text-charcoal-950"
                      : "border border-stone-400/25 text-stone-300 hover:border-gold-500/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Starting location */}
          <fieldset className="mt-7">
            <legend className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
              Starting location
            </legend>
            <select
              id="start-location"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="mt-3 w-full rounded-xl border border-stone-400/25 bg-charcoal-900/70 px-4 py-3 text-sm text-ivory focus:outline-none focus:ring-1 focus:ring-gold-500/50"
            >
              {["Badami", "Pattadakal", "Aihole", "Mahakuta", "Banashankari"].map(
                (loc) => (
                  <option key={loc} value={loc} className="bg-charcoal-900">
                    {loc}
                  </option>
                )
              )}
            </select>
          </fieldset>

          <button
            onClick={generate}
            disabled={busy}
            className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-500 py-4 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_24px_rgba(181,137,56,0.35)] disabled:opacity-50"
          >
            {busy ? (
              <>
                <Sparkles size={14} className="animate-pulse" aria-hidden="true" />
                Creating…
              </>
            ) : (
              <>
                <Route size={14} strokeWidth={2} aria-hidden="true" />
                Create My Journey
              </>
            )}
          </button>

          <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-stone-400">
            Sequenced using live ASI corridor proximity matrix
          </p>

          {error && (
            <p className="mt-4 text-center text-xs text-red-300" role="alert">
              {error}
            </p>
          )}
        </GlassPanel>

        {/* ---------- Result ---------- */}
        <div>
          <AnimatePresence mode="wait">
            {!plan && !busy && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
              >
                <Route size={28} strokeWidth={1.25} className="text-gold-600" aria-hidden="true" />
                <p className="mt-6 font-display text-3xl text-ivory">
                  Your journey appears here.
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-400">
                  Tell the planner what you want to experience — history,
                  architecture, photography — and it will shape a suggested
                  route through the valley.
                </p>
              </motion.div>
            )}

            {busy && (
              <motion.div
                key="busy"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-gold-500/25 bg-charcoal-900/40 p-8 text-center"
              >
                <div className="relative grid h-16 w-16 place-items-center rounded-full border border-gold-500/40 text-gold-400">
                  <Sparkles size={24} className="animate-spin text-gold-400" aria-hidden="true" />
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/20" />
                </div>
                <p className="mt-6 font-display text-2xl text-ivory">
                  Synthesizing your journey…
                </p>
                <p className="mt-2 max-w-xs text-xs text-stone-400">
                  Balancing monuments by travel style, light and daylight hours
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  {[0, 1, 2].map((n) => (
                    <motion.span
                      key={n}
                      className="h-2 w-2 rounded-full bg-gold-500"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: n * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {plan && (
              <motion.div
                key="plan"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
                  Your suggested journey
                </p>
                <p className="mt-2 text-sm text-stone-400">{plan.note}</p>

                <ol className="mt-7 space-y-0" role="list">
                  {plan.itinerary.map((stop, i) => {
                    if (stop.isDayHeader) {
                      return (
                        <li key={`day-header-${stop.day || i}`} className="py-4">
                          <div className="flex items-center gap-2.5 rounded-xl border border-gold-500/30 bg-gold-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-300">
                            <Calendar size={14} className="text-gold-400" />
                            {stop.activity}
                          </div>
                        </li>
                      );
                    }

                    // Find previous monument stop to calculate transit
                    let prevMonument = null;
                    for (let j = i - 1; j >= 0; j--) {
                      if (plan.itinerary[j].isDayHeader) break;
                      if (plan.itinerary[j].monument) {
                        prevMonument = plan.itinerary[j].monument;
                        break;
                      }
                    }
                    const transit = stop.monument ? getTransitBetween(prevMonument, stop.monument) : null;

                    return (
                      <motion.li
                        key={`${stop.time}-${i}`}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="relative flex gap-5 pb-8"
                      >
                        {/* Timeline rail */}
                        <div className="flex flex-col items-center" aria-hidden="true">
                          <span
                            className={`mt-1 block h-2.5 w-2.5 rounded-full ${
                              stop.monument
                                ? "bg-gold-400 shadow-[0_0_10px_rgba(199,154,69,0.7)]"
                                : "bg-stone-500"
                            }`}
                          />
                          {i < plan.itinerary.length - 1 && (
                            <span className="mt-1 w-px flex-1 bg-stone-400/20" />
                          )}
                        </div>

                        <div className="flex-1">
                          {transit && (
                            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-gold-500/20 bg-charcoal-950/80 px-3 py-1 text-[11px] text-stone-300">
                              <Car size={12} className="text-gold-400" aria-hidden="true" />
                              <span>Transit: <strong className="text-ivory">{transit.distance}</strong> ({transit.duration})</span>
                            </div>
                          )}

                          <p className="font-mono text-xs tracking-[0.25em] text-gold-500">
                            {stop.time}
                          </p>
                          {stop.monument ? (
                            <>
                              <Link
                                href={`/destinations/${stop.monument.slug}`}
                                className="mt-1 block font-display text-2xl text-ivory transition-colors hover:text-gold-300"
                              >
                                {stop.monument.name}
                              </Link>
                              <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                                <MapPin size={11} aria-hidden="true" />
                                {stop.monument.location}
                              </p>
                              <p className="mt-2 text-sm text-stone-400">{stop.activity}</p>
                            </>
                          ) : (
                            <p className="mt-1 font-display text-2xl text-stone-300">
                              {stop.activity}
                            </p>
                          )}
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/map"
                    className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300 transition-colors hover:border-gold-400 hover:bg-gold-500/10"
                  >
                    <MapPin size={13} aria-hidden="true" />
                    View route on map
                  </Link>
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") window.print();
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300 transition-colors hover:bg-gold-500 hover:text-charcoal-950"
                  >
                    <Printer size={13} aria-hidden="true" />
                    Print Itinerary
                  </button>
                  <button
                    onClick={() => setPlan(null)}
                    className="rounded-full border border-stone-400/25 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-stone-300 transition-colors hover:border-gold-500/50"
                  >
                    Start over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
