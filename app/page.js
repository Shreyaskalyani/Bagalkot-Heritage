import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CinematicIntro from "@/components/cinematic/CinematicIntro";
import StoryScene from "@/components/cinematic/StoryScene";
import AITransformation from "@/components/cinematic/AITransformation";
import HorizontalStory from "@/components/cinematic/HorizontalStory";
import SmartMapTeaser from "@/components/cinematic/SmartMapTeaser";
import Timeline from "@/components/cinematic/Timeline";
import FinalCTA from "@/components/cinematic/FinalCTA";
import ParallaxImage from "@/components/cinematic/ParallaxImage";

import MonumentScanner from "@/components/ai/MonumentScanner";
import VisionHotspots from "@/components/ai/VisionHotspots";
import HeritageGuide from "@/components/ai/HeritageGuide";

import TripPlanner from "@/components/tourism/TripPlanner";
import CultureScenes from "@/components/tourism/CultureScenes";
import Gallery from "@/components/tourism/Gallery";
import EventCard from "@/components/tourism/EventCard";
import ExperienceCard from "@/components/tourism/ExperienceCard";
import LiveStatusBanner from "@/components/tourism/LiveStatusBanner";
import LiveTouristDashboard from "@/components/tourism/LiveTouristDashboard";

import ArchitectureExplorer from "@/components/tourism/ArchitectureExplorer";
import FoodCulturePreview from "@/components/cinematic/FoodCulturePreview";
import AudioGuideWidget from "@/components/cinematic/AudioGuideWidget";
import Heritage360Preview from "@/components/cinematic/Heritage360Preview";
import WaterfallsPreview from "@/components/cinematic/WaterfallsPreview";
import ResponsibleHeritage from "@/components/cinematic/ResponsibleHeritage";

import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";

import { events } from "@/data/events";

export const metadata = {
  title: {
    absolute: "Bagalkot Heritage Tourism | The Official Heritage Valley Guide",
  },
};

/* ------------------------------------------------------------------ */
/* Real photography — Karnataka Tourism, Bagalkote District portal     */
/* and Wikimedia Commons (per-image credits in data/monuments.js)      */
/* ------------------------------------------------------------------ */

const KT = "https://web-cms.karnatakatourism.org/wp-content/uploads";
const GOV = "https://cdn.s3waas.gov.in/s3a1d33d0dfec820b41b54430b50e96b5c/uploads";
const WIKI = "https://upload.wikimedia.org/wikipedia/commons";

const IMG = {
  badamiCliff: "/images/upper-shivalaya-6k.jpg",
  lakeTemple: "/images/badami-evening-4k.jpg",
  groupTemples: "/images/pattadakal-4k.jpg",
  templeTower: "/images/virupaksha-temple.jpg",
  carvedWall: "/images/pattadakal-galaganatha.jpg",
  villageComplex: "/images/aihole-4k.jpg",
  corridor: "/images/durga-temple-aihole.jpg",
  heavyPillars: "/images/lad-khan-temple.jpg",
  hillSunset: "/images/meguti-temple.jpg",
  gopura: "/images/banashankari-temple.jpg",
  groveShrine: "/images/mahakuta-temples.jpg",
  sangama: "/images/kudalasangama.jpg",
};

/* ------------------------------------------------------------------ */
/* Section data                                                        */
/* ------------------------------------------------------------------ */

const STORY_SCENES = [
  {
    slug: "badami-cave-temples",
    title: "BADAMI",
    description: "Carved into stone. Written into history.",
    image: IMG.badamiCliff,
    location: "Badami",
    tags: ["Rock-cut architecture", "Ancient sculpture", "Red sandstone"],
  },
  {
    slug: "aihole",
    title: "AIHOLE",
    description: "A village of temples, forever experimenting with form.",
    image: IMG.villageComplex,
    location: "Aihole",
    tags: ["Cradle of temple architecture", "Over a hundred shrines", "Experimental plans"],
  },
  {
    slug: "pattadakal-group-of-monuments",
    title: "PATTADAKAL",
    description: "Where the north and south of India built side by side.",
    image: IMG.groupTemples,
    location: "Pattadakal",
    tags: ["UNESCO World Heritage", "Nagara & Dravida", "Royal coronations"],
  },
  {
    slug: "mahakuta-temples",
    title: "MAHAKUTA",
    description: "Shrines around living springs, hidden in a grove.",
    image: IMG.groveShrine,
    location: "Mahakuta",
    tags: ["Spring-fed tank", "Early Chalukyan", "Inscription site"],
  },
  {
    slug: null,
    title: "BAGALKOT",
    description: "One valley. A thousand years of stone.",
    image: IMG.lakeTemple,
    location: "Bagalkot District",
    tags: ["Malaprabha valley", "Chalukyan heartland", "Living heritage"],
  },
];

