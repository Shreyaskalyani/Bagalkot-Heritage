"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-charcoal-900">
      <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
        Loading map…
      </p>
    </div>
  ),
});

const GoogleMapComponent = dynamic(() => import("./GoogleMapComponent"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-charcoal-900">
      <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
        Loading Google Maps Platform…
      </p>
    </div>
  ),
});

/**
 * Single-monument map used on destination detail pages.
 */
export default function DetailMap({ monument }) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="h-[380px] overflow-hidden rounded-2xl border border-stone-400/15">
      {googleMapsApiKey ? (
        <GoogleMapComponent
          apiKey={googleMapsApiKey}
          monuments={[monument]}
          focusSlug={monument.slug}
          selectedPoi={monument}
          baseLayer="satellite"
          height="100%"
        />
      ) : (
        <LeafletMap monuments={[monument]} focusSlug={monument.slug} height="100%" />
      )}
    </div>
  );
}