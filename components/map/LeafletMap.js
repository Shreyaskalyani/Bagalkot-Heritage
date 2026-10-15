"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Helper to escape HTML in Leaflet popups
function escapeHtml(str = "") {
  return String(str).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

// Category color palette for markers
const CATEGORY_STYLES = {
  monument: { color: "#c79a45", shadow: "rgba(199,154,69,0.9)", symbol: "🏛️" },
  hotel: { color: "#10b981", shadow: "rgba(16,185,129,0.9)", symbol: "🏨" },
  food: { color: "#f97316", shadow: "rgba(249,115,22,0.9)", symbol: "🍽️" },
  transit: { color: "#0284c7", shadow: "rgba(2,132,199,0.9)", symbol: "🚆" },
  handloom: { color: "#a855f7", shadow: "rgba(168,85,247,0.9)", symbol: "🧵" },
  safety: { color: "#e11d48", shadow: "rgba(225,29,72,0.9)", symbol: "🛡️" },
};

function createMarkerIcon(category = "monument") {
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.monument;
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;">
        <span style="display:block;height:18px;width:18px;border-radius:9999px;background:${style.color};box-shadow:0 0 16px ${style.shadow};border:2px solid #171512;"></span>
        <span style="position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;border-radius:9999px;border:1px solid rgba(255,255,255,0.4);pointer-events:none;"></span>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function createWaypointIcon(number, color = "#c79a45") {
  return L.divIcon({
    className: "custom-route-waypoint",
    html: `
      <div style="display:flex;align-items:center;justify-content:center;height:24px;width:24px;border-radius:9999px;background:${color};color:#000;font-weight:900;font-size:11px;font-family:monospace;box-shadow:0 0 16px ${color};border:2px solid #fff;cursor:pointer;">
        ${number}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

const TILE_LAYERS = {
  dark: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
      maxZoom: 19,
      className: "dark-mode-tiles",
    },
  },
  satellite: {
    url: "https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    options: {
      attribution: '&copy; Google Maps',
      subdomains: ["0", "1", "2", "3"],
      maxZoom: 20,
    },
  },
  street: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
      maxZoom: 19,
    },
  },
};

export default function LeafletMap({
  monuments = [],
  pois = [],
  activeCategory = "all",
  activeRoute = null,
  baseLayer = "dark",
  focusSlug = null,
  selectedPoi = null,
  onSelectPoi,
  height = "100%",
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const currentTileRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routePolylineRef = useRef(null);
  const waypointMarkersRef = useRef(null);
  const markersMapRef = useRef({});

  // Normalize input data
  const normalizedPois = (pois.length > 0 ? pois : monuments).map((item) => {
    return {
      id: item.id || item.slug,
      slug: item.slug || item.id,
      name: item.name,
      category: item.category || "monument",
      categoryLabel: item.categoryLabel || item.category || "Heritage Monument",
      lat: item.lat || item.latitude,
      lng: item.lng || item.longitude,
      location: item.location || "Badami",
      image: item.image || item.images?.[0]?.url || "/images/badami-caves.jpg",
      hours: item.hours || item.visitingInformation?.hours || "6:00 AM – 6:00 PM",
      ticket: item.ticket || item.visitingInformation?.entry || "Standard Entry",
      priceRange: item.priceRange,
      distBadamiStation: item.distBadamiStation || "In Heritage Corridor",
      description: item.shortDescription || item.description || "",
      phone: item.phone,
    };
  });

  // 1. Initialize Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initialCenter =
      normalizedPois.length === 1
        ? [normalizedPois[0].lat, normalizedPois[0].lng]
        : [15.98, 75.82];
    const initialZoom = normalizedPois.length === 1 ? 14 : 10;

    const map = L.map(containerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      scrollWheelZoom: false,
      attributionControl: true,
    });
    mapRef.current = map;

    // Base Tile Layer
    const layerConfig = TILE_LAYERS[baseLayer] || TILE_LAYERS.dark;
    const tileLayer = L.tileLayer(layerConfig.url, layerConfig.options).addTo(map);
    currentTileRef.current = tileLayer;

    // Feature group layers for markers and routes
    markersLayerRef.current = L.layerGroup().addTo(map);
    routePolylineRef.current = L.layerGroup().addTo(map);
    waypointMarkersRef.current = L.layerGroup().addTo(map);

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapRef.current = null;
      markersMapRef.current = {};
    };
  }, []);

  // 2. Handle Base Layer change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (currentTileRef.current) {
      map.removeLayer(currentTileRef.current);
    }
    const layerConfig = TILE_LAYERS[baseLayer] || TILE_LAYERS.dark;
    currentTileRef.current = L.tileLayer(layerConfig.url, layerConfig.options).addTo(map);
  }, [baseLayer]);

  // 3. Render Markers based on Category Filter
  useEffect(() => {
    const map = mapRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    markersMapRef.current = {};

    const filtered =
      activeCategory === "all"
        ? normalizedPois
        : normalizedPois.filter((p) => p.category === activeCategory);

    filtered.forEach((p) => {
      if (!p.lat || !p.lng) return;

      const icon = createMarkerIcon(p.category);
      const marker = L.marker([p.lat, p.lng], { icon }).addTo(layer);

      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;
      const destinationLink = p.slug ? `/destinations/${encodeURIComponent(p.slug)}` : `/planner`;

      marker.bindPopup(
        `
        <div style="min-width:220px;padding:4px 2px;font-family:system-ui,sans-serif;">
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#c79a45;font-weight:700;">${escapeHtml(p.categoryLabel)}</span>
          <h4 style="font-size:15px;margin:4px 0 2px;color:#f8f5ee;font-weight:600;">${escapeHtml(p.name)}</h4>
          <p style="color:#b0a79b;font-size:12px;margin:2px 0 4px;">📍 ${escapeHtml(p.location)}</p>
          <p style="color:#ddd2bf;font-size:11px;margin:0 0 6px;">⏱️ ${escapeHtml(p.hours || p.priceRange || "")}</p>
          <div style="display:flex;gap:8px;border-top:1px solid rgba(199,154,69,0.25);padding-top:8px;margin-top:6px;">
            <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="color:#10b981;font-size:11px;font-weight:700;text-decoration:none;">
              🚗 Directions &rarr;
            </a>
            <a href="${destinationLink}" style="color:#c79a45;font-size:11px;font-weight:700;text-decoration:none;margin-left:auto;">
              Details &rarr;
            </a>
          </div>
        </div>
      `,
        { closeButton: true, className: "custom-heritage-popup" }
      );

      marker.on("click", () => {
        if (onSelectPoi) onSelectPoi(p);
      });

      markersMapRef.current[p.id || p.slug] = marker;
      if (p.slug) markersMapRef.current[p.slug] = marker;
    });
  }, [normalizedPois, activeCategory, onSelectPoi]);

  // 4. Render Curated Circuit Polyline & Numbered Waypoints
  useEffect(() => {
    const map = mapRef.current;
    const polyGroup = routePolylineRef.current;
    const wayGroup = waypointMarkersRef.current;
    if (!map || !polyGroup || !wayGroup) return;

    polyGroup.clearLayers();
    wayGroup.clearLayers();

    if (!activeRoute) return;

    // Draw route polyline with neon glow
    const polyline = L.polyline(activeRoute.pathCoordinates, {
      color: activeRoute.color || "#c79a45",
      weight: 5,
      opacity: 0.9,
      lineCap: "round",
      lineJoin: "round",
      dashArray: "10, 6",
    }).addTo(polyGroup);

    // Numbered waypoint stop markers
    activeRoute.waypoints.forEach((wp, index) => {
      const icon = createWaypointIcon(index + 1, activeRoute.color);
      const marker = L.marker(wp.coords, { icon, zIndexOffset: 1000 }).addTo(wayGroup);
      marker.bindPopup(
        `
        <div style="min-width:180px;padding:4px 2px;font-family:system-ui,sans-serif;">
          <span style="font-size:10px;text-transform:uppercase;color:#c79a45;font-weight:700;">Stop ${index + 1} of ${activeRoute.waypoints.length}</span>
          <h4 style="font-size:14px;margin:3px 0 2px;color:#f8f5ee;font-weight:600;">${escapeHtml(wp.name)}</h4>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${wp.coords[0]},${wp.coords[1]}" target="_blank" rel="noopener noreferrer" style="color:#10b981;font-size:11px;font-weight:700;text-decoration:none;display:block;margin-top:4px;">
            🚗 Drive Here &rarr;
          </a>
        </div>
      `,
        { closeButton: true, className: "custom-heritage-popup" }
      );
    });

    // Auto-fit to route bounds
    try {
      map.fitBounds(polyline.getBounds(), { padding: [40, 40], maxZoom: 13 });
    } catch {
      // ignore
    }
  }, [activeRoute]);

  // 5. Handle focusSlug or selectedPoi selection
  useEffect(() => {
    const map = mapRef.current;
    const targetKey = focusSlug || selectedPoi?.slug || selectedPoi?.id;
    if (!targetKey || !map) return;

    const marker = markersMapRef.current[targetKey];
    const targetPoi = normalizedPois.find(
      (item) => item.slug === targetKey || item.id === targetKey
    );

    if (targetPoi && marker) {
      map.flyTo([targetPoi.lat, targetPoi.lng], 14, { duration: 1.2 });
      marker.openPopup();
    }
  }, [focusSlug, selectedPoi, normalizedPois]);

  return <div ref={containerRef} style={{ height, width: "100%" }} />;
}