const PATTADAKAL_PANELS = [
  {
    id: "pattadakal",
    title: "PATTADAKAL",
    text: "On the banks of the Malaprabha, the Chalukya kings were crowned — and built a ceremonial city of temples beside the river.",
    image: IMG.groupTemples,
  },
  {
    id: "virupaksha",
    title: "VIRUPAKSHA",
    text: "Raised around 740 CE by Queen Lokamahadevi to commemorate a victory. Its architects are named in inscriptions — a rarity in medieval India.",
    image: IMG.templeTower,
  },
  {
    id: "mallikarjuna",
    title: "MALLIKARJUNA",
    text: "Built by her sister, Queen Trailokyamahadevi. Two royal women, two temples, side by side within a few years of each other.",
    image: IMG.carvedWall,
  },
  {
    id: "architecture",
    title: "ARCHITECTURE",
    text: "Nagara and Dravida — India's two great temple traditions — stand in one compound, openly compared and freely fused.",
    image: IMG.corridor,
  },
  {
    id: "heritage",
    title: "HERITAGE",
    text: "In 1987, UNESCO inscribed Pattadakal as a World Heritage Site: an open-air laboratory of early medieval temple design.",
    image: IMG.heavyPillars,
  },
];

const MILESTONES = [
  {
    id: "capital",
    period: "6TH CENTURY CE",
    title: "Vatapi rises",
    text: "The Early Chalukyas make Badami — ancient Vatapi — their capital, and the red sandstone cliffs become their canvas.",
    slug: "badami-cave-temples",
  },
  {
    id: "caves",
    period: "c. 550–600 CE",
    title: "The caves are carved",
    text: "Rock-cut temples open in the cliff face above Agastya Lake, Hindu and Jain traditions sharing one hillside.",
    slug: "badami-cave-temples",
  },
  {
    id: "meguti",
    period: "634 CE",
    title: "A date in stone",
    text: "The Meguti Temple inscription at Aihole fixes its year precisely — a chronological anchor for all early Chalukyan architecture.",
    slug: "meguti-jain-temple",
  },
  {
    id: "queens",
    period: "c. 740–745 CE",
    title: "Queens build temples",
    text: "Lokamahadevi and Trailokyamahadevi raise the Virupaksha and Mallikarjuna temples at Pattadakal, the ceremonial capital.",
    slug: "virupaksha-temple-pattadakal",
  },
  {
    id: "unesco",
    period: "1987",
    title: "World Heritage",
    text: "UNESCO inscribes the Group of Monuments at Pattadakal, recognising the coexistence of India's two great temple styles in one place.",
    slug: "pattadakal-group-of-monuments",
  },
  {
    id: "today",
    period: "TODAY",
    title: "Living stories",
    text: "Pilgrims still bathe in Mahakuta's springs and light lamps at Banashankari. The valley's heritage never stopped being lived.",
    slug: "banashankari-temple",
  },
];

const HOTSPOTS = [
  {
    id: "cliff",
    x: 0.16,
    y: 0.22,
    label: "Sandstone cliff",
    description: "The caves are cut directly into soft red sandstone — ideal for fine carving.",
    detail: "One cliff face shelters Hindu and Jain temples side by side.",
    slug: "badami-cave-temples",
  },
  {
    id: "entrance",
    x: 0.34,
    y: 0.44,
    label: "Entrance",
    description: "A columned veranda (mukha-mandapa) leads from daylight into the pillared hall.",
    detail: "Robust square pillars carry the form of earlier timber porches into stone.",
    slug: "badami-cave-temples",
  },
  {
    id: "pillar",
    x: 0.54,
    y: 0.68,
    label: "Pillar",
    description: "The pillars preserve the grammar of wooden architecture — brackets and beams translated into masonry.",
    detail: "This is why the Badami caves mark the transition from timber to monumental stone construction.",
    slug: "badami-cave-temples",
  },
  {
    id: "sculpture",
    x: 0.72,
    y: 0.38,
    label: "Sculpture",
    description: "Sculptural panels line the walls — among the finest early medieval work in the Deccan.",
    detail: "Cave 3 holds a celebrated four-armed Vishnu seated on the serpent Adisesha.",
    slug: "badami-cave-temples",
  },
];

