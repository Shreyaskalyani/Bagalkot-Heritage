import { getEvents } from "@/lib/api";
import EventCard from "@/components/tourism/EventCard";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Events",
  description:
    "Festivals, walks and study experiences around Bagalkot's heritage corridor. Sample listings until a live events feed is connected.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="What's happening"
        title="Events in the valley."
        lead="Festivals, walks and learning experiences around the monuments. Listings below are sample content until a live events feed (GET /api/events) is connected."
        className="mb-6"
      />

      <p className="mb-14 inline-flex items-center gap-2 rounded-full border border-stone-400/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-stone-400">
        <span className="block h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
        Sample listings — not official tourism data
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </div>
  );
}