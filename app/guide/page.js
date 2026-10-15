import HeritageGuide from "@/components/ai/HeritageGuide";

export const metadata = {
  title: "Heritage Guide & AI Assistant — Bagalkot Heritage Tourism",
  description:
    "Ask the official Heritage Guide about Bagalkot's monuments — history, architecture, visiting hours, and local logistics.",
};

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-32">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">
          Interactive Heritage Guide
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
          You&apos;ve seen the stone.
          <span className="block text-gold-400">Now ask the story.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-400">
          The guide answers from verified monument records — history, architecture,
          significance, and visiting logistics for every site in the valley.
        </p>
      </div>

      <div className="mt-14">
        <HeritageGuide />
      </div>

      <p className="mt-8 text-center text-[11px] uppercase tracking-widest text-stone-500">
        Knowledge-grounded answers curated in accordance with Archaeological Survey of India (ASI) records.
      </p>
    </div>
  );
}