const ARCH_FEATURES = [
  {
    title: "Rock-Cut",
    text: "The Badami caves were excavated straight into the hillside above Agastya Lake — veranda, hall and shrine, all subtracted from living rock.",
    image: IMG.badamiCliff,
    alt: "Rock-cut cave openings in a sandstone cliff",
    href: "/destinations/badami-cave-temples",
    cta: "See the caves",
  },
  {
    title: "Temple",
    text: "At Pattadakal and Aihole the Chalukyas built free-standing shrines — sanctum, pillared hall and tower — in both the northern Nagara and southern Dravida styles.",
    image: IMG.groupTemples,
    alt: "Free-standing stone temple compounds",
    href: "/destinations/pattadakal-group-of-monuments",
    cta: "Explore Pattadakal",
  },
  {
    title: "Sculpture",
    text: "Walls become narrative: episodes from the Ramayana, Mahabharata and Bhagavata unfold in friezes around the Virupaksha Temple.",
    image: IMG.carvedWall,
    alt: "Carved narrative relief on a temple wall",
    href: "/destinations/virupaksha-temple-pattadakal",
    cta: "Read the friezes",
  },
  {
    title: "Pillars",
    text: "Early Chalukyan pillars freeze the look of timber architecture in stone — the Lad Khan Temple at Aihole is the clearest surviving translation.",
    image: IMG.heavyPillars,
    alt: "Massive stone pillars inside an ancient hall",
    href: "/destinations/lad-khan-temple",
    cta: "Wood become stone",
  },
  {
    title: "Gateways",
    text: "The Virupaksha Temple carries a monumental gateway (gopura) — the southern scheme fully absorbed into Deccan temple design.",
    image: IMG.templeTower,
    alt: "Stepped temple tower and gateway",
    href: "/destinations/virupaksha-temple-pattadakal",
    cta: "Stand at the gopura",
  },
  {
    title: "Carvings",
    text: "At the Durga Temple in Aihole, pierced-stone lattice windows cast patterned light through the covered ambulatory — almost unique in Hindu temple building.",
    image: IMG.corridor,
    alt: "Pillared corridor with carved stone screens",
    href: "/destinations/durga-temple-aihole",
    cta: "Walk the ambulatory",
  },
];

