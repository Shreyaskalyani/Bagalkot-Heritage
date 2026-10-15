import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import ImageReveal from "@/components/cinematic/ImageReveal";

export const metadata = {
  title: "Stories",
  description:
    "Documentary-style stories from the Bagalkot heritage corridor — the caves of Badami, the temples of Pattadakal and the experimental city of Aihole.",
};

const FEATURED = {
  id: "caves-of-badami",
  title: "The Caves of Badami",
  kicker: "Featured story",
  excerpt:
    "Above Agastya Lake, a soft red cliff held an empire's ambition. In the sixth century the Early Chalukyas began subtracting temples from the living rock — verandas, halls and shrines carved in a single gesture, Hindu and Jain faiths sharing one face of stone. This is where the valley's story begins: not with building up, but with cutting in.",
  href: "/destinations/badami-cave-temples",
  image: "/images/badami-caves.jpg",
  alt: "The rock-cut caves above Agastya Lake, Badami",
};

const STORIES = [
  {
    id: "temples-became-architecture",
    title: "How Temples Became Architecture",
    excerpt:
      "Timber grammar in stone: the Lad Khan Temple and the long translation of wooden construction into masonry.",
    href: "/heritage",
    image: "/images/lad-khan-temple.jpg",
    alt: "The imitation-timber pillars of the Lad Khan Temple, Aihole",
  },
  {
    id: "story-of-pattadakal",
    title: "The Story of Pattadakal",
    excerpt:
      "Two queens, two sisters, two temples — and a coronation city where North and South built side by side.",
    href: "/destinations/pattadakal-group-of-monuments",
    image: "/images/pattadakal-group.jpg",
    alt: "The temple group of Pattadakal",
  },
  {
    id: "aihole-experimental-city",
    title: "Aihole — The Experimental City",
    excerpt:
      "Over a hundred temples, no two alike. A village that functioned as an open workshop for the temple form.",
    href: "/destinations/aihole",
    image: "/images/aihole-temples.jpg",
    alt: "The temples of Aihole, the experimental city of the Chalukyas",
  },
  {
    id: "stone-sculpture-memory",
    title: "Stone, Sculpture and Memory",
    excerpt:
      "The narrative friezes of Virupaksha — epics carved to be walked, read clockwise by pilgrims a thousand years ago.",
    href: "/destinations/virupaksha-temple-pattadakal",
    image: "/images/pattadakal-galaganatha.jpg",
    alt: "Carved reliefs at the Galaganatha Temple, Pattadakal",
  },
];

export default function StoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="Stories from stone"
        title="The valley, told in chapters."
        lead="Editorial narratives drawn from the monument records on this site."
        className="mb-16"
      />

      {/* Featured */}
      <article id={FEATURED.id} className="group relative scroll-mt-32 overflow-hidden rounded-3xl">
        <ImageReveal
          src={FEATURED.image}
          alt={FEATURED.alt}
          className="aspect-[16/10] md:aspect-[21/9]"
        >
          <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-400">
              {FEATURED.kicker}
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-light leading-tight text-ivory md:text-6xl">
              {FEATURED.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-200 md:text-base">
              {FEATURED.excerpt}
            </p>
            <Link
              href={FEATURED.href}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-950 transition-colors hover:bg-gold-400"
            >
              Read the story
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </ImageReveal>
      </article>

      {/* Other stories */}
      <div className="mt-20 grid gap-10 md:grid-cols-2">
        {STORIES.map((s, i) => (
          <article key={s.id} id={s.id} className="group scroll-mt-32">
            <Link href={s.href} className="block">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  style={{ backgroundImage: `url(${s.image})` }}
                  role="img"
                  aria-label={s.alt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 to-transparent" aria-hidden="true" />
                <span className="absolute left-4 top-4 font-mono text-xs tracking-[0.3em] text-gold-400">
                  {String(i + 2).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-3xl leading-tight text-ivory transition-colors group-hover:text-gold-300">
                {s.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-400">
                {s.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                Continue
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}