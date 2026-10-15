"use client";

import { useState } from "react";
import {
  Plane,
  Train,
  Car,
  Hotel,
  Utensils,
  Sun,
  ShieldAlert,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";
import { travelLogistics } from "@/data/travel-guide";

const TABS = [
  { id: "getting-here", label: "Getting Here", icon: Plane },
  { id: "where-to-stay", label: "Where to Stay", icon: Hotel },
  { id: "local-transport", label: "Local Cabs & Transit", icon: Car },
  { id: "food-culture", label: "Food & Handlooms", icon: Utensils },
  { id: "seasons-weather", label: "Seasons & Tips", icon: Sun },
];

export default function TravelLogistics() {
  const [activeTab, setActiveTab] = useState("getting-here");

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-stone-400/15 pb-4">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-gold-500 text-charcoal-950 shadow-[0_0_20px_rgba(181,137,56,0.3)] font-bold"
                  : "border border-stone-400/20 bg-charcoal-900/40 text-stone-300 hover:border-gold-500/40 hover:text-ivory"
              }`}
            >
              <Icon size={14} aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Getting Here */}
      {activeTab === "getting-here" && (
        <div className="grid gap-6 md:grid-cols-3">
          {travelLogistics.gettingHere.map((item) => (
            <GlassPanel key={item.mode} className="p-7">
              <div className="flex items-center gap-2.5 text-gold-400">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-500/10 border border-gold-500/30">
                  {item.mode === "By Air" && <Plane size={15} />}
                  {item.mode === "By Train" && <Train size={15} />}
                  {item.mode === "By Road" && <Car size={15} />}
                </span>
                <h3 className="font-display text-xl font-light text-ivory">
                  {item.mode}
                </h3>
              </div>
              <p className="mt-2 text-xs uppercase tracking-wider text-stone-400">
                {item.title}
              </p>

              <div className="mt-6 space-y-5">
                {item.details.map((d) => (
                  <div key={d.name} className="border-t border-stone-400/10 pt-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-semibold text-sm text-stone-100">{d.name}</h4>
                      {d.distance && (
                        <span className="font-mono text-[11px] text-gold-400">
                          {d.distance}
                        </span>
                      )}
                    </div>
                    {d.connectivity && (
                      <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                        {d.connectivity}
                      </p>
                    )}
                    {d.route && (
                      <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                        <strong className="text-stone-300">Route:</strong> {d.route}
                      </p>
                    )}
                    {d.recommendation && (
                      <p className="mt-2 text-[11px] text-gold-300/90 leading-relaxed">
                        💡 {d.recommendation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      )}

      {/* Tab 2: Where to Stay */}
      {activeTab === "where-to-stay" && (
        <div className="grid gap-6 md:grid-cols-2">
          {travelLogistics.whereToStay.map((hotel) => (
            <GlassPanel key={hotel.id} className="p-6 md:p-7 flex flex-col justify-between overflow-hidden">
              <div>
                {hotel.image && (
                  <div className="relative mb-5 h-48 w-full overflow-hidden rounded-2xl border border-stone-800 shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full border border-gold-500/40 bg-charcoal-950/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-300 backdrop-blur-md">
                      Verified Hotel Property
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-400">
                      {hotel.category}
                    </span>
                    <h3 className="mt-3 font-display text-2xl text-ivory">
                      {hotel.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
                      <MapPin size={12} className="text-gold-500" aria-hidden="true" />
                      {hotel.location} • {hotel.distance}
                    </p>
                  </div>
                  <span className="font-mono text-sm font-semibold text-gold-400 text-right">
                    {hotel.priceRange}
                  </span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-stone-300">
                  {hotel.whyStay}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {hotel.amenities.map((a) => (
                    <span
                      key={a}
                      className="rounded-full bg-charcoal-950/70 border border-stone-400/15 px-2.5 py-1 text-[10px] text-stone-400"
                    >
                      ✓ {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-stone-400/10 pt-4 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">
                  Official tourism &amp; resort reservations
                </span>
                {hotel.bookingLink ? (
                  <a
                    href={hotel.bookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300"
                  >
                    Official Portal ↗
                  </a>
                ) : (
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                    Badami District
                  </span>
                )}
              </div>
            </GlassPanel>
          ))}
        </div>
      )}

      {/* Tab 3: Local Cabs & Transit */}
      {activeTab === "local-transport" && (
        <div className="grid gap-6 md:grid-cols-2">
          {travelLogistics.localTransport.map((t) => (
            <GlassPanel key={t.type} className="p-7">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-2xl text-ivory">{t.type}</h3>
                <span className="font-mono text-xs font-semibold text-gold-400">
                  {t.rate}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-stone-300">
                <strong className="text-stone-200">Recommended For:</strong> {t.coverage}
              </p>
              <div className="mt-4 rounded-xl border border-gold-500/20 bg-gold-500/5 p-3.5 text-xs text-stone-300">
                <strong className="text-gold-300">Booking Tip:</strong> {t.bookingTip}
              </div>
            </GlassPanel>
          ))}
        </div>
      )}

      {/* Tab 4: Food & Handlooms */}
      {activeTab === "food-culture" && (
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Cuisine */}
          <GlassPanel className="p-8">
            <div className="flex items-center gap-2 text-gold-400">
              <Utensils size={18} />
              <h3 className="font-display text-2xl text-ivory">
                {travelLogistics.foodAndCulture.cuisineTitle}
              </h3>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              Traditional North Karnataka cuisine served on fresh plantain leaves.
            </p>

            <div className="mt-6 space-y-4">
              {travelLogistics.foodAndCulture.dishes.map((dish) => (
                <div key={dish.name} className="border-t border-stone-400/10 pt-3.5">
                  <h4 className="font-semibold text-sm text-gold-300">{dish.name}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-stone-300">
                    {dish.description}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* Crafts */}
          <GlassPanel className="p-8">
            <div className="flex items-center gap-2 text-gold-400">
              <Sparkles size={18} />
              <h3 className="font-display text-2xl text-ivory">
                {travelLogistics.foodAndCulture.handloomsTitle}
              </h3>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              Centuries of living textile and stone sculpture heritage.
            </p>

            <div className="mt-6 space-y-5">
              {travelLogistics.foodAndCulture.crafts.map((craft) => (
                <div key={craft.name} className="border-t border-stone-400/10 pt-4">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-semibold text-sm text-gold-300">{craft.name}</h4>
                    <span className="text-[11px] font-mono text-stone-400">{craft.location}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-stone-300">
                    {craft.detail}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      )}

      {/* Tab 5: Seasons & Tips */}
      {activeTab === "seasons-weather" && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {travelLogistics.seasons.map((season) => (
              <GlassPanel key={season.period} className="p-7">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  {season.verdict}
                </span>
                <h3 className="mt-2 font-display text-xl text-ivory">
                  {season.period}
                </h3>
                <p className="mt-1 font-mono text-xs text-stone-400">
                  {season.weather}
                </p>
                <p className="mt-4 text-xs leading-relaxed text-stone-300">
                  {season.highlights}
                </p>
              </GlassPanel>
            ))}
          </div>

          {/* Practical travel tips */}
          <GlassPanel className="p-8">
            <h3 className="font-display text-2xl text-ivory">
              Essential Travel Tips & Guidelines
            </h3>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {travelLogistics.essentialTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-stone-300">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 font-mono text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>
      )}
    </div>
  );
}