const GALLERY_PHOTOS = [
  {
    id: "g1",
    url: IMG.badamiCliff,
    title: "The Sandstone Caves of Badami",
    location: "Badami",
    description: "Rock-cut cave openings in red sandstone dating back to 578 CE under Chalukya Mangalesha.",
    timeOfDay: "Morning 06:45 AM",
    credit: "Karnataka Tourism",
    cameraTip: "Shoot facing east; soft morning light directly illuminates Cave 1's 18-armed Nataraja and Cave 3 reliefs.",
    tall: true,
  },
  {
    id: "g2",
    url: IMG.lakeTemple,
    title: "Bhutanatha Temples at Waterside",
    location: "Badami",
    description: "7th-century sandstone shrines extending into the sacred waters of Agastya Lake.",
    timeOfDay: "Sunset 05:45 PM",
    credit: "Wikimedia Commons",
    cameraTip: "Position on the stone steps across the lake for a mirror reflection of the cliff and shrine.",
  },
  {
    id: "g3",
    url: IMG.groupTemples,
    title: "UNESCO World Heritage Complex",
    location: "Pattadakal",
    description: "The royal coronation city with nine Hindu temples and a Jain sanctuary on the banks of Malaprabha.",
    timeOfDay: "Late Afternoon 04:15 PM",
    credit: "Karnataka Tourism",
    cameraTip: "Capture both Nagara (curvilinear) and Dravida (stepped) towers in a single panoramic frame.",
    tall: true,
  },
  {
    id: "g4",
    url: IMG.templeTower,
    title: "Virupaksha Dravida Vimana",
    location: "Pattadakal",
    description: "Commissioned by Queen Lokamahadevi in 740 CE to celebrate Vikramaditya II's victory over the Pallavas.",
    timeOfDay: "Midday 01:30 PM",
    credit: "Wikimedia Commons",
    cameraTip: "Focus on the intricate miniature shrines (kuta and shala) adorning each tier of the vimana.",
  },
  {
    id: "g5",
    url: IMG.villageComplex,
    title: "Aihole — The Temple Cradle",
    location: "Aihole",
    description: "Over 120 stone temples spanning the 5th to 12th centuries, documenting the birth of Indian temple styles.",
    timeOfDay: "Morning 08:30 AM",
    credit: "Karnataka Tourism",
    cameraTip: "Use leading lines along the ancient village pathways leading into temple courtyards.",
  },
  {
    id: "g6",
    url: IMG.corridor,
    title: "Apsidal Peristyle at Durga Temple",
    location: "Aihole",
    description: "Unique horseshoe-shaped apsidal (Gajaprishtha) hall with open colonnade and pierced lattice windows.",
    timeOfDay: "Morning 09:15 AM",
    credit: "Wikimedia Commons",
    cameraTip: "Walk inside the ambulatory (pradakshinapatha) for striking geometric shadows cast through stone grilles.",
    tall: true,
  },
  {
    id: "g7",
    url: IMG.heavyPillars,
    title: "Lad Khan Temple Timber-Masonry",
    location: "Aihole",
    description: "Massive square stone pillars replicating ancient wooden assembly halls with sloping stone log roofs.",
    timeOfDay: "Midday 11:30 AM",
    credit: "Wikimedia Commons",
    cameraTip: "Look up at the central ceiling slab carved with floral rosettes and fish motifs.",
  },
  {
    id: "g8",
    url: IMG.hillSunset,
    title: "Meguti Jain Hill at Dusk",
    location: "Aihole",
    description: "Hilltop temple built in 634 CE by court poet Ravikirti, bearing the famous Aihole Prashasti inscription.",
    timeOfDay: "Dusk 06:10 PM",
    credit: "Wikimedia Commons",
    cameraTip: "Climb the hill 30 minutes before sunset for an expansive 360-degree view across the entire Malaprabha valley.",
  },
  {
    id: "g9",
    url: IMG.groveShrine,
    title: "Sacred Springs of Mahakuta",
    location: "Mahakuta",
    description: "7th-century shrines clustered around the perennial natural spring tank, Vishnu Pushkarini.",
    timeOfDay: "Morning 07:00 AM",
    credit: "Bagalkote District Portal",
    cameraTip: "Capture the submerged 5-faced Shiva linga through the clear thermal spring water.",
  },
  {
    id: "g10",
    url: IMG.gopura,
    title: "Banashankari Temple & Haridra Tirtha",
    location: "Cholachagudd",
    description: "Living Shakti shrine with massive square tank enclosed by triple-storeyed stone watchtowers.",
    timeOfDay: "Afternoon 03:00 PM",
    credit: "Wikimedia Commons",
    cameraTip: "Photograph the lamps lit along the deepa-stambha stone pillar in the temple forecourt.",
    tall: true,
  },
  {
    id: "g11",
    url: IMG.carvedWall,
    title: "Ramayana & Mahabharata Friezes",
    location: "Pattadakal",
    description: "Continuous narrative stone bas-reliefs detailing mythological epics carved along plinths and pillars.",
    timeOfDay: "Late Afternoon 04:45 PM",
    credit: "Karnataka Tourism",
    cameraTip: "Side lighting emphasizes the deeply undercut relief carving of warrior chariots and dancers.",
  },
  {
    id: "g12",
    url: IMG.sangama,
    title: "Basava Aikya Mantapa at Confluence",
    location: "Kudalasangama",
    description: "The sanctified spot where philosopher Basaveshwara attained Aikya, surrounded by Krishna and Malaprabha rivers.",
    timeOfDay: "Sunset 05:30 PM",
    credit: "Karnataka Tourism",
    cameraTip: "Take the river ferry boat to photograph the cylindrical protective stone casing from the water.",
  },
];

