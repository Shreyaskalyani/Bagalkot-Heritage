"use client";

import { useEffect, useMemo, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
  useApiLoadingStatus,
} from "@vis.gl/react-google-maps";
import { Compass, ExternalLink, Navigation, AlertCircle } from "lucide-react";
import Link from "next/link";

const CATEGORY_STYLES = {
  monument: { color: "#c79a45", shadow: "rgba(199,154,69,0.9)", symbol: "🏛️", label: "Monument" },
  hotel: { color: "#10b981", shadow: "rgba(16,185,129,0.9)", symbol: "🏨", label: "Stay" },
  food: { color: "#f97316", shadow: "rgba(249,115,22,0.9)", symbol: "🍽️", label: "Dining" },
  transit: { color: "#0284c7", shadow: "rgba(2,132,199,0.9)", symbol: "🚆", label: "Transit" },
  handloom: { color: "#a855f7", shadow: "rgba(168,85,247,0.9)", symbol: "🧵", label: "Craft" },
  safety: { color: "#e11d48", shadow: "rgba(225,29,72,0.9)", symbol: "🛡️", label: "Safety" },
};

// Sub-component to monitor API loading state and report failures
function ApiStatusWatcher({ onStatusChange }) {
  const status = useApiLoadingStatus();
  useEffect(() => {
    if (status) {
      onStatusChange?.(status);
    }
  }, [status, onStatusChange]);
  return null;
}

// Sub-component to manage map camera & routes with Google Maps instance
function MapController({ selectedPoi, focusSlug, activeRoute, pois }) {
  const map = useMap();

  // Pan to selected POI
  useEffect(() => {
    if (!map) return;
    if (selectedPoi && typeof selectedPoi.lat === "number" && typeof selectedPoi.lng === "number") {
      map.panTo({ lat: selectedPoi.lat, lng: selectedPoi.lng });
      if (map.getZoom() < 13) {
        map.setZoom(14);
      }
    }
  }, [map, selectedPoi]);

  // Handle focus slug
  useEffect(() => {
    if (!map || !focusSlug) return;
    const match = pois.find((p) => p.slug === focusSlug || p.id === focusSlug);
    if (match) {
      map.panTo({ lat: match.lat, lng: match.lng });
      map.setZoom(15);
    }
  }, [map, focusSlug, pois]);

  // Draw active route polyline using Google Maps Polyline
  useEffect(() => {
    if (!map || typeof window === "undefined" || !window.google?.maps) return;

    if (!activeRoute?.polyline || activeRoute.polyline.length === 0) {
      return;
    }

    const path = activeRoute.polyline.map(([lat, lng]) => ({ lat, lng }));
    const polyline = new window.google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#c79a45",
      strokeOpacity: 0.9,
      strokeWeight: 4,
      map,
    });

    // Fit bounds to the route
    const bounds = new window.google.maps.LatLngBounds();
    path.forEach((pt) => bounds.extend(pt));
    map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });

    return () => {
      polyline.setMap(null);
    };
  }, [map, activeRoute]);

  return null;
}

