"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, MapPin, Utensils, BookOpen, Sparkles, ArrowRight } from "lucide-react";

const SEARCH_DATABASE = [
  // Monuments & Destinations
  {
    title: "Badami Cave Temples",
    category: "Destination",
    subtitle: "Vatapi rock-cut caves carved into red sandstone cliffs",
    href: "/destinations/badami-cave-temples",
    keywords: ["badami", "caves", "vishnu", "nataraja", "rock-cut", "vatapi", "sandstone"],
  },
  {
    title: "Bhutanatha Temples & Agastya Lake",
    category: "Destination",
    subtitle: "7th-century shrines resting at the water edge of Agastya Lake",
    href: "/destinations/bhutanatha-temples",
    keywords: ["bhutanatha", "lake", "agastya", "water", "sunset", "shiva"],
  },
  {
    title: "Pattadakal UNESCO World Heritage Complex",
    category: "Destination",
    subtitle: "Royal coronation city with Nagara and Dravida temple confluence",
    href: "/destinations/pattadakal-group-of-monuments",
    keywords: ["pattadakal", "unesco", "coronation", "virupaksha", "mallikarjuna", "sangameshwara"],
  },
  {
    title: "Aihole Durga Temple & Complex",
    category: "Destination",
    subtitle: "Cradle of Indian temple architecture with apsidal peristyle hall",
    href: "/destinations/durga-temple-aihole",
    keywords: ["aihole", "durga", "cradle", "architecture", "apsidal", "jalandhra"],
  },
  {
    title: "Mahakuta Sacred Spring & Temples",
    category: "Destination",
    subtitle: "7th-century shrines gathered around natural thermal pushkarini",
    href: "/destinations/mahakuta-temples",
    keywords: ["mahakuta", "spring", "pushkarini", "grove", "shiva", "makuteshwara"],
  },
  {
    title: "Banashankari Amma Devi Temple",
    category: "Destination",
    subtitle: "Ancient Shakti sanctuary at Cholachagudd with deepa-stambha",
    href: "/destinations/banashankari-temple",
    keywords: ["banashankari", "devi", "shakti", "fair", "jaatre", "haridra tirtha"],
  },
  {
    title: "Kudalasangama Confluence & Aikya Mantapa",
    category: "Destination",
    subtitle: "Sanctified meeting of Krishna and Malaprabha rivers; Basaveshwara memorial",
    href: "/destinations/kudalasangama",
    keywords: ["kudalasangama", "basava", "aikya", "confluence", "krishna", "malaprabha"],
  },

  // 360° Heritage Views
  {
    title: "360° Virtual Heritage Sanctuary",
    category: "360° View",
    subtitle: "Spherical panoramic rotation inside Badami, Pattadakal, and Aihole",
    href: "/360-heritage",
    keywords: ["360", "panorama", "virtual tour", "street view", "spherical", "viewpoint"],
  },
  {
    title: "Badami Caves 360° Panoramic View",
    category: "360° View",
    subtitle: "Virtual tour of red sandstone cliff escarpment and rock-cut shrines",
    href: "/360-heritage?place=badami-cave-temples",
    keywords: ["360 badami", "badami panorama", "caves 360", "virtual badami"],
  },
  {
    title: "UNESCO Pattadakal 360° View",
    category: "360° View",
    subtitle: "Spherical panoramic overview of the royal coronation compound",
    href: "/360-heritage?place=pattadakal-group-of-monuments",
    keywords: ["360 pattadakal", "pattadakal panorama", "virupaksha 360"],
  },

  // Food Culture
  {
    title: "Bagalkot Food Culture Experience",
    category: "Food Culture",
    subtitle: "The complete culinary story from black soil to hand-patted Jolada Rotti",
    href: "/food-culture",
    keywords: ["food", "cuisine", "north karnataka", "khanavali", "rotti", "yennegayi", "eating"],
  },
  {
    title: "Jolada Rotti (Hand-Patted Sorghum Bread)",
    category: "Food Culture",
    subtitle: "Puffed unleavened jowar flatbread baked on wood-fired iron tawas",
    href: "/food-culture#food-plate",
    keywords: ["jolada rotti", "jowar", "bread", "food", "cuisine", "north karnataka", "khanavali"],
  },
  {
    title: "Badnekayi Yennegayi (Stuffed Brinjal Curry)",
    category: "Food Culture",
    subtitle: "Baby brinjals filled with roasted peanuts, sesame, and Byadgi chillies",
    href: "/food-culture#food-plate",
    keywords: ["yennegayi", "brinjal", "eggplant", "peanut", "curry", "food"],
  },
  {
    title: "Shenga Chutney & Flaxseed Pudi",
    category: "Food Culture",
    subtitle: "Roasted groundnut and flaxseed podi eaten with raw cold-pressed oil",
    href: "/food-culture#food-plate",
    keywords: ["shenga", "chutney", "pudi", "flaxseed", "groundnut", "oil"],
  },

  // Architecture & Motifs
  {
    title: "Rekha-Nagara & Dravida Superstructures",
    category: "Architecture",
    subtitle: "Northern beehive shikharas and southern stepped vimanas built side by side",
    href: "/#architecture",
    keywords: ["nagara", "dravida", "shikhara", "vimana", "architecture", "tower", "spire"],
  },
  {
    title: "Pierced Stone Lattice Windows (Jali)",
    category: "Architecture",
    subtitle: "Geometric stone screens casting dramatic daytime light patterns",
    href: "/#architecture",
    keywords: ["jali", "lattice", "screens", "windows", "stone", "light"],
  },

  // Tools & Services
  {
    title: "AI Monument Scanner",
    category: "Interactive Tool",
    subtitle: "Scan or upload a photo to identify monuments and architectural features",
    href: "/scanner",
    keywords: ["scanner", "camera", "ai", "vision", "recognition", "identify"],
  },
  {
    title: "Interactive Corridor Map",
    category: "Interactive Tool",
    subtitle: "Explore interactive route lines connecting Badami, Mahakuta, Pattadakal & Aihole",
    href: "/map",
    keywords: ["map", "corridor", "distance", "routes", "drive", "navigation"],
  },
  {
    title: "Trip Planner & 1, 2, 3-Day Circuits",
    category: "Planning",
    subtitle: "Curate your heritage circuit with transit schedules and ticket advice",
    href: "/planner",
    keywords: ["planner", "itinerary", "circuits", "hotel", "travel", "tickets"],
  },
  {
    title: "Visitor Information Center",
    category: "Visitor Info",
    subtitle: "Real-time monument radar, crowd density, 4K showcase, and helplines",
    href: "/visitor-center",
    keywords: ["visitor center", "radar", "hours", "entry fee", "helpline", "timings", "police"],
  },
];

