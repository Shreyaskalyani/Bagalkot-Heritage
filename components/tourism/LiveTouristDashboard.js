"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sun,
  Clock,
  MapPin,
  Phone,
  Shield,
  Ticket,
  Users,
  Compass,
  CheckCircle2,
  AlertCircle,
  Camera,
  Wind,
  Droplets,
  Calendar,
  ExternalLink,
} from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";
import {
  liveWeather,
  liveMonumentsStatus,
  touristHelplines,
  liveAdvisories,
} from "@/data/realtime-info";

const TABS = [
  { id: "monuments", label: "Live Monument Status", icon: Clock },
  { id: "weather", label: "Live Weather & Photography", icon: Sun },
  { id: "helplines", label: "Tourist Helplines", icon: Phone },
  { id: "advisories", label: "Travel Advisories", icon: AlertCircle },
];

export default function LiveTouristDashboard() {
  const [activeTab, setActiveTab] = useState("monuments");

  function handleTabChange(tabId) {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 60);
    }
  }

  return (
    <div className="space-y-8">
      {/* Tab Selectors */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-stone-400/15 pb-4">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-gold-500 text-charcoal-950 shadow-[0_0_24px_rgba(181,137,56,0.35)] font-bold"
                  : "border border-stone-400/20 bg-charcoal-900/40 text-stone-300 hover:border-gold-500/40 hover:text-ivory"
              }`}
            >
              <Icon size={14} aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Live Monument Status */}
      {activeTab === "monuments" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-stone-400">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              All 7 core monuments in the Malaprabha corridor are open today
            </span>
            <span>Operating Hours: 6:00 AM – 6:00 PM (Temple sanctums vary)</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {liveMonumentsStatus.map((monument) => (
              <GlassPanel key={monument.slug} className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono tracking-wider text-gold-500">
                        {monument.location}
                      </span>
                      <h4 className="mt-1 font-display text-xl font-normal text-ivory">
                        {monument.name}
                      </h4>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Open
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-stone-300">
                    <p className="flex items-center gap-2">
                      <Clock size={13} className="text-gold-400 shrink-0" />
                      <span>{monument.hoursToday}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Ticket size={13} className="text-gold-400 shrink-0" />
                      <span>{monument.ticketPrice}</span>
                    </p>
                  </div>

                  {/* Crowd Meter */}
                  <div className="mt-5 rounded-xl border border-stone-400/10 bg-charcoal-950/40 p-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5 text-stone-400">
                        <Users size={12} className="text-gold-500" />
                        Live Crowd Density:
                      </span>
                      <span className="font-semibold text-gold-300">
                        {monument.crowdLevel}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-gold-500 transition-all duration-500"
                        style={{ width: `${monument.crowdPercentage}%` }}
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-stone-400 italic">
                    💡 {monument.liveTip}
                  </p>
                </div>

                <div className="mt-6 border-t border-stone-400/10 pt-4">
                  <Link
                    href={`/destinations/${monument.slug}`}
                    className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300"
                  >
                    <span>View Destination Guide</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Live Weather & Photography */}
      {activeTab === "weather" && (
        <div className="grid gap-6 lg:grid-cols-[1.5fr_2fr]">
          {/* Main Weather Card */}
          <GlassPanel className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-gold-400">
                  {liveWeather.location}
                </p>
                <h3 className="mt-2 font-display text-4xl text-ivory">
                  {liveWeather.currentTempC}°C
                  <span className="ml-3 text-xl font-normal text-stone-400">
                    ({liveWeather.currentTempF}°F)
                  </span>
                </h3>
                <p className="mt-1 text-sm font-medium text-gold-300">
                  {liveWeather.condition}
                </p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-2xl border border-gold-500/30 bg-gold-500/10 text-gold-400">
                <Sun size={36} className="animate-spin-slow" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-y border-stone-400/15 py-6">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  High / Low Today
                </span>
                <p className="mt-1 font-mono text-sm text-ivory">
                  {liveWeather.highTempC}°C / {liveWeather.lowTempC}°C
                </p>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  Humidity
                </span>
                <p className="mt-1 flex items-center gap-1 font-mono text-sm text-ivory">
                  <Droplets size={12} className="text-gold-400" />
                  {liveWeather.humidity}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  Wind Speed
                </span>
                <p className="mt-1 flex items-center gap-1 font-mono text-sm text-ivory">
                  <Wind size={12} className="text-gold-400" />
                  {liveWeather.wind}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  Air Quality Index
                </span>
                <p className="mt-1 font-mono text-sm text-emerald-400 font-semibold">
                  {liveWeather.aqi}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                <Sun size={14} className="text-gold-400" />
                Sunrise: <strong className="text-ivory">{liveWeather.sunrise}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-gold-400" />
                Sunset: <strong className="text-ivory">{liveWeather.sunset}</strong>
              </span>
            </div>
          </GlassPanel>

          {/* Photography & Golden Hour Advice */}
          <div className="space-y-6">
            <GlassPanel className="p-7">
              <div className="flex items-center gap-3 text-gold-400">
                <Camera size={20} />
                <h4 className="font-display text-xl text-ivory">
                  Golden Hour Photography Windows
                </h4>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-300">
                The red sandstone of Badami, Pattadakal, and Aihole transforms under low-angle sunlight. Time your visits to capture peak radiance:
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-gold-500/20 bg-charcoal-950/60 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                    Morning Golden Hour
                  </span>
                  <p className="mt-1 font-mono text-base font-medium text-ivory">
                    {liveWeather.goldenHourMorning}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">
                    Ideal for: Aihole Durga Temple colonnade &amp; Mahakuta Pushkarini spring reflection.
                  </p>
                </div>

                <div className="rounded-xl border border-gold-500/20 bg-charcoal-950/60 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                    Evening Golden Hour
                  </span>
                  <p className="mt-1 font-mono text-base font-medium text-ivory">
                    {liveWeather.goldenHourEvening}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">
                    Ideal for: Agastya Lake across to Bhutanatha shrines &amp; Meguti Hill sunset view.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-stone-400/15 bg-charcoal-900/60 p-4 text-xs leading-relaxed text-stone-300">
                <strong className="text-gold-400">Insider Photographer Tip: </strong>
                {liveWeather.photographyTip}
              </div>
            </GlassPanel>
          </div>
        </div>
      )}

      {/* Tab 3: Tourist Helplines */}
      {activeTab === "helplines" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gold-500/30 bg-gradient-to-r from-gold-500/15 to-charcoal-900/90 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
                  Karnataka State Tourism Official Helpline
                </p>
                <h3 className="mt-1 font-display text-3xl font-light text-ivory md:text-4xl">
                  Dial <span className="text-gold-400 font-bold">1363</span> (24x7 Toll-Free)
                </h3>
                <p className="mt-2 text-sm text-stone-300">
                  Instant tourist support in English, Kannada, and Hindi for route assistance, certified guides, and queries.
                </p>
              </div>
              <a
                href="tel:1363"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-charcoal-950 shadow-lg hover:bg-gold-400"
              >
                <Phone size={14} />
                Call 1363 Now
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {touristHelplines.map((contact) => (
              <GlassPanel key={contact.name} className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-stone-400/20 bg-charcoal-950/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-gold-400">
                      {contact.type}
                    </span>
                  </div>
                  <h4 className="mt-3 font-display text-lg font-medium text-ivory">
                    {contact.name}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-stone-400">
                    {contact.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-stone-400/10 pt-4">
                  <a
                    href={`tel:${contact.number.replace(/\s+/g, "")}`}
                    className="flex items-center justify-between font-mono text-sm font-bold text-gold-400 hover:text-gold-300"
                  >
                    <span>{contact.number}</span>
                    <Phone size={13} />
                  </a>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Travel Advisories */}
      {activeTab === "advisories" && (
        <div className="grid gap-6 md:grid-cols-2">
          {liveAdvisories.map((advisory) => (
            <GlassPanel key={advisory.id} className="p-7">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-300">
                  {advisory.badge}
                </span>
                <span className="text-[11px] font-mono text-stone-500">
                  {advisory.date}
                </span>
              </div>
              <h4 className="mt-4 font-display text-xl text-ivory">
                {advisory.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-stone-300">
                {advisory.content}
              </p>
            </GlassPanel>
          ))}
        </div>
      )}
    </div>
  );
}
