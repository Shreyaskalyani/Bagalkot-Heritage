"use client";

import { useState } from "react";
import { Sparkles, Info, X, ExternalLink } from "lucide-react";
import Link from "next/link";

export function projectSphericalToScreen(spotYaw, spotPitch, camYaw, camPitch, fovDeg, aspect) {
  // Normalize delta yaw to [-180, 180]
  const dYawDeg = ((spotYaw - camYaw + 540) % 360) - 180;
  if (Math.abs(dYawDeg) > 85) {
    return { visible: false };
  }

  const dYaw = (dYawDeg * Math.PI) / 180;
  const sPitch = (spotPitch * Math.PI) / 180;
  const cPitch = (camPitch * Math.PI) / 180;

  const cosSP = Math.cos(sPitch);
  const sinSP = Math.sin(sPitch);
  const cosCP = Math.cos(cPitch);
  const sinCP = Math.sin(cPitch);

  // 3D vector in camera coordinate system
  const x = Math.sin(dYaw) * cosSP;
  const y = sinSP * cosCP - cosSP * sinCP * Math.cos(dYaw);
  const z = Math.cos(dYaw) * cosSP * cosCP + sinSP * sinCP;

  if (z <= 0.05) {
    return { visible: false };
  }

  const fovRad = (fovDeg * Math.PI) / 180;
  const tanHalfFov = Math.tan(fovRad / 2);

  // Projected coordinates in [-1, 1] range
  const ndcX = x / (z * tanHalfFov * (aspect || 1.6));
  const ndcY = y / (z * tanHalfFov);

  if (Math.abs(ndcX) > 1.05 || Math.abs(ndcY) > 1.05) {
    return { visible: false };
  }

  // Convert to percent coordinates
  const screenX = (ndcX * 0.5 + 0.5) * 100;
  const screenY = (-ndcY * 0.5 + 0.5) * 100;

  return { visible: true, x: screenX, y: screenY };
}

export default function PanoramaHotspots({
  hotspots = [],
  currentYaw = 0,
  currentPitch = 0,
  fov = 75,
  aspect = 1.77,
  activeHotspot,
  onSelectHotspot,
  onCloseHotspot,
  monumentSlug,
}) {
  return (
    <>
      {/* Projected Hotspot Markers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {hotspots.map((spot) => {
          const projection = projectSphericalToScreen(
            spot.yaw,
            spot.pitch,
            currentYaw,
            currentPitch,
            fov,
            aspect
          );

          if (!projection.visible) return null;

          const isSelected = activeHotspot?.id === spot.id;

          return (
            <div
              key={spot.id}
              style={{
                left: `${projection.x}%`,
                top: `${projection.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute pointer-events-auto transition-transform duration-75"
            >
              <button
                type="button"
                onClick={() => onSelectHotspot(spot)}
                className="group relative flex items-center justify-center p-2 focus:outline-none"
                aria-label={`Inspect ${spot.title}`}
              >
                {/* Expanding pulse wave */}
                <span className="absolute h-8 w-8 rounded-full bg-gold-400/30 animate-ping opacity-75" />

                {/* Outer ring */}
                <span
                  className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-gold-300 bg-gold-500 text-charcoal-950 scale-125 shadow-[0_0_20px_rgba(234,179,8,0.8)]"
                      : "border-gold-400 bg-charcoal-950/90 text-gold-400 shadow-[0_0_12px_rgba(0,0,0,0.8)] group-hover:scale-115 group-hover:border-gold-300 group-hover:bg-gold-500 group-hover:text-charcoal-950"
                  }`}
                >
                  <Sparkles size={12} strokeWidth={2.5} />
                </span>

                {/* Floating pill label */}
                <span className="absolute left-full ml-2.5 whitespace-nowrap rounded-md border border-gold-500/30 bg-charcoal-950/90 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-ivory opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-md pointer-events-none">
                  {spot.title}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Hotspot Modal Detail Card */}
      {activeHotspot && (
        <div className="absolute bottom-16 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-30 max-w-sm rounded-2xl border border-gold-500/35 bg-charcoal-950/95 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-block rounded-full border border-gold-500/40 bg-gold-500/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gold-400">
                {activeHotspot.category || "Architectural Hotspot"}
              </span>
              <h4 className="mt-2 font-display text-lg text-ivory">
                {activeHotspot.title}
              </h4>
            </div>
            <button
              type="button"
              onClick={onCloseHotspot}
              className="grid h-7 w-7 place-items-center rounded-full border border-stone-800 text-stone-400 hover:border-gold-500/50 hover:text-ivory"
              aria-label="Close hotspot information"
            >
              <X size={14} />
            </button>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-stone-300 font-sans">
            {activeHotspot.description}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-stone-800/80 pt-3">
            <span className="font-mono text-[10px] text-stone-400">
              Bearing: {Math.round(activeHotspot.yaw)}° · Elev: {Math.round(activeHotspot.pitch)}°
            </span>
            {monumentSlug && (
              <Link
                href={`/destinations/${monumentSlug}`}
                className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold-400 hover:text-gold-300"
              >
                <span>Read Monument Guide</span>
                <ExternalLink size={12} />
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
