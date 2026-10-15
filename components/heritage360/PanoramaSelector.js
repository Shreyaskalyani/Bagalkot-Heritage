"use client";

import Image from "next/image";
import { Compass, MapPin, Check } from "lucide-react";

export default function PanoramaSelector({
  viewpoints = [],
  selectedViewpoint,
  onSelectViewpoint,
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-500">
          Curated 360° Viewpoints ({viewpoints.length})
        </span>
        <span className="text-[11px] text-stone-400">
          Select a sanctuary to load full spherical panorama
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {viewpoints.map((vp) => {
          const isSelected = selectedViewpoint?.id === vp.id;

          return (
            <button
              key={vp.id}
              type="button"
              onClick={() => onSelectViewpoint(vp)}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                isSelected
                  ? "border-gold-400 bg-charcoal-900 shadow-[0_0_20px_rgba(181,137,56,0.3)] ring-1 ring-gold-400"
                  : "border-stone-800 bg-charcoal-950/70 hover:border-gold-500/50 hover:bg-charcoal-900/90"
              }`}
            >
              {/* Thumbnail Container */}
              <div className="relative h-24 w-full overflow-hidden bg-charcoal-900">
                <Image
                  src={vp.fallbackImage || vp.panoramaUrl}
                  alt={vp.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />

                {/* Selected Indicator Badge */}
                {isSelected && (
                  <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-charcoal-950 shadow-md">
                    <Check size={11} strokeWidth={3} />
                  </span>
                )}

                {/* Bearing Badge */}
                <span className="absolute bottom-1.5 left-2 rounded bg-charcoal-950/80 px-1.5 py-0.5 font-mono text-[9px] text-gold-400 backdrop-blur-sm">
                  {vp.defaultHeading}° Azimuth
                </span>
              </div>

              {/* Information Row */}
              <div className="p-3">
                <h4
                  className={`line-clamp-1 font-display text-sm transition-colors ${
                    isSelected ? "text-gold-300 font-medium" : "text-ivory group-hover:text-gold-300"
                  }`}
                >
                  {vp.title.split("&")[0].trim()}
                </h4>
                <p className="mt-1 line-clamp-1 text-[10px] text-stone-400">
                  {vp.location.split(",")[0]}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
