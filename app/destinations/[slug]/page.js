import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Landmark,
  Lightbulb,
  MapPin,
  MessageCircle,
  Sun,
  Ticket,
  Car,
  Compass,
  Hotel,
  ArrowRight,
  Route,
} from "lucide-react";

import { monuments, getMonumentBySlug, getNearbyMonuments } from "@/data/monuments";
import ParallaxImage from "@/components/cinematic/ParallaxImage";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationCard from "@/components/tourism/DestinationCard";
import DetailMap from "@/components/map/DetailMap";
import MagneticButton from "@/components/ui/MagneticButton";
import GlassPanel from "@/components/ui/GlassPanel";
import BadamiCavesExplorer from "@/components/destinations/BadamiCavesExplorer";

export function generateStaticParams() {
  return monuments.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }) {
  const m = getMonumentBySlug(params.slug);
  if (!m) return { title: "Monument not found" };
  return {
    title: `${m.name} — ${m.location}, Bagalkot`,
    description: m.shortDescription,
    openGraph: {
      title: `${m.name} | Bagalkot Heritage Tourism`,
      description: m.shortDescription,
      images: m.images?.[0]?.url ? [m.images[0].url] : undefined,
    },
  };
}

function getTransitLogistics(location = "") {
  const loc = (location || "").toLowerCase();
  if (loc.includes("mahakuta")) {
    return {
      distBadami: "14 km east of Badami via Banashankari road",
      driveTime: "~25 mins drive by auto/cab (~₹250)",
      circuit: "Featured in The Golden Chalukyan Triangle & 2-Day UNESCO Classic",
      recommendedStay: "Stay in Badami (14 km away) — KSTDC Hotel Mayura Chalukya",
    };
  }
  if (loc.includes("shivayoga") || loc.includes("badami-pattadakal")) {
    return {
      distBadami: "12 km east of Badami on SH-14 (10 km west of Pattadakal)",
      driveTime: "~15 mins drive along Malaprabha river corridor",
      circuit: "Featured in 1-Day Express & Malaprabha River Spiritual Route",
      recommendedStay: "Stay in Badami (12 km away) or KSTDC Mayura",
    };
  }
  if (loc.includes("banashankari")) {
    return {
      distBadami: "5 km south of Badami on Gadag highway",
      driveTime: "~10 mins drive by shared auto (₹20) or private auto (₹80)",
      circuit: "Featured in 1-Day Express & 2-Day UNESCO Classic",
      recommendedStay: "Stay in Badami (5 km away)",
    };
  }
  if (loc.includes("pattadakal")) {
    return {
      distBadami: "22 km east of Badami via SH-14",
      driveTime: "~30 mins drive by cab or bus (NWKRTC bus: ₹30, auto: ₹400)",
      circuit: "Featured in 1-Day Express & 2-Day UNESCO Classic",
      recommendedStay: "Stay in Badami (22 km) or KSTDC Mayura",
    };
  }
  if (loc.includes("aihole")) {
    return {
      distBadami: "35 km northeast of Badami via Pattadakal",
      driveTime: "~45 mins drive (15 mins from Pattadakal)",
      circuit: "Featured in 1-Day Express (afternoon) & 2-Day UNESCO (Day 2)",
      recommendedStay: "Day trip from Badami (or KSTDC Yatri Nivas Aihole)",
    };
  }
  if (loc.includes("badami")) {
    return {
      distBadami: "4 km from Badami Railway Station (BDM)",
      driveTime: "10 mins by auto or taxi (~₹60 - ₹80)",
      circuit: "Featured in 1-Day Express, 2-Day UNESCO & 3-Day Grand Valley",
      recommendedStay: "KSTDC Hotel Mayura Chalukya or Badami Court",
    };
  }
  return {
    distBadami: "Located within the Bagalkot heritage network",
    driveTime: "Easily accessible by cab from Badami or Bagalkot city",
    circuit: "Featured in the 3-Day Grand Valley & Confluence Circuit",
    recommendedStay: "Stay in Badami or Bagalkot town",
  };
}