export default function GoogleMapComponent({
  apiKey,
  monuments = [],
  pois = [],
  activeCategory = "all",
  activeRoute = null,
  baseLayer = "dark",
  focusSlug = null,
  selectedPoi = null,
  onSelectPoi,
  onFallbackToOsm,
  height = "100%",
}) {
  const [infoWindowPoi, setInfoWindowPoi] = useState(null);
  const [apiStatus, setApiStatus] = useState("LOADING");

  // Normalize POIs
  const normalizedPois = useMemo(() => {
    const list = pois.length > 0 ? pois : monuments;
    return list.map((item) => {
      const lat =
        item.coordinates?.lat ??
        (Array.isArray(item.coordinates) ? item.coordinates[0] : item.lat);
      const lng =
        item.coordinates?.lng ??
        (Array.isArray(item.coordinates) ? item.coordinates[1] : item.lng);

      return {
        ...item,
        lat,
        lng,
        category: item.category || "monument",
      };
    }).filter((p) => typeof p.lat === "number" && typeof p.lng === "number");
  }, [monuments, pois]);

  // Filtered POIs
  const visiblePois = useMemo(() => {
    if (activeCategory === "all") return normalizedPois;
    return normalizedPois.filter((p) => p.category === activeCategory);
  }, [normalizedPois, activeCategory]);

  // Center of Chalukyan valley (Badami)
  const defaultCenter = { lat: 15.918, lng: 75.682 };

  // Map type based on layer selection
  const mapTypeId = baseLayer === "satellite" ? "hybrid" : "roadmap";

  return (
    <div className="relative h-full w-full overflow-hidden bg-charcoal-900" style={{ height }}>
      <APIProvider apiKey={apiKey}>
        <ApiStatusWatcher onStatusChange={setApiStatus} />
        
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={defaultCenter}
          defaultZoom={11}
          mapId="DEMO_MAP_ID"
          mapTypeId={mapTypeId}
          colorScheme={baseLayer === "dark" ? "DARK" : "LIGHT"}
          gestureHandling="greedy"
          disableDefaultUI={false}
          zoomControl={true}
          mapTypeControl={false}
          streetViewControl={true}
          fullscreenControl={true}
          internalUsageAttributionIds={["gmp_git_agentskills_v1"]}
        >
          <MapController
            selectedPoi={selectedPoi}
            focusSlug={focusSlug}
            activeRoute={activeRoute}
            pois={normalizedPois}
          />

          {visiblePois.map((poi) => {
            const isSelected = selectedPoi?.id === poi.id;
            const style = CATEGORY_STYLES[poi.category] || CATEGORY_STYLES.monument;

            return (
              <AdvancedMarker
                key={poi.id}
                position={{ lat: poi.lat, lng: poi.lng }}
                title={poi.name}
                onClick={() => {
                  onSelectPoi?.(poi);
                  setInfoWindowPoi(poi);
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transform: isSelected ? "scale(1.25)" : "scale(1)",
                    transition: "transform 0.15s ease",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: isSelected ? "24px" : "18px",
                      width: isSelected ? "24px" : "18px",
                      borderRadius: "9999px",
                      background: style.color,
                      boxShadow: `0 0 16px ${style.shadow}`,
                      border: "2px solid #171512",
                      fontSize: "10px",
                    }}
                  >
                    {isSelected && style.symbol}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      top: "-2px",
                      left: "-2px",
                      right: "-2px",
                      bottom: "-2px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(255,255,255,0.4)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </AdvancedMarker>
            );
          })}

          {infoWindowPoi && (
            <InfoWindow
              position={{ lat: infoWindowPoi.lat, lng: infoWindowPoi.lng }}
              onCloseClick={() => setInfoWindowPoi(null)}
              headerContent={
                <span className="font-semibold text-charcoal-900 text-sm">
                  {infoWindowPoi.name}
                </span>
              }
            >
              <div className="max-w-[240px] text-xs text-charcoal-800 space-y-1.5 p-1">
                <p className="line-clamp-2 text-stone-600">{infoWindowPoi.description}</p>
                <div className="flex items-center gap-2 pt-1 border-t border-stone-200">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-gold-100 text-gold-800 font-mono text-[10px]">
                    {CATEGORY_STYLES[infoWindowPoi.category]?.label || "Site"}
                  </span>
                  {infoWindowPoi.slug && (
                    <Link
                      href={`/destinations/${infoWindowPoi.slug}`}
                      className="text-gold-700 hover:text-gold-900 font-semibold inline-flex items-center gap-1 ml-auto"
                    >
                      Explore <ExternalLink size={10} />
                    </Link>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Fallback Overlay if Key has restrictions or auth issues */}
      {(apiStatus === "AUTH_FAILURE" || apiStatus === "FAILED") && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-charcoal-950/85 p-6 backdrop-blur-md">
          <div className="max-w-md rounded-2xl border border-gold-500/30 bg-charcoal-900 p-6 text-center shadow-2xl">
            <AlertCircle size={32} className="mx-auto text-gold-400" />
            <h4 className="mt-3 font-display text-xl text-ivory">Google Maps Key Notice</h4>
            <p className="mt-2 text-xs leading-relaxed text-stone-300">
              Google Maps API reports: <code className="text-gold-400">{apiStatus}</code>. Demo keys or new Google Cloud keys may require Billing enabled or domain restrictions verification in the Cloud Console.
            </p>
            {onFallbackToOsm && (
              <button
                onClick={onFallbackToOsm}
                className="mt-5 rounded-xl bg-gold-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-950 hover:bg-gold-400 transition-colors"
              >
                Switch to OpenStreetMap / Leaflet
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
