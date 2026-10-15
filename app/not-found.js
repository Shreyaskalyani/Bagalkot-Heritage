import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-[0.4em] text-gold-500">404</p>
      <h1 className="mt-4 font-display text-5xl font-light text-ivory md:text-7xl">
        This stone is uncarved.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400">
        The page you were looking for doesn&apos;t exist — but the valley is
        still here.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gold-500 px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-950 transition-colors hover:bg-gold-400"
      >
        Return to Bagalkot
      </Link>
    </section>
  );
}