"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, X, Maximize2, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const FOOD_PHOTOS = [
  {
    id: "g-rotti",
    title: "Hand-Patting Jolada Rotti on the Hearth",
    subtitle: "Rhythmic 'thattodu' technique over raging wood fire",
    src: "/images/akki-roti.jpg",
    location: "Village hearth near Badami",
    aspect: "tall",
  },
  {
    id: "g-market",
    title: "Weekly Village Santhe & Fresh Produce",
    subtitle: "Byadgi red chillies, raw peanuts, and fresh baby brinjals",
    src: "/images/badami-evening-4k.jpg",
    location: "Guledgudd Weekly Market",
  },
  {
    id: "g-claypot",
    title: "Terracotta Pots Setting Buffalo Curd",
    subtitle: "Cool unglazed clay naturally chilling curd under Deccan sun",
    src: "/images/mahakuta-temples.jpg",
    location: "Mahakuta pilgrim settlement",
  },
  {
    id: "g-harvest",
    title: "White Sorghum (Jola) Harvest in Black Soil",
    subtitle: "Winter Rabi crop harvested by hand in Malaprabha basin",
    src: "/images/aihole-4k.jpg",
    location: "Aihole agricultural plains",
  },
  {
    id: "g-thali",
    title: "The Royal Banana-Leaf Feast",
    subtitle: "Unlimited vegetarian oota served with love and hospitality",
    src: "/images/pattadakal-4k.jpg",
    location: "Basaveshwara Khanavali, Badami",
    aspect: "tall",
  },
  {
    id: "g-girmit",
    title: "Evening Masala Girmit & Chilli Bajjis",
    subtitle: "Tangy tamarind puffed rice with golden crisp pakoras",
    src: "/images/upper-shivalaya-6k.jpg",
    location: "Agastya Lake shoreline stalls",
  },
];

export default function FoodGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="py-24 md:py-32 bg-charcoal-900/40 border-t border-stone-800/80" aria-label="Culinary Photography Gallery">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Visual Documentary"
          title={
            <>
              Frames from the Hearth.
              <span className="block text-gold-400">Soil, Smoke &amp; Brass.</span>
            </>
          }
          lead="Moments captured in village kitchens, bustling weekly grain santhes, and the intimate communal Khanavalis of North Karnataka."
        />

        {/* Gallery Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FOOD_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative h-72 cursor-pointer overflow-hidden rounded-3xl border border-stone-800 bg-charcoal-950 transition-all duration-300 hover:border-gold-500/50 hover:shadow-2xl"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Hover Badge */}
              <div className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-charcoal-950/80 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                <Maximize2 size={14} />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400">
                  {photo.location}
                </span>
                <h4 className="mt-1 font-display text-lg text-ivory group-hover:text-gold-300 transition-colors">
                  {photo.title}
                </h4>
                <p className="mt-1 text-xs text-stone-300 line-clamp-1">
                  {photo.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[var(--z-dialog)] bg-charcoal-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 grid h-10 w-10 place-items-center rounded-full border border-stone-800 bg-charcoal-900 text-stone-300 hover:border-gold-500 hover:text-ivory"
            aria-label="Close photo preview"
          >
            <X size={20} />
          </button>

          <div className="relative max-w-4xl w-full h-[65vh] rounded-3xl overflow-hidden border border-gold-500/30">
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-70" />
          </div>

          <div className="mt-6 text-center max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400">
              {selectedPhoto.location}
            </span>
            <h3 className="mt-1 font-display text-2xl text-ivory">
              {selectedPhoto.title}
            </h3>
            <p className="mt-2 text-sm text-stone-300">
              {selectedPhoto.subtitle}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
