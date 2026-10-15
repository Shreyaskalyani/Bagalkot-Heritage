"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, ScanSearch, MapPin, Calendar } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on dedicated full-screen visitor center
  if (pathname === "/visitor-center" || pathname === "/display") return null;

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/explore", icon: Compass },
    { label: "AI Scan", href: "/scanner", icon: ScanSearch, isCenter: true },
    { label: "Map", href: "/map", icon: MapPin },
    { label: "Plan", href: "/planner", icon: Calendar },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-[var(--z-floating-controls)] pb-safe md:hidden border-t border-gold-500/20 bg-charcoal-950/95 backdrop-blur-xl">
      <nav className="flex items-center justify-around px-2 py-2" aria-label="Mobile Bottom Quick Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative -top-3.5 flex flex-col items-center focus:outline-none"
                aria-label="Launch AI Monument Scanner"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-500 text-charcoal-950 shadow-[0_0_20px_rgba(181,137,56,0.5)] transition-transform group-active:scale-95 border-2 border-charcoal-950">
                  <Icon size={22} strokeWidth={2.2} />
                </span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gold-400">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                isActive ? "text-gold-400" : "text-stone-400 hover:text-ivory"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.75} />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
