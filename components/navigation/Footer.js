"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Shield, MapPin, Compass, Utensils, Sparkles } from "lucide-react";

const columns = [
  {
    heading: "Explore & Heritage",
    links: [
      { href: "/explore", label: "Overview & Architecture" },
      { href: "/waterfalls", label: "Waterfalls & River Rapids" },
      { href: "/360-heritage", label: "360° Heritage Views" },
      { href: "/destinations", label: "Destinations & Monoliths" },
      { href: "/heritage", label: "Dynasties & Timeline" },
      { href: "/stories", label: "Heritage Stories" },
    ],
  },
  {
    heading: "Food & Culture",
    links: [
      { href: "/food-culture", label: "Taste the Story (Food Culture)" },
      { href: "/food-culture#food-plate", label: "Jolada Rotti & Yennegayi Thali" },
      { href: "/food-culture#khanavalis", label: "Traditional Khanavalis Directory" },
      { href: "/stories#culture", label: "Living Village Traditions" },
    ],
  },
  {
    heading: "Trip Planning",
    links: [
      { href: "/planner", label: "AI Trip Planner" },
      { href: "/map", label: "Interactive Corridor Map" },
      { href: "/planner", label: "1, 2 & 3-Day Circuits" },
      { href: "/destinations", label: "ASI Monuments Directory" },
    ],
  },
  {
    heading: "AI Services & Kiosk",
    links: [
      { href: "/scanner", label: "AI Monument Scanner" },
      { href: "/guide", label: "AI Heritage Guide" },
      { href: "/visitor-center", label: "Visitor Information Center" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/visitor-center" || pathname === "/display") return null;

  return (
    <footer className="relative border-t border-gold-500/15 bg-charcoal-950 pb-20 md:pb-16">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-display text-3xl leading-tight text-ivory md:text-4xl word-keep">
              BAGALKOT
              <span className="mt-1 block text-sm tracking-[0.3em] text-gold-500">
                HERITAGE TOURISM
              </span>
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-stone-400 font-sans">
              The official digital tourism gateway for Bagalkot District and the
              Malaprabha Valley. Guiding travellers through the cradle of Indian
              temple architecture — Badami, Pattadakal, Aihole &amp; Mahakuta.
            </p>

            {/* Helpline quick strip */}
            <div className="mt-6 rounded-2xl border border-gold-500/20 bg-charcoal-900/60 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                24x7 Tourist Assistance
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-300">
                <span className="flex items-center gap-1.5">
                  <Phone size={12} className="text-gold-400" />
                  Karnataka Tourism: <strong className="text-ivory">1363</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield size={12} className="text-gold-400" />
                  Tourist Police: <strong className="text-ivory">112</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="eyebrow text-gold-400">
                {col.heading}
              </p>
              <ul className="mt-5 space-y-3 text-xs">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="link-underline text-stone-300 transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-stone-800/80 pt-8 text-xs text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} Bagalkot Heritage Tourism · Department of Tourism, Government of Karnataka.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/visitor-center" className="hover:text-gold-400 transition-colors">
              Visitor Information Center
            </Link>
            <Link href="/scanner" className="hover:text-gold-400 transition-colors">
              AI Scanner
            </Link>
            <Link href="/map" className="hover:text-gold-400 transition-colors">
              Corridor Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
