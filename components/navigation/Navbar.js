"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScanSearch, Menu, Search, Globe } from "lucide-react";
import MobileMenu from "./MobileMenu";
import SmartSearchModal from "@/components/cinematic/SmartSearchModal";
import { useLanguage } from "@/context/LanguageContext";

const LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/destinations", label: "Destinations" },
  { href: "/waterfalls", label: "Waterfalls" },
  { href: "/360-heritage", label: "360° View" },
  { href: "/food-culture", label: "Food & Culture" },
  { href: "/heritage", label: "Heritage" },
  { href: "/planner", label: "Trip Planner" },
  { href: "/map", label: "Map" },
  { href: "/stories", label: "Stories" },
  { href: "/guide", label: "AI Guide" },
  { href: "/visitor-center", label: "Visitor Center" },
];

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "hi", label: "हिन्दी" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { language: currentLang, setLanguage: setCurrentLang, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K opens search
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (pathname === "/visitor-center" || pathname === "/display") return null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[var(--z-navigation)] h-[var(--nav-height)] transition-all duration-500 ${
          scrolled
            ? "bg-charcoal-950/90 backdrop-blur-md border-b border-gold-500/15 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 md:px-8"
          aria-label="Primary"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 shrink-0"
            aria-label="Bagalkot Heritage Tourism — Home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-500/40 text-gold-400 transition-colors group-hover:border-gold-400 group-hover:bg-gold-500/10">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 15h12M2 15V7l6-5 6 5v8M6 15v-4h4v4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base tracking-[0.2em] text-ivory">
                {t("brand_title", "BAGALKOT")}
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.35em] text-gold-500/90">
                {t("brand_subtitle", "Heritage Tourism")}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-4 xl:gap-6 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`link-underline text-[12px] xl:text-[13px] font-medium uppercase tracking-wider transition-colors ${
                    pathname === link.href
                      ? "text-gold-400"
                      : "text-stone-300 hover:text-ivory"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {t(link.href, link.label)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-800 bg-charcoal-900/80 px-3 py-1.5 text-xs text-stone-300 transition-colors hover:border-gold-500/40 hover:text-ivory"
              aria-label="Search Bagalkot Heritage Tourism"
              title="Search Bagalkot (Ctrl+K)"
            >
              <Search size={14} className="text-gold-400" />
              <span className="hidden xl:inline text-[11px] font-medium uppercase tracking-wider">
                {t("search", "Search")}
              </span>
              <span className="hidden xl:inline-block rounded border border-stone-700 bg-charcoal-950 px-1 text-[9px] font-mono text-stone-400">
                ⌘K
              </span>
            </button>

            {/* Language Selector UI */}
            <div className="hidden sm:flex items-center rounded-full border border-stone-800 bg-charcoal-900/80 p-0.5 text-[11px]">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
                    currentLang === lang.code
                      ? "bg-gold-500 text-charcoal-950 font-bold"
                      : "text-stone-400 hover:text-ivory"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* AI Scan CTA */}
            <Link
              href="/scanner"
              className="hidden items-center gap-1.5 rounded-full bg-gold-500/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_24px_rgba(181,137,56,0.35)] md:flex"
            >
              <ScanSearch size={14} strokeWidth={2.2} aria-hidden="true" />
              <span>{t("ai_scan", "AI Scan")}</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-stone-400/30 text-ivory lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={18} strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenSearch={() => {
          setMenuOpen(false);
          setSearchOpen(true);
        }}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
      />

      {/* Smart Search Modal */}
      <SmartSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
