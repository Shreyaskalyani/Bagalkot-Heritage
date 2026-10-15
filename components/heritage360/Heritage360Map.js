"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Compass, MapPin, ArrowRight, Eye } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

// Dynamically import Leaflet to avoid SSR issues
const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[420px] w-full place-items-center rounded-2xl bg-charcoal-900 border border-stone-800">
      <div className="flex flex-col items-center gap-2">
        <Compass size={24} className="animate-spin text-gold-500" />
        <p className="text-xs uppercase tracking-[0.25em] text-stone-400">
          Loading 360° Heritage Map…
        </p>
      </div>
    </div>
  ),
});

export default function Heritage360Map({
  viewpoints = [],
  selectedViewpoint,
  onSelectViewpoint,
}) {
  const { t, language } = useLanguage();

  // Convert viewpoints to POI format for LeafletMap
  const pois = viewpoints.map((vp) => ({
    id: vp.id,
    name: vp.title,
    localName: vp.subtitle,
    category: "monument",
    latitude: vp.coordinates.lat,
    longitude: vp.coordinates.lng,
    location: vp.location,
    slug: vp.slug,
    description: `Elevation: ${vp.elevation} · Azimuth: ${vp.defaultHeading}° · ${vp.description.slice(0, 110)}...`,
  }));

  return (
    <div className="rounded-3xl border border-gold-500/20 bg-charcoal-950 p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500">
            {t("viewpoint_navigator", "Geographic Viewpoint Navigator")}
          </span>
          <h3 className="mt-1 font-display text-2xl md:text-3xl text-ivory">
            {t("find_the_view", "Find the View. Find the Place.")}
          </h3>
          <p className="mt-2 text-xs md:text-sm text-stone-400 max-w-xl">
            {t("map_desc", "Locate every 360° viewpoint across the Malaprabha River Valley. Click any viewpoint pin on the map to instantly swing the panoramic camera to that heritage site.")}
          </p>
        </div>

        <Link
          href="/map"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400 hover:text-gold-300"
        >
          <span>{t("open_full_map", "Open Full Valley Corridor Map")}</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Map Container */}
      <div className="h-[420px] w-full overflow-hidden rounded-2xl border border-stone-800 shadow-2xl relative">
        <LeafletMap
          pois={pois}
          focusSlug={selectedViewpoint?.slug}
          selectedPoi={pois.find((p) => p.id === selectedViewpoint?.id)}
          onSelectPoi={(poi) => {
            const vp = viewpoints.find((v) => v.id === poi.id || v.slug === poi.slug);
            if (vp && onSelectViewpoint) {
              onSelectViewpoint(vp);
            }
          }}
          baseLayer="dark"
          height="100%"
        />

        {/* Floating Active Site Overlay Tag */}
        <div className="absolute top-4 right-4 z-[500] rounded-xl border border-gold-500/30 bg-charcoal-950/90 px-3 py-2 backdrop-blur-md hidden sm:block">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-ivory">
              {selectedViewpoint?.title.split("&")[0].trim()}
            </span>
          </div>
          <span className="mt-0.5 block font-mono text-[9px] text-gold-400">
            {selectedViewpoint?.coordinates.lat}° N, {selectedViewpoint?.coordinates.lng}° E
          </span>
        </div>
      </div>

      {/* Viewpoint Quick Selection Bar */}
      <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-stone-800/80">
        <span className="text-[11px] text-stone-400 mr-2 font-medium">{t("quick_jump", "Quick Jump:")}</span>
        {viewpoints.map((vp) => (
          <button
            key={vp.id}
            type="button"
            onClick={() => onSelectViewpoint(vp)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedViewpoint?.id === vp.id
                ? "bg-gold-500/20 text-gold-300 border border-gold-500/50"
                : "border border-stone-800 text-stone-400 hover:border-stone-700 hover:text-ivory"
            }`}
          >
            <Eye size={12} className={selectedViewpoint?.id === vp.id ? "text-gold-400" : "text-stone-500"} />
            <span>{vp.title.split("&")[0].trim()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
