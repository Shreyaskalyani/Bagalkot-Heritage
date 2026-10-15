import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { monuments } from "@/data/monuments";
import DestinationCard from "@/components/tourism/DestinationCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ParallaxImage from "@/components/cinematic/ParallaxImage";

export const metadata = {
  title: "Explore",
  description:
    "Explore the monuments and destinations of Bagalkot district — Badami, Aihole, Pattadakal, Mahakuta and Banashankari.",
};

const CLUSTERS = [
  {
    key: "Badami",
    intro:
      "The red-sandstone capital of the early Chalukyas — cave temples, lakeside shrines and cliff faces carved across two centuries.",
    match: (m) => m.location === "Badami",
  },
  {
    key: "Banashankari",
    intro:
      "A living goddess temple beside a sacred tank at Cholachagudd — an ancient site rebuilt in the Maratha idiom.",
    match: (m) => m.location.includes("Cholachagudd"),
  },
  {
    key: "Mahakuta",
    intro:
      "A shaded grove of early shrines around natural springs — the quiet origin point of Chalukyan temple design.",
    match: (m) => m.location.includes("Mahakuta"),
  },
  {
    key: "Pattadakal",
    intro:
      "The UNESCO-listed royal centre where northern and southern temple styles were raised side by side.",
    match: (m) => m.location === "Pattadakal",
  },
  {
    key: "Aihole",
    intro:
      "Over a hundred temples scattered through a village — a laboratory of experimental temple forms.",
    match: (m) => m.location === "Aihole",
  },
  {
    key: "Krishna Valley & Confluence",
    intro:
      "Where sacred rivers meet and modern engineering towers — Kudalasangama's holy confluence and the Almatti Dam reservoir.",
    match: (m) => m.location.includes("Kudalasangama") || m.location.includes("Almatti"),
  },
];

export default function ExplorePage() {
  // Precompute clusters + card indices up-front so rendering stays pure
  // (a running counter mutated during render breaks under React strict
  // mode's double-invoke and hydration).
  // Precompute clusters + running card offsets up-front so rendering stays
  // pure (a counter mutated during render breaks under React strict mode's
  // double-invoke and hydration).
  let offset = 0;
  const clusters = CLUSTERS.map((cluster, ci) => {
    const items = monuments.filter(cluster.match);
    const entry = {
      key: cluster.key,
      intro: cluster.intro,
      index: ci,
      firstIndex: offset,
      items,
    };
    offset += items.length;
    return entry;
  }).filter((c) => c.items.length > 0);

  const totalCards = offset;
  void totalCards; // reserved for a future "N sites" counter

  return (
    <div>
      {/* Cinematic opener */}
      <section className="relative flex min-h-[62svh] items-end overflow-hidden">
        <ParallaxImage
          src="/images/badami-caves.jpg"
          alt="The sandstone cliffs above Agastya Lake, Badami"
          className="absolute inset-0"
          speed={0.15}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-charcoal-950/60"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">
            The Chalukyan heartland
          </p>
          <h1 className="mt-4 font-display text-[16vw] font-light leading-[0.9] text-ivory md:text-[9vw]">
            EXPLORE
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-300">
            Six clusters of monuments across two sacred river valleys. Every site in Bagalkot
            district sits within an accessible corridor — best travelled slowly.
          </p>
        </div>
      </section>

      {/* Cluster sections */}
      {clusters.map((cluster) => {
        return (
          <section
            key={cluster.key}
            className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24"
            aria-label={cluster.key}
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow={`Cluster ${String(cluster.index + 1).padStart(2, "0")}`}
                title={cluster.key}
                lead={cluster.intro}
              />
              <Link
                href="/map"
                className="link-underline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400"
              >
                View on map
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cluster.items.map((m, i) => (
                <DestinationCard key={m.slug} monument={m} index={cluster.firstIndex + i} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Cross-links */}
      <section className="border-t border-gold-500/10 bg-charcoal-900/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-3 md:px-8">
          {[
            { href: "/scanner", label: "AI Monument Scanner", text: "Point a photograph at stone and let the AI name it." },
            { href: "/planner", label: "Trip Planner", text: "Shape a journey around your time, interests and pace." },
            { href: "/heritage", label: "Heritage & Timeline", text: "Follow twelve centuries of building across the valley." },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-2xl border border-stone-400/15 p-7 transition-colors hover:border-gold-500/40"
            >
              <p className="font-display text-2xl text-ivory transition-colors group-hover:text-gold-300">
                {c.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">{c.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                Open
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}