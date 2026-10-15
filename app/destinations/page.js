"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { monuments } from "@/data/monuments";
import DestinationCard from "@/components/tourism/DestinationCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function DestinationsPage() {
  // Categories derived from the data itself (the exported constant omits
  // "UNESCO World Heritage Site", which one monument uses).
  const categories = useMemo(
    () => ["All", ...new Set(monuments.map((m) => m.category))],
    []
  );
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return monuments.filter((m) => {
      const inCategory = category === "All" || m.category === category;
      const inQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        (m.dynasty || "").toLowerCase().includes(q) ||
        (m.period || "").toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [category, query]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="Destinations"
        title={
          <>
            Every monument in
            <span className="block text-gold-400">the valley.</span>
          </>
        }
        lead={`${monuments.length} documented heritage sites across Badami, Aihole, Pattadakal, Mahakuta, Cholachagudd and the Krishna Valley. Search works entirely on local data — no backend required.`}
      />

      {/* Controls */}
      <div className="mt-12 flex flex-col gap-5">
        <div className="relative max-w-md">
          <Search
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-500"
            aria-hidden="true"
          />
          <label htmlFor="destination-search" className="sr-only">
            Search destinations
          </label>
          <input
            id="destination-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, place or dynasty…"
            className="w-full rounded-full border border-stone-400/25 bg-charcoal-900/60 py-3 pl-11 pr-4 text-sm text-ivory placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50"
          />
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                category === c
                  ? "bg-gold-500 text-charcoal-950"
                  : "border border-stone-400/25 text-stone-300 hover:border-gold-500/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid / empty state */}
      {filtered.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, i) => (
            <DestinationCard key={m.slug} monument={m} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-stone-400/25 p-14 text-center">
          <p className="font-display text-2xl text-ivory">
            No monuments match that search.
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone-400">
            Try a different name, or clear the filters to see all {monuments.length} sites.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-6 rounded-full border border-stone-400/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-stone-200 transition-colors hover:border-gold-500/60"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}