const STORIES = [
  {
    id: "caves-of-badami",
    featured: true,
    title: "The Caves of Badami",
    excerpt: "How a dynasty turned a sandstone cliff into a cathedral of memory.",
    image: IMG.badamiCliff,
  },
  {
    id: "temples-became-architecture",
    title: "How Temples Became Architecture",
    excerpt: "From timber halls to stone shikharas — the translation the Chalukyas completed.",
    image: IMG.heavyPillars,
  },
  {
    id: "story-of-pattadakal",
    title: "The Story of Pattadakal",
    excerpt: "Coronation city, architectural laboratory, World Heritage Site.",
    image: IMG.groupTemples,
  },
  {
    id: "aihole-experimental-city",
    title: "Aihole — The Experimental City",
    excerpt: "Over a hundred temples, and barely two alike.",
    image: IMG.villageComplex,
  },
  {
    id: "stone-sculpture-memory",
    title: "Stone, Sculpture and Memory",
    excerpt: "Reading the narrative friezes the way early devotees did.",
    image: IMG.carvedWall,
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      {/* 01 — Unified Cinematic Intro & Hero Stage */}
      <CinematicIntro />

      {/* Live Tourism Status Bar */}
      <LiveStatusBanner />

      {/* 03 — Real-Time Tourist Radar & Operations */}
      <section className="relative border-b border-stone-400/10 bg-charcoal-900/60 py-20 md:py-28" aria-label="Real-time valley conditions and visitor assistance">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            align="center"
            eyebrow="Live Valley Radar"
            title={
              <>
                Today in the Valley.
                <span className="block text-gold-400">Live timings, weather &amp; helplines.</span>
              </>
            }
            lead="Current operational status of Badami, Pattadakal, and Aihole monuments, live weather, golden-hour photo cues, and 24x7 tourist emergency helplines."
          />
          <div className="mt-14">
            <LiveTouristDashboard />
          </div>
        </div>
      </section>

      {/* 04 — Bagalkot heritage story */}
      <section aria-label="The heritage of Bagalkot">
        <StoryScene scenes={STORY_SCENES} />
      </section>

      {/* 04 — Badami scene */}
      <section
        className="relative flex min-h-[100svh] items-center overflow-hidden"
        aria-label="Badami"
      >
        <ParallaxImage
          src={IMG.badamiCliff}
          alt="The red sandstone cliffs of Badami"
          className="absolute inset-0 h-full"
          speed={0.35}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/55 to-charcoal-950/75"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-32 md:px-8">
          <p className="font-mono text-xs tracking-[0.4em] text-gold-500">
            01 — THE CLIFFS OF VATAPI
          </p>
          <h2 className="mt-6 display-xl font-light leading-[0.88] text-ivory word-keep">
            BADAMI
          </h2>
          <p className="mt-6 max-w-md font-display text-2xl leading-snug text-stone-200 md:text-3xl word-keep">
            Stone becomes architecture.
            <span className="block text-gold-400">Architecture becomes memory.</span>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/destinations/badami-cave-temples"
              className="link-underline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400"
            >
              Enter the caves
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Audio Guide Narration Widget */}
          <div className="mt-12 max-w-xl">
            <AudioGuideWidget />
          </div>
        </div>
      </section>

      {/* 05 — AI transformation */}
      <AITransformation />

      {/* 06 — Monument scanner */}
      <section className="relative py-24 md:py-36" aria-label="AI monument scanner">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            align="center"
            eyebrow="Monument scanner"
            title={
              <>
                See a monument.
                <span className="block text-gold-400">Let AI tell its story.</span>
              </>
            }
            lead="Upload or sample a photograph of any monument in Bagalkot to receive instant architectural analysis, dynasty history, and visiting advice."
          />
          <div className="mt-14">
            <MonumentScanner />
          </div>
        </div>
      </section>

      {/* 07 — What am I looking at? */}
      <section
        className="relative bg-charcoal-900/40 py-24 md:py-36"
        aria-label="Interactive monument analysis"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Interactive vision"
            title="What am I looking at?"
            lead="The AI reads a monument the way a conservator would — entrance, pillar, panel, cliff — and opens a window onto each feature."
          />
          <div className="mt-14">
            <VisionHotspots
              image={IMG.badamiCliff}
              alt="Sandstone cliff with rock-cut cave openings — interactive analysis"
              title="Badami Cave Temples"
              hotspots={HOTSPOTS}
            />
          </div>
        </div>
      </section>

      {/* 08 — Pattadakal horizontal story */}
      <section aria-label="The story of Pattadakal">
        <HorizontalStory panels={PATTADAKAL_PANELS} />
      </section>

      {/* 09 — Architecture Explorer */}
      <div id="architecture">
        <ArchitectureExplorer />
      </div>

      {/* 10 — AI Heritage Guide */}
      <section
        className="relative bg-charcoal-900/40 py-24 md:py-36"
        aria-label="AI heritage guide"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            align="center"
            eyebrow="Heritage guide"
            title={
              <>
                You&apos;ve seen the stone.
                <span className="block text-gold-400">Now ask the story.</span>
              </>
            }
            lead="Ask about history, architecture, visiting hours or travel logistics. The guide provides knowledge-grounded answers based on official Archaeological Survey of India (ASI) records."
          />
          <div className="mt-14">
            <HeritageGuide />
          </div>
        </div>
      </section>

      {/* 11 — Smart map, 360 Heritage View & Waterfalls */}
      <section className="relative py-24 md:py-36" aria-label="Heritage map, 360 panoramic views and seasonal waterfalls">
        <div className="mx-auto max-w-7xl px-5 md:px-8 space-y-16">
          <SmartMapTeaser />
          <Heritage360Preview />
          <WaterfallsPreview />
        </div>
      </section>

      {/* 12 — Trip planner */}
      <section
        className="relative bg-charcoal-900/40 py-24 md:py-36"
        aria-label="AI trip planner"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            align="center"
            eyebrow="Trip planner"
            title={
              <>
                Your journey.
                <span className="block text-gold-400">Your way.</span>
              </>
            }
            lead="Choose your duration, interests and travel style. The planner shapes an optimized route through the valley with transit times, entry tickets, and dining stops."
          />
          <div className="mt-14">
            <TripPlanner compact />
          </div>
        </div>
      </section>

      {/* 13 — Heritage timeline */}
      <section className="relative py-24 md:py-36" aria-label="Heritage timeline">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            align="center"
            className="mb-16 md:mb-20"
            eyebrow="Six centuries, one valley"
            title="The heritage timeline"
            lead="From the rise of Vatapi to the living pilgrimages of today — dates only where records fix them."
          />
          <Timeline milestones={MILESTONES} />
        </div>
      </section>

      {/* 14 — Food Culture — Taste the Story Preview */}
      <div id="food-culture">
        <FoodCulturePreview />
      </div>

      {/* 14 — Culture */}
      <section
        className="relative bg-charcoal-900/40 py-24 md:py-36"
        aria-label="Culture of Bagalkot"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Beyond the stone"
            title={
              <>
                The valley still
                <span className="block text-gold-400">lives.</span>
              </>
            }
            lead="Food, craft and festival — the culture that carried on while the monuments slept."
          />
          <div className="mt-14">
            <CultureScenes />
          </div>
        </div>
      </section>

      {/* 15 — Photo gallery */}
      <section className="relative py-24 md:py-36" aria-label="Photo gallery">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="Frames from the valley"
            lead="Official photography capturing the red sandstone cliffs of Badami, UNESCO Pattadakal, and the cradle of Indian temple architecture across the Malaprabha Valley."
          />
          <div className="mt-14">
            <Gallery photos={GALLERY_PHOTOS} title="Bagalkot gallery" />
          </div>
        </div>
      </section>

      {/* 16 — Stories */}
      <section
        className="relative bg-charcoal-900/40 py-24 md:py-36"
        aria-label="Stories from stone"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Stories"
              title="Stories from stone"
              lead="Documentary-style reads on the Chalukyan heartland."
            />
            <Link
              href="/stories"
              className="link-underline text-xs font-semibold uppercase tracking-[0.25em] text-gold-400"
            >
              All stories →
            </Link>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Featured */}
            <Link
              href={`/stories#${STORIES[0].id}`}
              className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${STORIES[0].image})` }}
                role="img"
                aria-label={`${STORIES[0].title}`}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent"
                aria-hidden="true"
              />
              <div className="relative p-8 md:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-400">
                  Featured story
                </p>
                <h3 className="mt-3 font-display text-4xl font-light text-ivory md:text-5xl">
                  {STORIES[0].title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-300">
                  {STORIES[0].excerpt}
                </p>
              </div>
            </Link>

            {/* List */}
            <ul className="flex flex-col divide-y divide-stone-400/10">
              {STORIES.slice(1).map((story) => (
                <li key={story.id}>
                  <Link
                    href={`/stories#${story.id}`}
                    className="group flex items-center justify-between gap-6 py-6"
                  >
                    <div>
                      <h4 className="font-display text-2xl text-ivory transition-colors group-hover:text-gold-300">
                        {story.title}
                      </h4>
                      <p className="mt-1.5 text-sm text-stone-400">{story.excerpt}</p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="shrink-0 text-stone-500 transition-all group-hover:translate-x-1 group-hover:text-gold-400"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 17 — Events */}
      <section className="relative py-24 md:py-36" aria-label="Events">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Events"
              title="When the valley gathers"
              lead="Sample listings for demonstration — every event below is clearly marked as a sample, never an official calendar."
            />
            <Link
              href="/events"
              className="link-underline text-xs font-semibold uppercase tracking-[0.25em] text-gold-400"
            >
              All events →
            </Link>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {events.slice(0, 3).map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 19 — Responsible Heritage & Conservation */}
      <ResponsibleHeritage />

      {/* 20 — Final cinematic CTA */}
      <FinalCTA />
    </>
  );
}