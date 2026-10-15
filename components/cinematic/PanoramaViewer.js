"use client";

import { useState, useRef } from "react";
import { Compass, RotateCw, MoveHorizontal, Maximize2, Sparkles } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";

const PANORAMA_SCENES = [
  {
    id: "badami-cliffs",
    title: "Badami Canyon & Cave Cliffs",
    src: "/images/badami-panorama-8k.jpg",
    location: "Agastya Lake Basin, Badami",
    azimuth: "185° S",
    elevation: "+12°",
    note: "Panoramic overview of the red sandstone ridge and cave excavations.",
  },
  {
    id: "shivalaya-ridge",
    title: "Upper Shivalaya & Northern Ridge",
    src: "/images/shivalayas-caves-9k.jpg",
    location: "Northern Fort Ridge, Badami",
    azimuth: "042° NE",
    elevation: "+24°",
    note: "High-angle panoramic vista across the Malaprabha valley floor.",
  },
];

export default function PanoramaViewer() {
  const [selectedScene, setSelectedScene] = useState(PANORAMA_SCENES[0]);
  const [offsetPercent, setOffsetPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(50);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startOffsetRef.current = offsetPercent;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - startXRef.current;
    // Map delta to percentage
    const deltaPercent = (deltaX / window.innerWidth) * 60;
    const newOffset = Math.min(100, Math.max(0, startOffsetRef.current - deltaPercent));
    setOffsetPercent(newOffset);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold-500/25 bg-charcoal-950 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-400">
            <Compass size={12} />
            Interactive 360° Heritage View
          </span>
          <h3 className="mt-2 font-display text-2xl md:text-3xl text-ivory">
            {selectedScene.title}
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">{selectedScene.location}</p>
        </div>

        {/* Scene switcher tabs */}
        <div className="flex items-center gap-2">
          {PANORAMA_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => {
                setSelectedScene(scene);
                setOffsetPercent(50);
              }}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedScene.id === scene.id
                  ? "bg-gold-500 text-charcoal-950"
                  : "border border-stone-800 text-stone-400 hover:text-ivory"
              }`}
            >
              {scene.id === "badami-cliffs" ? "Agastya Basin" : "Northern Ridge"}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Panoramic Canvas */}
      <div
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="relative h-[320px] md:h-[420px] w-full overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing border border-stone-800 select-none"
      >
        <div
          className="absolute inset-y-0 h-full w-[250%] will-change-transform transition-[background-position] duration-75"
          style={{
            backgroundImage: `url(${selectedScene.src})`,
            backgroundSize: "cover",
            backgroundPosition: `${offsetPercent}% center`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-charcoal-950/40 pointer-events-none" />

        {/* HUD Overlay Indicators */}
        <div className="absolute top-4 left-4 flex items-center gap-3 z-10 pointer-events-none">
          <div className="rounded-lg border border-gold-500/30 bg-charcoal-950/80 px-2.5 py-1 text-[11px] font-mono text-gold-400 backdrop-blur-md">
            Heading: {selectedScene.azimuth}
          </div>
          <div className="rounded-lg border border-stone-700 bg-charcoal-950/80 px-2.5 py-1 text-[11px] font-mono text-stone-300 backdrop-blur-md">
            Elev: {selectedScene.elevation}
          </div>
        </div>

        {/* Center Drag cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full border border-stone-700 bg-charcoal-950/85 px-4 py-1.5 text-xs text-stone-300 backdrop-blur-md pointer-events-none">
          <MoveHorizontal size={14} className="text-gold-400" />
          <span>Drag left or right to pan view</span>
        </div>
      </div>

      <p className="mt-4 text-xs text-stone-400 text-center font-sans">
        {selectedScene.note}
      </p>
    </div>
  );
}
