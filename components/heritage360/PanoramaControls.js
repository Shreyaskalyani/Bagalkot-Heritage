"use client";

import { ZoomIn, ZoomOut, RotateCcw, Maximize, Minimize, Compass, MapPin, Eye } from "lucide-react";

export default function PanoramaControls({
  yaw = 0,
  fov = 75,
  onZoomIn,
  onZoomOut,
  onReset,
  isFullscreen,
  onToggleFullscreen,
  viewMode = "spherical", // "spherical" | "streetview"
  onToggleViewMode,
  hasStreetView = true,
}) {
  // Normalize heading for compass
  const normalizedHeading = ((yaw % 360) + 360) % 360;

  // Cardinal direction label
  const getCardinal = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Left: View Mode Toggle */}
      <div className="flex items-center gap-1.5 rounded-full border border-gold-500/25 bg-charcoal-950/80 p-1 backdrop-blur-md">
        <button
          type="button"
          onClick={() => onToggleViewMode && onToggleViewMode("spherical")}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider transition-all ${
            viewMode === "spherical"
              ? "bg-gold-500 text-charcoal-950 shadow-[0_0_12px_rgba(181,137,56,0.35)]"
              : "text-stone-400 hover:text-ivory"
          }`}
          title="Interactive 360° Panoramic Exploration"
        >
          <Compass size={13} />
          <span>360° Virtual Tour</span>
        </button>

        {hasStreetView && (
          <button
            type="button"
            onClick={() => onToggleViewMode && onToggleViewMode("streetview")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider transition-all ${
              viewMode === "streetview"
                ? "bg-gold-500 text-charcoal-950 shadow-[0_0_12px_rgba(181,137,56,0.35)]"
                : "text-stone-400 hover:text-ivory"
            }`}
            title="Google Maps 3D Satellite & Aerial View"
          >
            <MapPin size={13} />
            <span>Google 3D Satellite</span>
          </button>
        )}
      </div>

      {/* Right: Controls Cluster */}
      <div className="flex items-center gap-2">
        {/* Compass Bearing Indicator */}
        <div
          className="flex items-center gap-2 rounded-full border border-stone-800 bg-charcoal-950/80 px-3 py-1 backdrop-blur-md"
          title={`Current Heading: ${Math.round(normalizedHeading)}° (${getCardinal(normalizedHeading)})`}
        >
          <div
            className="grid h-5 w-5 place-items-center transition-transform duration-75 text-gold-400"
            style={{ transform: `rotate(${-normalizedHeading}deg)` }}
          >
            <Compass size={16} />
          </div>
          <span className="font-mono text-xs font-medium text-stone-300">
            {Math.round(normalizedHeading)}° {getCardinal(normalizedHeading)}
          </span>
        </div>

        {/* Zoom In */}
        <button
          type="button"
          onClick={onZoomIn}
          disabled={fov <= 40}
          className="grid h-8 w-8 place-items-center rounded-full border border-stone-800 bg-charcoal-950/80 text-stone-300 transition-colors hover:border-gold-500/40 hover:text-gold-400 disabled:opacity-40 backdrop-blur-md"
          title="Zoom in (+)"
          aria-label="Zoom in"
        >
          <ZoomIn size={15} />
        </button>

        {/* Zoom Out */}
        <button
          type="button"
          onClick={onZoomOut}
          disabled={fov >= 95}
          className="grid h-8 w-8 place-items-center rounded-full border border-stone-800 bg-charcoal-950/80 text-stone-300 transition-colors hover:border-gold-500/40 hover:text-gold-400 disabled:opacity-40 backdrop-blur-md"
          title="Zoom out (-)"
          aria-label="Zoom out"
        >
          <ZoomOut size={15} />
        </button>

        {/* Reset View */}
        <button
          type="button"
          onClick={onReset}
          className="grid h-8 w-8 place-items-center rounded-full border border-stone-800 bg-charcoal-950/80 text-stone-300 transition-colors hover:border-gold-500/40 hover:text-gold-400 backdrop-blur-md"
          title="Reset viewpoint (R)"
          aria-label="Reset orientation"
        >
          <RotateCcw size={14} />
        </button>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          className="grid h-8 w-8 place-items-center rounded-full border border-gold-500/30 bg-charcoal-950/80 text-gold-400 transition-all hover:bg-gold-500 hover:text-charcoal-950 backdrop-blur-md"
          title={isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen (F)"}
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
        </button>
      </div>
    </div>
  );
}
