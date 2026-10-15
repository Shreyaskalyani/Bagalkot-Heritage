"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  List,
  Map as MapIcon,
  Navigation,
  Layers,
  Route,
  Compass,
  Phone,
  Clock,
  Ticket,
  Hotel,
  Utensils,
  Car,
  Shield,
  Sparkles,
  ExternalLink,
  X,
} from "lucide-react";
import { tourismPois, curatedCircuitRoutes } from "@/data/tourism-map-data";
import GlassPanel from "@/components/ui/GlassPanel";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-charcoal-900">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
          Loading Tourism GIS Map…
        </p>
      </div>
    </div>
  ),
});

const GoogleMapComponent = dynamic(() => import("./GoogleMapComponent"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-charcoal-900">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
          Loading Google Maps Platform…
        </p>
      </div>
    </div>
  ),
});

const CATEGORIES = [
  { id: "all", label: "All Sites", icon: Compass, count: tourismPois.length },
  { id: "monument", label: "Monuments", icon: MapPin, count: 11 },
  { id: "hotel", label: "Stays & Hotels", icon: Hotel, count: 4 },
  { id: "food", label: "Food Trail", icon: Utensils, count: 3 },
  { id: "transit", label: "Transit Hubs", icon: Car, count: 2 },
  { id: "handloom", label: "Handlooms", icon: Sparkles, count: 2 },
  { id: "safety", label: "Tourist Safety", icon: Shield, count: 1 },
];

