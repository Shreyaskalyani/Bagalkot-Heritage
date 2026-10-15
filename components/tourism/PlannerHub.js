"use client";

import { useState } from "react";
import { Compass, Sparkles, MapPin, Bus, Car, Hotel, Calendar, Route, CheckCircle } from "lucide-react";
import CuratedCircuits from "./CuratedCircuits";
import TripPlanner from "./TripPlanner";
import TravelLogistics from "./TravelLogistics";

const TABS = [
  {
    id: "circuits",
    label: "Curated Circuits",
    badge: "1, 2 & 3 Days",
    icon: Compass,
    description: "Handcrafted expert routes with transit times, entry tickets & day-by-day maps",
  },
  {
    id: "custom",
    label: "Custom AI Planner",
    badge: "Interactive",
    icon: Sparkles,
    description: "Generate a custom sequenced itinerary based on your pace, interests & starting point",
  },
  {
    id: "logistics",
    label: "Travel & Logistics Guide",
    badge: "Directory",
    icon: Bus,
    description: "Airports, trains, taxi rates, verified hotels, Jolada Rotti food & packing advice",
  },
];

export default function PlannerHub({ initialTab = "circuits" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="space-y-10">
      {/* Primary Tab Switcher */}
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-start rounded-2xl p-5 text-left transition-all duration-300 ${
                  isActive
                    ? "border-2 border-gold-500 bg-gold-500/10 shadow-[0_0_30px_rgba(181,137,56,0.25)]"
                    : "border border-stone-400/20 bg-charcoal-900/50 hover:border-gold-500/40 hover:bg-charcoal-900/80"
                }`}
                aria-pressed={isActive}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${
                      isActive
                        ? "bg-gold-500 text-charcoal-950 font-bold shadow-md"
                        : "border border-stone-400/25 bg-charcoal-950/60 text-gold-400"
                    }`}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isActive
                        ? "bg-gold-500/20 text-gold-300 border border-gold-500/40"
                        : "bg-charcoal-950 text-stone-400 border border-stone-700/50"
                    }`}
                  >
                    {tab.badge}
                  </span>
                </div>

                <p
                  className={`mt-4 font-display text-lg tracking-wide ${
                    isActive ? "text-ivory font-medium" : "text-stone-300"
                  }`}
                >
                  {tab.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-stone-400">
                  {tab.description}
                </p>

                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(181,137,56,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="mt-8">
        {activeTab === "circuits" && (
          <section aria-label="Curated Circuits">
            <CuratedCircuits />
          </section>
        )}

        {activeTab === "custom" && (
          <section aria-label="Custom AI Trip Planner">
            <TripPlanner />
          </section>
        )}

        {activeTab === "logistics" && (
          <section aria-label="Travel and Logistics Directory">
            <TravelLogistics />
          </section>
        )}
      </div>
    </div>
  );
}
