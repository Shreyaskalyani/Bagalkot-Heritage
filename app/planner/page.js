import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, MapPin } from "lucide-react";
import PlannerHub from "@/components/tourism/PlannerHub";

export const metadata = {
  title: "Trip Planner & Travel Guide — Bagalkot Heritage Tourism",
  description:
    "Plan your journey through Bagalkot's heritage corridor — curated 1-day, 2-day & 3-day circuits, AI-sequenced routes, hotel directory, taxi fares, and travel logistics.",
};

export default function PlannerPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-32">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
          <Compass size={14} className="text-gold-400" />
          Heritage Travel Hub
        </div>
        <h1 className="mx-auto mt-5 max-w-4xl font-display text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
          Your Bagalkot Journey.
          <span className="block text-gold-400">Planned to Perfection.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-300 md:text-lg">
          Whether you have one day or a long weekend — explore curated
          heritage circuits, generate custom AI itineraries sequenced by proximity,
          and discover verified hotels, taxi rates, and authentic North Karnataka dining.
        </p>

        {/* Quick Highlights Strip */}
        <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            1-Day, 2-Day &amp; 3-Day Curated Circuits
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Badami • Pattadakal • Aihole • Mahakuta
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Printable Itineraries with Transit Durations
          </span>
        </div>
      </div>

      {/* Main Trip Hub Tabs & Content */}
      <div className="mt-14">
        <PlannerHub />
      </div>

      {/* Map Footer Link */}
      <div className="mt-16 text-center">
        <Link
          href="/map"
          className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-charcoal-900/60 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-300 transition-all hover:border-gold-400 hover:bg-gold-500/10"
        >
          <MapPin size={14} aria-hidden="true" />
          Explore the full corridor on interactive map
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}