export default function MapExplorer() {
  const [view, setView] = useState("map"); // "map" | "list"
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeRouteId, setActiveRouteId] = useState(null);
  const [baseLayer, setBaseLayer] = useState("dark"); // "dark" | "satellite" | "street"
  const [selectedPoi, setSelectedPoi] = useState(tourismPois[0]);
  const [focusSlug, setFocusSlug] = useState(null);
  const searchParams = useSearchParams();

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const [mapEngine, setMapEngine] = useState(googleMapsApiKey ? "google" : "leaflet");

  // Support deep links like /map?monument=badami-cave-temples
  useEffect(() => {
    const slug = searchParams.get("monument");
    if (slug) {
      const match = tourismPois.find((p) => p.slug === slug || p.id === slug);
      if (match) {
        setSelectedPoi(match);
        setFocusSlug(slug);
        setView("map");
      }
    }
  }, [searchParams]);

  const activeRoute = curatedCircuitRoutes.find((r) => r.id === activeRouteId) || null;

  const filteredPois =
    activeCategory === "all"
      ? tourismPois
      : tourismPois.filter((p) => p.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-32">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            <Compass size={14} className="text-gold-400" />
            Tourism GIS &amp; Navigation System
          </div>
          <h1 className="mt-4 font-display text-4xl font-light text-ivory md:text-6xl">
            Bagalkot Heritage <span className="text-gold-400">Tourism Map</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 md:text-base">
            Live interactive navigation for 23 certified heritage monoliths, KSTDC resorts,
            authentic Jolada Rotti dining, handloom clusters, and driving circuits across Badami,
            Pattadakal, and Aihole.
          </p>
        </div>

        {/* View Toggle */}
        <div
          className="flex rounded-full border border-stone-400/25 bg-charcoal-900/60 p-1"
          role="tablist"
          aria-label="Map view mode"
        >
          {[
            { id: "map", label: "Interactive Map", icon: MapIcon },
            { id: "list", label: "Directory List", icon: List },
          ].map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={view === v.id}
              onClick={() => setView(v.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                view === v.id
                  ? "bg-gold-500 text-charcoal-950 font-bold shadow-md"
                  : "text-stone-300 hover:text-ivory"
              }`}
            >
              <v.icon size={14} strokeWidth={1.75} aria-hidden="true" />
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar 1: Category Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-stone-400/15 pb-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveRouteId(null); // reset route when filtering categories
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-gold-500 text-charcoal-950 font-bold shadow-[0_0_18px_rgba(181,137,56,0.35)]"
                  : "border border-stone-400/20 bg-charcoal-900/40 text-stone-300 hover:border-gold-500/40 hover:text-ivory"
              }`}
            >
              <Icon size={13} aria-hidden="true" />
              <span>{cat.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  isActive ? "bg-charcoal-950/20 text-charcoal-950 font-bold" : "text-stone-400"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Control Bar 2: Curated Driving Circuit Overlays & Layer Switcher */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-400/15 bg-charcoal-900/40 p-3">
        {/* Driving Route Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400 mr-1">
            <Route size={14} />
            Driving Circuits:
          </span>
          <button
            onClick={() => setActiveRouteId(null)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeRouteId === null
                ? "bg-gold-500/20 text-gold-300 border border-gold-500/50"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            All Points (Free)
          </button>
          {curatedCircuitRoutes.map((route) => {
            const isSelected = activeRouteId === route.id;
            return (
              <button
                key={route.id}
                onClick={() => {
                  setActiveRouteId(route.id);
                  setActiveCategory("all");
                }}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-gold-500 text-charcoal-950 font-bold shadow-md"
                    : "border border-stone-400/15 bg-charcoal-950/50 text-stone-300 hover:border-gold-500/40"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: isSelected ? "#000" : route.color }}
                />
                <span>{route.title.split(":")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Base Map Switcher */}
        <div className="flex items-center gap-1.5 border-l border-stone-400/15 pl-4 text-xs">
          <span className="flex items-center gap-1 text-stone-400">
            <Layers size={13} className="text-gold-400" />
            Layer:
          </span>
          {[
            { id: "dark", label: "Dark Matter" },
            { id: "satellite", label: "Satellite" },
            { id: "street", label: "Street" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setBaseLayer(l.id)}
              className={`rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                baseLayer === l.id
                  ? "bg-gold-500/25 text-gold-300 border border-gold-500/40"
                  : "text-stone-400 hover:text-ivory"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Engine Switcher */}
        <div className="flex items-center gap-1.5 border-l border-stone-400/15 pl-4 text-xs">
          <span className="flex items-center gap-1 text-stone-400">
            <Compass size={13} className="text-gold-400" />
            Engine:
          </span>
          <button
            onClick={() => setMapEngine("google")}
            className={`rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
              mapEngine === "google"
                ? "bg-gold-500/25 text-gold-300 border border-gold-500/40"
                : "text-stone-400 hover:text-ivory"
            }`}
          >
            Google Maps {googleMapsApiKey ? "✓" : ""}
          </button>
          <button
            onClick={() => setMapEngine("leaflet")}
            className={`rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
              mapEngine === "leaflet"
                ? "bg-gold-500/25 text-gold-300 border border-gold-500/40"
                : "text-stone-400 hover:text-ivory"
            }`}
          >
            OpenStreetMap
          </button>
        </div>
      </div>

      {/* Main Content: Map View or Directory View */}
      {view === "map" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Map Canvas */}
          <div className="relative h-[70vh] min-h-[500px] overflow-hidden rounded-2xl border border-stone-400/20 shadow-2xl">
            {mapEngine === "google" ? (
              googleMapsApiKey ? (
                <GoogleMapComponent
                  apiKey={googleMapsApiKey}
                  pois={tourismPois}
                  activeCategory={activeCategory}
                  activeRoute={activeRoute}
                  baseLayer={baseLayer}
                  selectedPoi={selectedPoi}
                  focusSlug={focusSlug}
                  onSelectPoi={(poi) => setSelectedPoi(poi)}
                  onFallbackToOsm={() => setMapEngine("leaflet")}
                  height="100%"
                />
              ) : (
                <div className="relative flex h-full w-full flex-col items-center justify-center bg-charcoal-900 px-6 text-center">
                  <div className="max-w-md rounded-2xl border border-gold-500/30 bg-charcoal-950/85 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-500/40 bg-gold-500/10 text-gold-400">
                      <Compass size={28} />
                    </div>
                    <h3 className="mt-4 font-display text-2xl text-ivory">Google Maps Platform API</h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-300">
                      Google Maps Platform engine is ready! To activate official Google Maps Satellite,
                      Vector, and Street View, paste your API key in <code className="rounded bg-charcoal-800 px-1.5 py-0.5 font-mono text-gold-400 text-[11px]">.env.local</code> as:
                    </p>
                    <div className="mt-3 rounded-lg border border-stone-700 bg-charcoal-950 p-2.5 text-left font-mono text-[11px] text-stone-300 select-all">
                      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
                    </div>
                    <p className="mt-3 text-[11px] text-stone-400">
                      Or use the built-in OpenStreetMap CartoDB / Esri satellite engine right now:
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => setMapEngine("leaflet")}
                        className="rounded-xl bg-gold-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-950 hover:bg-gold-400 transition-colors"
                      >
                        Switch to OpenStreetMap / Leaflet
                      </button>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <LeafletMap
                pois={tourismPois}
                activeCategory={activeCategory}
                activeRoute={activeRoute}
                baseLayer={baseLayer}
                selectedPoi={selectedPoi}
                focusSlug={focusSlug}
                onSelectPoi={(poi) => setSelectedPoi(poi)}
                height="100%"
              />
            )}

            {/* Circuit Active Badge */}
            {activeRoute && (
              <div className="absolute top-4 left-4 z-[500] flex items-center gap-2 rounded-xl border border-gold-500/40 bg-charcoal-950/90 px-4 py-2.5 text-xs shadow-xl backdrop-blur-md">
                <span
                  className="h-2.5 w-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: activeRoute.color }}
                />
                <div>
                  <p className="font-bold text-ivory">{activeRoute.title}</p>
                  <p className="text-[11px] text-stone-400">
                    {activeRoute.duration} • {activeRoute.waypoints.length} stops
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Tourist Inspector Side Card */}
          <GlassPanel className="flex flex-col justify-between p-6">
            {selectedPoi ? (
              <div>
                {/* Photo Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedPoi.image}
                    alt={selectedPoi.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full border border-gold-500/40 bg-charcoal-950/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-300 backdrop-blur-md">
                    {selectedPoi.categoryLabel}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-4">
                  <h3 className="font-display text-2xl font-normal text-ivory">
                    {selectedPoi.name}
                  </h3>
                  {selectedPoi.localName && (
                    <p className="font-display text-base text-gold-400">
                      {selectedPoi.localName}
                    </p>
                  )}
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
                    <MapPin size={12} className="text-gold-500 shrink-0" />
                    {selectedPoi.location} • {selectedPoi.distBadamiStation}
                  </p>

                  <div className="mt-4 space-y-2 border-y border-stone-400/10 py-3 text-xs text-stone-300">
                    {selectedPoi.hours && (
                      <p className="flex items-center gap-2">
                        <Clock size={13} className="text-gold-400 shrink-0" />
                        <span>Hours: {selectedPoi.hours}</span>
                      </p>
                    )}
                    {(selectedPoi.ticket || selectedPoi.priceRange) && (
                      <p className="flex items-center gap-2">
                        <Ticket size={13} className="text-gold-400 shrink-0" />
                        <span>Cost: {selectedPoi.ticket || selectedPoi.priceRange}</span>
                      </p>
                    )}
                    {selectedPoi.phone && (
                      <p className="flex items-center gap-2">
                        <Phone size={13} className="text-gold-400 shrink-0" />
                        <a
                          href={`tel:${selectedPoi.phone.replace(/\s+/g, "")}`}
                          className="hover:text-gold-300"
                        >
                          Enquiry: {selectedPoi.phone}
                        </a>
                      </p>
                    )}
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-stone-400 line-clamp-3">
                    {selectedPoi.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center text-stone-500">
                <MapPin size={32} className="text-gold-600 mb-3" />
                <p className="font-display text-lg text-ivory">Select any location</p>
                <p className="mt-1 text-xs">
                  Click any marker on the map to inspect timings, pricing, and directions.
                </p>
              </div>
            )}

            {/* Quick Navigation Action Buttons */}
            {selectedPoi && (
              <div className="mt-6 space-y-2.5 border-t border-stone-400/15 pt-4">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPoi.lat},${selectedPoi.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-lg"
                >
                  <Navigation size={14} />
                  Get Google Maps Directions
                </a>

                {selectedPoi.category === "hotel" && selectedPoi.bookingLink && (
                  <a
                    href={selectedPoi.bookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-400 transition-colors hover:bg-gold-500 hover:text-charcoal-950"
                  >
                    <span>Book on Official KSTDC Portal</span>
                    <ExternalLink size={13} />
                  </a>
                )}

                {selectedPoi.category === "transit" && selectedPoi.transitLink && (
                  <a
                    href={selectedPoi.transitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-400 transition-colors hover:bg-gold-500 hover:text-charcoal-950"
                  >
                    <span>Check Live Transit Schedules</span>
                    <ExternalLink size={13} />
                  </a>
                )}

                {selectedPoi.slug ? (
                  <Link
                    href={`/destinations/${selectedPoi.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-400/25 bg-charcoal-900/60 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-200 transition-colors hover:border-gold-500/50 hover:text-gold-300"
                  >
                    <span>View Full Monument Guide</span>
                    <ExternalLink size={13} />
                  </Link>
                ) : (
                  <Link
                    href="/planner"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-400/25 bg-charcoal-900/60 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-200 transition-colors hover:border-gold-500/50 hover:text-gold-300"
                  >
                    <span>Add to Trip Planner</span>
                    <ExternalLink size={13} />
                  </Link>
                )}
              </div>
            )}
          </GlassPanel>
        </div>
      ) : (
        /* Directory List View */
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-400 px-1">
            <span>Showing {filteredPois.length} locations across the heritage corridor</span>
            <span>All coordinates verified by Karnataka Tourism</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPois.map((poi) => (
              <GlassPanel key={poi.id} className="flex flex-col justify-between p-5">
                <div>
                  <div className="relative h-40 w-full overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={poi.image}
                      alt={poi.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 rounded-full border border-gold-500/40 bg-charcoal-950/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-300">
                      {poi.categoryLabel}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl text-ivory">{poi.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
                    <MapPin size={12} className="text-gold-400 shrink-0" />
                    {poi.location} • {poi.distBadamiStation}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-stone-300 line-clamp-2">
                    {poi.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-2 border-t border-stone-400/10 pt-4">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${poi.lat},${poi.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300"
                  >
                    <Navigation size={12} />
                    <span>Navigate</span>
                  </a>

                  {poi.category === "hotel" && poi.bookingLink ? (
                    <a
                      href={poi.bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300"
                    >
                      <span>Official Booking</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : poi.category === "transit" && poi.transitLink ? (
                    <a
                      href={poi.transitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300"
                    >
                      <span>Live Status</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : poi.slug ? (
                    <Link
                      href={`/destinations/${poi.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300"
                    >
                      <span>Explore</span>
                      <ExternalLink size={12} />
                    </Link>
                  ) : (
                    <Link
                      href="/planner"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300"
                    >
                      <span>Plan Trip</span>
                      <ExternalLink size={12} />
                    </Link>
                  )}
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
