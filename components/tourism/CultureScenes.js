"use client";

import ImageReveal from "@/components/cinematic/ImageReveal";

const SCENES = [
  {
    id: "food",
    title: "Food",
    text: "Jowar roti, yenne badnekayi, and the heat of North Karnataka kitchens.",
    image:
      "/images/akki-roti.jpg",
    alt: "Akki roti — the rice-flour roti that is the everyday bread of North Karnataka",
  },
  {
    id: "craft",
    title: "Craft",
    text: "Stone carving traditions that continue the work the Chalukyas began.",
    image:
      "/images/pattadakal-galaganatha.jpg",
    alt: "Carved stone work at the Galaganatha Temple, Pattadakal",
  },
  {
    id: "festivals",
    title: "Festivals",
    text: "Temple fairs and folk gatherings that fill the heritage towns with life.",
    image:
      "/images/kudalasangama.jpg",
    alt: "Pilgrims gather at the Basava Aikya Mantapa, Kudalasangama",
  },
];

/**
 * Culture — editorial cinematic rows. Large imagery, minimal text.
 */
export default function CultureScenes() {
  return (
    <div className="space-y-20 md:space-y-28">
      {SCENES.map((scene) => (
        <ImageReveal
          key={scene.id}
          src={scene.image}
          alt={scene.alt}
          className="relative aspect-[16/9] rounded-3xl md:aspect-[21/9]"
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <p className="font-mono text-xs tracking-[0.3em] text-gold-500">
              {scene.id.toUpperCase()}
            </p>
            <h3 className="mt-2 font-display text-4xl font-light text-ivory md:text-6xl">
              {scene.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-200 md:text-base">
              {scene.text}
            </p>
          </div>
        </ImageReveal>
      ))}
    </div>
  );
}
