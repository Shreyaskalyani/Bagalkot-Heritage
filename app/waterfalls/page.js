import WaterfallsExplorer from "@/components/waterfalls/WaterfallsExplorer";

export const metadata = {
  title: "Waterfalls & River Cascades | Bagalkot Heritage AI",
  description:
    "Discover the 11 magnificent seasonal waterfalls, hidden canyon gorges, and river rapids across all 9 taluks of Bagalkot district including Akka-Tangi Falls, Didaga Falls, and Ramathirtha.",
};

export default function WaterfallsPage() {
  return (
    <main className="min-h-screen bg-charcoal-950 text-ivory pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <WaterfallsExplorer />
      </div>
    </main>
  );
}
