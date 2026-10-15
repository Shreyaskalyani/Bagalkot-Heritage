"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  Ticket,
  Lightbulb,
  CheckCircle2,
  Printer,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";
import { curatedCircuits } from "@/data/itineraries";

export default function CuratedCircuits() {
  const [selectedCircuit, setSelectedCircuit] = useState(curatedCircuits[0]);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  function handlePrint() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  const activeDay = selectedCircuit.days[activeDayIndex] || selectedCircuit.days[0];

  return (
    <div className="space-y-10">
      {/* Circuit Selection Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {curatedCircuits.map((c) => {
          const isSelected = selectedCircuit.id === c.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCircuit(c);
                setActiveDayIndex(0);
              }}
              className={`flex items-center gap-2.5 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                isSelected
                  ? "bg-gold-500 text-charcoal-950 shadow-[0_0_24px_rgba(181,137,56,0.35)]"
                  : "border border-stone-400/25 bg-charcoal-900/50 text-stone-300 hover:border-gold-500/50 hover:text-ivory"
              }`}
            >
              <Calendar size={14} aria-hidden="true" />
              {c.durationLabel}
            </button>
          );
        })}
      </div>

      {/* Selected Circuit Header */}
      <GlassPanel className="p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-400">
              Curated Heritage Circuit
            </span>
            <h2 className="mt-3 font-display text-3xl font-light text-ivory md:text-4xl">
              {selectedCircuit.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-300 md:text-base">
              {selectedCircuit.subtitle}
            </p>

            {/* Quick Metrics */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                <Car size={14} className="text-gold-400" aria-hidden="true" />
                <strong className="text-ivory">Route:</strong> {selectedCircuit.totalDistance}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-gold-400" aria-hidden="true" />
                <strong className="text-ivory">Pace:</strong> {selectedCircuit.pace}
              </span>
              <span className="flex items-center gap-1.5">
                <Ticket size={14} className="text-gold-400" aria-hidden="true" />
                <strong className="text-ivory">Est. Budget:</strong> {selectedCircuit.estimatedBudget}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-full border border-stone-400/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-stone-200 transition-colors hover:border-gold-500/60 hover:text-gold-300 print:hidden"
            >
              <Printer size={14} aria-hidden="true" />
              Print Itinerary
            </button>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-charcoal-950 transition-colors hover:bg-gold-400 print:hidden"
            >
              <MapPin size={14} aria-hidden="true" />
              View on Map
            </Link>
          </div>
        </div>

        {/* Multi-day tabs if > 1 day */}
        {selectedCircuit.days.length > 1 && (
          <div className="mt-8 flex gap-2 border-b border-stone-400/15 pb-4">
            {selectedCircuit.days.map((day, idx) => (
              <button
                key={day.day}
                onClick={() => setActiveDayIndex(idx)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeDayIndex === idx
                    ? "bg-gold-500/20 text-gold-300 border border-gold-500/40"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>
        )}

        {/* Timeline of Stops */}
        <div className="mt-8">
          <h3 className="font-display text-2xl text-ivory">
            {activeDay.title}
          </h3>

          <div className="mt-8 space-y-6">
            {activeDay.stops.map((stop, sIdx) => (
              <div key={stop.name + sIdx} className="relative">
                {/* Transit pill between stops */}
                {stop.transit && (
                  <div className="mb-6 flex items-center gap-2 pl-4 text-xs font-mono text-gold-400">
                    <span className="h-2 w-2 rounded-full bg-gold-400/80" />
                    <span className="rounded-full bg-gold-500/10 px-3 py-1 border border-gold-500/20">
                      {stop.transit}
                    </span>
                  </div>
                )}

                {/* Stop Card */}
                <div className="rounded-2xl border border-stone-400/15 bg-charcoal-900/60 p-6 md:p-7 transition-colors hover:border-gold-500/40">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-xs font-semibold tracking-wider text-gold-400">
                          {stop.time}
                        </span>
                        {stop.duration && (
                          <span className="text-[11px] text-stone-400">
                            • Duration: {stop.duration}
                          </span>
                        )}
                      </div>
                      <h4 className="mt-1 font-display text-2xl text-ivory">
                        {stop.slug ? (
                          <Link
                            href={`/destinations/${stop.slug}`}
                            className="transition-colors hover:text-gold-300 inline-flex items-center gap-1.5"
                          >
                            {stop.name}
                            <ArrowRight size={14} aria-hidden="true" className="text-gold-400" />
                          </Link>
                        ) : (
                          stop.name
                        )}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-stone-300">
                        {stop.activity}
                      </p>
                    </div>

                    {stop.ticket && (
                      <span className="shrink-0 rounded-xl border border-stone-400/20 bg-charcoal-950/70 px-3.5 py-1.5 text-xs text-stone-300">
                        🎟️ {stop.ticket}
                      </span>
                    )}
                  </div>

                  {stop.tip && (
                    <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-gold-500/20 bg-gold-500/5 px-4 py-3 text-xs leading-relaxed text-stone-300">
                      <Lightbulb size={15} className="shrink-0 text-gold-400 mt-0.5" aria-hidden="true" />
                      <span>
                        <strong className="text-gold-300">Traveller Tip:</strong> {stop.tip}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
