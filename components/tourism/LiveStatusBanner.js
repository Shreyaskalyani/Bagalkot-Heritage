"use client";

import Link from "next/link";
import { Sun, Clock, MapPin, Phone, ShieldCheck, Sparkles, Compass } from "lucide-react";
import { liveWeather } from "@/data/realtime-info";

export default function LiveStatusBanner() {
  return (
    <div className="relative z-30 border-y border-gold-500/20 bg-charcoal-950/90 py-3.5 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 md:px-8">
        {/* Live Indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400">
            Live Tourism Status
          </span>
          <span className="hidden text-stone-500 sm:inline">•</span>
          <span className="hidden text-xs text-stone-300 sm:inline">
            Badami &amp; Valley Monuments <strong className="text-emerald-400 font-semibold">OPEN TODAY</strong>
          </span>
        </div>

        {/* Live Metrics */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-300">
          <div className="flex items-center gap-1.5">
            <Sun size={14} className="text-gold-400" />
            <span>
              Badami: <strong className="text-ivory">{liveWeather.currentTempC}°C</strong> ({liveWeather.condition})
            </span>
          </div>

          <div className="hidden items-center gap-1.5 md:flex">
            <Clock size={14} className="text-gold-400" />
            <span>
              Sunset: <strong className="text-ivory">{liveWeather.sunset}</strong>
            </span>
          </div>

          <div className="hidden items-center gap-1.5 lg:flex">
            <Phone size={14} className="text-gold-400" />
            <span>
              Tourist Helpline: <strong className="text-ivory">1363</strong>
            </span>
          </div>

          <Link
            href="/visitor-center"
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 transition-colors hover:bg-emerald-500 hover:text-charcoal-950"
            title="Official Visitor Information Center & Live Tourism Hub"
          >
            <Sparkles size={12} />
            <span>Visitor Center</span>
          </Link>

          <Link
            href="/planner"
            className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-300 transition-colors hover:bg-gold-500 hover:text-charcoal-950"
          >
            <Compass size={12} />
            <span>Plan Itinerary</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