export default function MonumentDetailPage({ params }) {
  const monument = getMonumentBySlug(params.slug);
  if (!monument) notFound();

  const nearby = getNearbyMonuments(monument.slug);
  const hero = monument.images?.[0];
  const transitLogistics = getTransitLogistics(monument.location);

  const visitRows = [
    { icon: Clock, label: "Hours", value: monument.visitingInformation?.hours },
    { icon: Ticket, label: "Entry", value: monument.visitingInformation?.entry },
    { icon: Sun, label: "Best time", value: monument.visitingInformation?.bestTime },
  ].filter((r) => r.value);

  return (
    <article>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[85svh] items-end overflow-hidden">
        {hero ? (
          <ParallaxImage
            src={hero.url}
            alt={hero.alt}
            className="absolute inset-0 h-full"
            speed={0.3}
          />
        ) : (
          <div className="absolute inset-0 bg-charcoal-900" aria-hidden="true" />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/45 to-charcoal-950/70"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <p className="font-mono text-xs tracking-[0.4em] text-gold-500">
            {monument.category}
          </p>
          <h1 className="mt-4 font-display text-5xl font-light leading-[0.95] text-ivory md:text-7xl lg:text-8xl">
            {monument.name}
          </h1>
          {monument.localName && (
            <p className="mt-4 font-display text-xl text-stone-300 md:text-2xl">
              {monument.localName}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-400">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gold-500" aria-hidden="true" />
              {monument.location}, Bagalkot
            </span>
            <span className="flex items-center gap-1.5">
              <Landmark size={14} className="text-gold-500" aria-hidden="true" />
              {monument.period}
            </span>
            <span>{monument.dynasty}</span>
          </div>

          {/* CTA Cluster including View 360° */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/360-heritage?place=${monument.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(181,137,56,0.35)]"
            >
              <Compass size={14} aria-hidden="true" />
              <span>VIEW 360°</span>
            </Link>

            <Link
              href={`/map?monument=${monument.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-charcoal-950/80 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ivory transition-colors hover:border-gold-500 backdrop-blur-md"
            >
              <MapPin size={14} className="text-gold-500" aria-hidden="true" />
              <span>Locate on Map</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Story ---------- */}
      <section className="py-20 md:py-28" aria-label="Story">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="The story" title="Written into history" />
          <div className="space-y-6 text-base leading-relaxed text-stone-300 md:text-lg">
            <p className="font-display text-2xl leading-snug text-ivory md:text-3xl">
              {monument.shortDescription}
            </p>
            <p>{monument.history}</p>
          </div>
        </div>
      </section>

      {/* ---------- Architecture ---------- */}
      <section
        className="bg-charcoal-900/40 py-20 md:py-28"
        aria-label="Architecture"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Architecture" title="How it was built" />
          <p className="text-base leading-relaxed text-stone-300 md:text-lg">
            {monument.architecture}
          </p>
        </div>
      </section>

      {/* ---------- Why it matters ---------- */}
      <section className="py-20 md:py-28" aria-label="Why it matters">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Significance" title="Why it matters" />
          <p className="text-base leading-relaxed text-stone-300 md:text-lg">
            {monument.significance}
          </p>
        </div>
      </section>

      {/* ---------- What to see + visiting info ---------- */}
      <section
        className="bg-charcoal-900/40 py-20 md:py-28"
        aria-label="What to see and visiting information"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-500">
              What to see
            </p>
            <ul className="mt-6 space-y-3">
              {(monument.detectedFeatures || []).map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 rounded-xl border border-stone-400/15 bg-charcoal-950/40 px-5 py-4 text-sm text-stone-200"
                >
                  <span
                    className="block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                    aria-hidden="true"
                  />
                  {f}
                </li>
              ))}
            </ul>
            {monument.visitingInformation?.tips && (
              <p className="mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-stone-400">
                <Lightbulb size={15} className="mt-0.5 shrink-0 text-gold-500" aria-hidden="true" />
                {monument.visitingInformation.tips}
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-500">
              Visiting information
            </p>
            <dl className="mt-6 divide-y divide-stone-400/10">
              {visitRows.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4 py-4">
                  <Icon size={16} className="mt-1 shrink-0 text-gold-500" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-stone-300">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-stone-500">
              Hours and fees change without notice — verify locally before
              travelling.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Badami 8 Caves Explorer (for Badami Cave Temples) ---------- */}
      {monument.slug === "badami-cave-temples" && (
        <section className="border-t border-stone-800 bg-charcoal-900/40 py-20 md:py-24" aria-label="8 Caves of Badami">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <BadamiCavesExplorer />
          </div>
        </section>
      )}

      {/* ---------- 360 Sanctuary Virtual Immersion Banner ---------- */}
      <section className="border-y border-gold-500/20 bg-charcoal-900/60 py-12" aria-label="360 View Sanctuary">
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500">
              Virtual 360° Immersion
            </span>
            <h2 className="mt-1 font-display text-2xl md:text-3xl text-ivory">
              Stand inside {monument.name.split(",")[0]} in 360°
            </h2>
            <p className="mt-1 text-xs md:text-sm text-stone-300">
              Spherical panoramic horizontal rotation, vertical look, zoom, and architectural hotspot analysis.
            </p>
          </div>
          <Link
            href={`/360-heritage?place=${monument.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(181,137,56,0.4)]"
          >
            <Compass size={15} />
            <span>Launch 360° Experience</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ---------- Map ---------- */}
      <section className="py-20 md:py-28" aria-label="Location on map">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Find it"
            title="On the map"
            lead={`Coordinates ${monument.latitude}, ${monument.longitude} — in the Malaprabha valley heritage corridor.`}
          />
          <div className="mt-10">
            <DetailMap monument={monument} />
          </div>
          <Link
            href={`/map?monument=${monument.slug}`}
            className="link-underline mt-6 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold-400"
          >
            Open the full heritage map →
          </Link>
        </div>
      </section>

      {/* ---------- Trip Planning & Logistics ---------- */}
      <section className="border-t border-stone-400/10 bg-charcoal-900/60 py-20 md:py-28" aria-label="Trip planning and logistics">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Plan your trip"
            title="Logistics & circuits"
            lead={`How to reach ${monument.name.split(",")[0]}, travel distances, and recommended itineraries.`}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <GlassPanel className="p-7">
              <div className="flex items-center gap-3 text-gold-400">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10">
                  <Car size={18} aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg text-ivory">Transit & Distance</h3>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-500">
                {transitLogistics.distBadami}
              </p>
              <p className="mt-2 text-sm text-stone-300">
                {transitLogistics.driveTime}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-stone-400">
                Local autos and private tourist cabs are readily hired at Badami Bus Stand and Railway Station.
              </p>
            </GlassPanel>

            <GlassPanel className="p-7">
              <div className="flex items-center gap-3 text-gold-400">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10">
                  <Route size={18} aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg text-ivory">Recommended Circuit</h3>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-500">
                Curated Route
              </p>
              <p className="mt-2 text-sm text-stone-300">
                {transitLogistics.circuit}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-stone-400">
                Combine with neighboring sites for the most efficient travel sequence without backtrack driving.
              </p>
            </GlassPanel>

            <GlassPanel className="p-7">
              <div className="flex items-center gap-3 text-gold-400">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10">
                  <Hotel size={18} aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg text-ivory">Where to Stay</h3>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-500">
                Hub Hotel Base
              </p>
              <p className="mt-2 text-sm text-stone-300">
                {transitLogistics.recommendedStay}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-stone-400">
                Badami is the primary accommodation hub with KSTDC properties, heritage resorts, and regional restaurants.
              </p>
            </GlassPanel>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold-500/25 bg-gradient-to-r from-gold-500/10 to-charcoal-900/80 p-6">
            <div>
              <p className="font-display text-xl text-ivory">
                Build a complete itinerary including {monument.name.split(",")[0]}
              </p>
              <p className="mt-1 text-xs text-stone-400">
                Access curated multi-day circuits, custom AI planning, hotel directory, and transit rates.
              </p>
            </div>
            <Link
              href="/planner"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(181,137,56,0.35)]"
            >
              <Compass size={14} aria-hidden="true" />
              Open Trip Planner
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Nearby ---------- */}
      {nearby.length > 0 && (
        <section
          className="bg-charcoal-900/40 py-20 md:py-28"
          aria-label="Nearby monuments"
        >
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHeading
              eyebrow="Keep exploring"
              title="Nearby"
              lead="Short drives from here — the whole corridor fits in a day or two."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.slice(0, 3).map((m, i) => (
                <DestinationCard key={m.slug} monument={m} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Ask the AI ---------- */}
      <section className="py-20 text-center md:py-28" aria-label="Ask the heritage AI">
        <div className="mx-auto max-w-2xl px-5">
          <MessageCircle size={26} className="mx-auto text-gold-500" aria-hidden="true" />
          <h2 className="mt-6 font-display text-4xl font-light text-ivory md:text-5xl">
            Have a question about{" "}
            <span className="text-gold-400">{monument.name.split(",")[0]}</span>?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-400">
            The Heritage Guide answers from monument records — history,
            architecture, and what to look for on site.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton href="/guide">Ask Heritage Guide</MagneticButton>
          </div>
        </div>
      </section>
    </article>
  );
}