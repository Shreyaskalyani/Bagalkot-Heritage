import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import Timeline from "@/components/cinematic/Timeline";
import ParallaxImage from "@/components/cinematic/ParallaxImage";

export const metadata = {
  title: "Heritage",
  description:
    "The heritage of Bagalkot — the Chalukyan timeline, the architecture of the Malaprabha valley, and the culture that continues around it.",
};

const MILESTONES = [
  {
    id: "chalukyas",
    period: "6th–8th century CE",
    title: "The Chalukyas of Badami",
    text: "A dynasty rises at Vatapi — modern Badami — and carves its imagination into the red sandstone cliffs above Agastya Lake.",
    slug: "badami-cave-temples",
  },
  {
    id: "meguti",
    period: "634 CE",
    title: "The Meguti Inscription",
    text: "A dated inscription at Aihole fixes the chronology of the whole corridor — one of the most important documents of early Indian history.",
    slug: "meguti-jain-temple",
  },
  {
    id: "pattadakal",
    period: "c. 740 CE",
    title: "Pattadakal, the royal centre",
    text: "Coronations are held beside the Malaprabha. Queens commission twin temples — Virupaksha and Mallikarjuna — in the mature Dravida style.",
    slug: "virupaksha-temple-pattadakal",
  },
  {
    id: "unesco",
    period: "1987",
    title: "UNESCO World Heritage",
    text: "The Group of Monuments at Pattadakal is inscribed for preserving North and South Indian temple traditions in a single compound.",
    slug: "pattadakal-group-of-monuments",
  },
  {
    id: "today",
    period: "Today",
    title: "A living valley",
    text: "The monuments are protected by the ASI, pilgrimages continue at Banashankari and Mahakuta, and stone-carving trades carry the tradition on.",
  },
];

const FEATURES = [
  {
    id: "rock-cut",
    label: "Rock-Cut",
    text: "The earliest grand gesture: entire temples subtracted from living cliff. Badami's caves preserve the plan of timber halls translated into stone.",
    image: "/images/badami-caves.jpg",
    alt: "The rock-cut cave temples of Badami in red sandstone",
  },
  {
    id: "temple",
    label: "Temple",
    text: "From cave to built form: sanctum, hall and tower assembled in cut stone. Pattadakal holds both the northern and southern canon side by side.",
    image: "/images/pattadakal-group.jpg",
    alt: "The temple compounds of Pattadakal on the Malaprabha",
  },
  {
    id: "sculpture",
    label: "Sculpture",
    text: "Walls become narrative. Epics are carved in frieze and panel — Vishnu, Shiva, Devi — read clockwise by walking the outer walls.",
    image: "/images/pattadakal-galaganatha.jpg",
    alt: "Sculptured shrine towers of the Galaganatha Temple, Pattadakal",
  },
  {
    id: "pillars",
    label: "Pillars",
    text: "The Chalukyan pillar is structural and sculptural at once: robust shafts, bracket capitals, and halls that feel like carved forests.",
    image: "/images/lad-khan-temple.jpg",
    alt: "The timber-inspired pillars of the Lad Khan Temple, Aihole",
  },
  {
    id: "gateways",
    label: "Gateways",
    text: "Monumental entrances frame the threshold between town and sacred ground — the gopura of Virupaksha among the finest of its age.",
    image: "/images/virupaksha-temple.jpg",
    alt: "The gopura and tower of the Virupaksha Temple, Pattadakal",
  },
  {
    id: "carvings",
    label: "Carvings",
    text: "Lattice windows, mithuna figures, ornamented niches — Aihole's experimental shrines test every idea the workshops would later perfect.",
    image: "/images/durga-temple-aihole.jpg",
    alt: "The lattice-window ambulatory of the Durga Temple, Aihole",
  },
];

export default function HeritagePage() {
  return (
    <div>
      {/* Opener */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <ParallaxImage
          src="/images/aihole-temples.jpg"
          alt="The ancient temples of Aihole in the Malaprabha valley"
          className="absolute inset-0"
          speed={0.15}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-charcoal-950/60"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">
            Twelve centuries in one valley
          </p>
          <h1 className="mt-4 font-display text-[16vw] font-light leading-[0.9] text-ivory md:text-[9vw]">
            HERITAGE
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-300">
            From rock-cut caves to UNESCO-listed temple cities — the story of
            how a dynasty learned to build in stone, and never stopped.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28" aria-label="Heritage timeline">
        <SectionHeading
          eyebrow="Timeline"
          title="From Vatapi to today."
          lead="Only well-attested periods and dates are shown. Verify details locally before travel."
          className="mb-16"
        />
        <Timeline milestones={MILESTONES} />
      </section>

      {/* Architecture — editorial alternating rows */}
      <section className="border-t border-gold-500/10 bg-charcoal-900/30">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <SectionHeading
            eyebrow="Architecture"
            title="The grammar of stone."
            lead="Six elements that define the Chalukyan idiom — each one visible somewhere in Bagalkot today."
            className="mb-16"
          />

          <div className="space-y-20 md:space-y-28">
            {FEATURES.map((f, i) => (
              <article
                key={f.id}
                className={`grid items-center gap-8 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <ParallaxImage
                  src={f.image}
                  alt={f.alt}
                  className="aspect-[4/3] rounded-2xl"
                  speed={0.12}
                />
                <div>
                  <p className="font-mono text-xs tracking-[0.3em] text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-5xl font-light leading-none text-ivory md:text-7xl">
                    {f.label.toUpperCase()}
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-stone-400 md:text-base">
                    {f.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Culture strip */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Living culture"
          title="The valley still breathes."
          lead="Heritage here is not frozen. Pilgrimage, food and craft continue in the shadow of the monuments."
          className="mb-12"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Pilgrimage", text: "Banashankari's fair and Mahakuta's spring rituals continue centuries-old practice." },
            { title: "Food", text: "Jowar roti, yenne badnekayi and kalangi usal — the everyday kitchen of North Karnataka." },
            { title: "Craft", text: "Stone-carving families still work in the towns, repairing and continuing the Chalukyan line." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-stone-400/15 p-7">
              <h3 className="font-display text-2xl text-ivory">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-950 transition-colors hover:bg-gold-400"
          >
            Read the stories
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-300 transition-colors hover:border-gold-400"
          >
            All destinations
          </Link>
        </div>
      </section>
    </div>
  );
}