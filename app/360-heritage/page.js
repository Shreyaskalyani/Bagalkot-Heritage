"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Compass, Sparkles, MapPin, Eye, ArrowRight, Share2, Layers } from "lucide-react";
import {
  HERITAGE_360_VIEWPOINTS,
  getHeritageViewpointById,
  getHeritageViewpointBySlug,
} from "@/data/heritage360";
import Heritage360Viewer from "@/components/heritage360/Heritage360Viewer";
import PanoramaSelector from "@/components/heritage360/PanoramaSelector";
import PanoramaInfo from "@/components/heritage360/PanoramaInfo";
import Heritage360Map from "@/components/heritage360/Heritage360Map";
import SectionHeading from "@/components/ui/SectionHeading";

function Heritage360Content() {
  const searchParams = useSearchParams();
  const placeParam = searchParams.get("place");
  const viewParam = searchParams.get("view");

  const [selectedViewpoint, setSelectedViewpoint] = useState(() => {
    if (viewParam) return getHeritageViewpointById(viewParam);
    if (placeParam) return getHeritageViewpointBySlug(placeParam);
    return HERITAGE_360_VIEWPOINTS[0];
  });

  // Synchronize when query params change
  useEffect(() => {
    if (viewParam) {
      setSelectedViewpoint(getHeritageViewpointById(viewParam));
    } else if (placeParam) {
      setSelectedViewpoint(getHeritageViewpointBySlug(placeParam));
    }
  }, [placeParam, viewParam]);

  const handleSelectViewpoint = (vp) => {
    setSelectedViewpoint(vp);
    // Smooth scroll slightly towards viewer if user selected from below
    const viewerElem = document.getElementById("heritage-360-stage");
    if (viewerElem) {
      viewerElem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 pt-28 pb-24 md:pt-36 md:pb-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 space-y-16">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
            <Compass size={14} className="animate-spin text-gold-400" />
            <span>Enter the Heritage · 360° Cinematic Immersion</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-ivory tracking-tight">
            Stand Inside the Sanctuary.
            <span className="block text-gold-400">In 360° Panoramic Vision.</span>
          </h1>

          <p className="text-stone-300 text-sm md:text-base leading-relaxed font-sans">
            Rotate 360° horizontally, tilt into the vaulted rock-cut ceilings, and zoom into intricate 6th-century stone carvings across Badami, Pattadakal, Aihole, and Mahakuta.
          </p>
        </div>

        {/* Viewpoint Selector Bar */}
        <PanoramaSelector
          viewpoints={HERITAGE_360_VIEWPOINTS}
          selectedViewpoint={selectedViewpoint}
          onSelectViewpoint={handleSelectViewpoint}
        />

        {/* Primary 360 Interactive Stage */}
        <div id="heritage-360-stage" className="scroll-mt-32">
          <Heritage360Viewer viewpoint={selectedViewpoint} />
        </div>

        {/* Architectural Context & Information Panel */}
        <div className="border-t border-stone-800/80 pt-12">
          <PanoramaInfo viewpoint={selectedViewpoint} />
        </div>

        {/* "Find the View. Find the Place." Geographic Map */}
        <div className="border-t border-stone-800/80 pt-12">
          <Heritage360Map
            viewpoints={HERITAGE_360_VIEWPOINTS}
            selectedViewpoint={selectedViewpoint}
            onSelectViewpoint={handleSelectViewpoint}
          />
        </div>

        {/* Final Valley Exploration Banner */}
        <div className="rounded-3xl border border-gold-500/30 bg-gradient-to-r from-gold-500/15 via-charcoal-900 to-charcoal-950 p-8 md:p-12 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400">
              Complete Valley Experience
            </span>
            <h3 className="mt-2 font-display text-2xl md:text-3xl text-ivory">
              Taste the Story of the Valley Next
            </h3>
            <p className="mt-2 text-xs md:text-sm text-stone-300">
              Explore the culinary heritage of Bagalkot — from black cotton soil and pearly white jowar harvest to hand-patted Jolada Rotti and simmering Yennegayi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/food-culture"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(181,137,56,0.35)]"
            >
              <span>Explore Food &amp; Culture</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-charcoal-950 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ivory transition-colors hover:border-gold-500"
            >
              <span>All Destinations</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Heritage360Page() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-charcoal-950 text-gold-400">
          <div className="flex flex-col items-center gap-3">
            <Compass size={32} className="animate-spin text-gold-500" />
            <p className="font-mono text-xs uppercase tracking-[0.25em]">
              Entering 360° Heritage Experience…
            </p>
          </div>
        </div>
      }
    >
      <Heritage360Content />
    </Suspense>
  );
}
