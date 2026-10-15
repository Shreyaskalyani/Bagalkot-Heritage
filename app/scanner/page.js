import Link from "next/link";
import { ArrowRight } from "lucide-react";

import MonumentScanner from "@/components/ai/MonumentScanner";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "AI Monument Scanner",
  description:
    "Upload a photograph of a Bagalkot monument and let the AI identify it — architecture, sculpture and structure, with its story.",
};

const STEPS = [
  {
    n: "01",
    title: "Upload or capture",
    text: "A clear, front-facing photograph works best. Wider views give the AI more structure to read.",
  },
  {
    n: "02",
    title: "The AI reads the stone",
    text: "Architecture, sculpture and structural features are detected — the same vocabulary the monument pages use.",
  },
  {
    n: "03",
    title: "Get the story",
    text: "A confident match opens the monument's full page. A weak match says so honestly and suggests a better photo.",
  },
];

export default function ScannerPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-32">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">
          AI Monument Scanner
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
          See a monument.
          <span className="block text-gold-400">Let AI tell its story.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-400">
          Point the scanner at any heritage structure in Bagalkot. The AI
          analyses what it sees and identifies it — or tells you honestly when
          it isn&apos;t sure.
        </p>
      </div>

      <div className="mt-14">
        <MonumentScanner />
      </div>

      {/* How it works */}
      <section className="mt-24 border-t border-gold-500/10 pt-16" aria-label="How the scanner works">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, one photograph."
          align="center"
          className="mb-12"
        />
        <ol className="grid gap-6 md:grid-cols-3" role="list">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-2xl border border-stone-400/15 bg-charcoal-900/40 p-7">
              <p className="font-mono text-xs tracking-[0.3em] text-gold-600">{s.n}</p>
              <h3 className="mt-3 font-display text-2xl text-ivory">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Verification notice + cross-link */}
      <section className="mt-16 rounded-2xl border border-gold-500/20 bg-gold-500/5 p-8 text-center md:p-10">
        <p className="text-sm leading-relaxed text-stone-300">
          Powered by verified <span className="font-semibold text-gold-400">Archaeological Survey of India</span> architectural data:
          The scanner identifies rock-cut caves, nagara and dravida vimana towers, and epigraphical panels across the Chalukyan corridor.
          Confidence scores and historical context are directly grounded in ASI documentation.
        </p>
        <Link
          href="/guide"
          className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300"
        >
          Or ask the Heritage Guide directly
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}