export default function SmartSearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_DATABASE.slice(0, 6);
    return SEARCH_DATABASE.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
    );
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[var(--z-dialog)] flex items-start justify-center p-4 pt-20 md:pt-28 bg-charcoal-950/85 backdrop-blur-xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Search Bagalkot Heritage Tourism"
    >
      <div className="w-full max-w-2xl rounded-3xl border border-gold-500/30 bg-charcoal-900/95 p-6 shadow-2xl">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-gold-500/20 pb-4">
          <Search size={20} className="text-gold-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Badami, temples, food, architecture, circuits..."
            autoFocus
            className="w-full bg-transparent text-base text-ivory placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-stone-400 hover:text-ivory text-xs px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-stone-700 text-stone-300 hover:border-gold-500 hover:text-gold-400"
            aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>

        {/* Live Filter Results */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-2 pr-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-stone-400">
              <p className="text-sm">No heritage records matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-stone-500 mt-1">
                Try searching &ldquo;Badami&rdquo;, &ldquo;Pattadakal&rdquo;, &ldquo;Rotti&rdquo;, or &ldquo;Pillar&rdquo;
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={onClose}
                className="group flex items-center justify-between rounded-xl border border-stone-800/80 bg-charcoal-950/60 p-3.5 transition-all hover:border-gold-500/50 hover:bg-gold-500/10"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-display text-lg text-ivory group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">{item.subtitle}</p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-stone-600 transition-transform group-hover:translate-x-1 group-hover:text-gold-400 shrink-0 ml-3"
                />
              </Link>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="mt-4 border-t border-stone-800/80 pt-3 flex items-center justify-between text-[11px] text-stone-400">
          <span>Search instant local database</span>
          <span className="flex items-center gap-1 font-mono">
            <kbd className="rounded border border-stone-700 bg-charcoal-950 px-1.5 py-0.5">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
