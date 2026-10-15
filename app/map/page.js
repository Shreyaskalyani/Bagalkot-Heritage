import { Suspense } from "react";
import MapExplorer from "@/components/map/MapExplorer";

export const metadata = {
  title: "Tourism GIS & Interactive Heritage Map — Bagalkot Heritage Tourism",
  description:
    "Interactive tourism navigation map for Bagalkot & the Chalukyan Valley — 23 POIs including Badami Caves, UNESCO Pattadakal, Aihole, KSTDC hotels, Jolada Rotti food trail, and driving circuit routes with turn-by-turn directions.",
};

export default function MapPage() {
  return (
    <Suspense fallback={null}>
      <MapExplorer />
    </Suspense>
  );
}