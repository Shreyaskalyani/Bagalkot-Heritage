"use client";

import Link from "next/link";
import {
  MapPin,
  Calendar,
  Compass,
  Camera,
  Sun,
  ArrowRight,
  Landmark,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";

export default function PanoramaInfo({ viewpoint }) {
  if (!viewpoint) return null;

  return (
    <div className="space-y-8">
      {/* Primary Context Header */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold-400">
              360° Spherical Panoramic View
            </span>
            <span className="font-mono text-xs text-stone-400">
              {viewpoint.coordinates.lat}° N, {viewpoint.coordinates.lng}° E
            </span>
            <span className="text-xs text-stone-500">·</span>
            <span className="font-mono text-xs text-stone-400">{viewpoint.elevation}</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-ivory">
            {viewpoint.title}
          </h2>
          <p className="mt-1 font-display text-lg text-gold-400/90">
            {viewpoint.subtitle}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-stone-300 md:text-base">
            {viewpoint.description}
          </p>
        </div>

        {/* Quick Facts Card */}
        <GlassPanel className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <Landmark size={18} className="mt-0.5 shrink-0 text-gold-500" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                Dynasty &amp; Epoch
              </p>
              <p className="mt-0.5 text-xs text-ivory font-medium">
                {viewpoint.dynasty}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sun size={18} className="mt-0.5 shrink-0 text-gold-500" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                Optimal Photography Light
              </p>
              <p className="mt-0.5 text-xs text-ivory font-medium">
                {viewpoint.photoTime}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Camera size={18} className="mt-0.5 shrink-0 text-gold-500" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                Architectural Framing Cue
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-stone-300">
                {viewpoint.photoTip}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800">
            <Link
              href={`/destinations/${viewpoint.slug}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500/15 border border-gold-500/30 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold-300 hover:bg-gold-500 hover:text-charcoal-950 transition-all"
            >
              <span>Explore Full Destination Profile</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </GlassPanel>
      </div>

      {/* Architectural Highlights & Nearby Sites */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Architectural Features */}
        <div className="rounded-2xl border border-stone-800 bg-charcoal-950/70 p-6">
          <div className="flex items-center gap-2 text-gold-400 mb-4">
            <Layers size={16} />
            <h3 className="font-display text-lg text-ivory">Architectural Highlights in this View</h3>
          </div>
          <ul className="space-y-3">
            {viewpoint.architecturalHighlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3 text-xs leading-relaxed text-stone-300">
                <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500 mt-1.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Nearby Heritage Sites in Corridor */}
        <div className="rounded-2xl border border-stone-800 bg-charcoal-950/70 p-6">
          <div className="flex items-center gap-2 text-gold-400 mb-4">
            <MapPin size={16} />
            <h3 className="font-display text-lg text-ivory">Explore Nearby in the Valley</h3>
          </div>
          <p className="text-xs text-stone-400 mb-4">
            The Malaprabha heritage corridor connects these monuments within minutes of each other:
          </p>
          <div className="space-y-2.5">
            {viewpoint.nearbyDestinations.map((dest) => (
              <Link
                key={dest.name}
                href={`/destinations/${dest.slug}`}
                className="flex items-center justify-between rounded-xl border border-stone-800/80 bg-charcoal-900/60 p-3 transition-colors hover:border-gold-500/40 hover:bg-charcoal-900"
              >
                <div>
                  <h4 className="text-xs font-semibold text-ivory">{dest.name}</h4>
                  <span className="text-[10px] text-stone-400">{dest.dist} from this viewpoint</span>
                </div>
                <ArrowRight size={14} className="text-gold-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
