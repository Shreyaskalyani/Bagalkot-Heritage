import { NextResponse } from "next/server";
import { getGeminiApiKey } from "@/lib/gemini-config";
import { monuments } from "@/data/monuments";

export async function POST(request) {
  try {
    const preferences = await request.json();
    const {
      duration = 1,
      interests = ["architecture", "history"],
      style = "balanced",
      start = "Badami",
    } = preferences;

    const apiKey = getGeminiApiKey();

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured on server" },
        { status: 503 }
      );
    }

    const promptText = `You are the master travel planner for Bagalkot Heritage Tourism (Badami, Pattadakal, Aihole, Mahakuta, Banashankari, and local waterfalls).
Generate an optimized travel itinerary for:
- Duration: ${duration} Day(s)
- Travel Style: ${style} (relaxed / balanced / explorer)
- Starting Hub: ${start}
- Traveler Interests: ${interests.join(", ")}

Available monument slugs in Bagalkot:
- badami-cave-temples
- bhutanatha-temples
- pattadakal-group-of-monuments
- virupaksha-temple-pattadakal
- durga-temple-aihole
- lad-khan-temple
- meguti-jain-temple
- mahakuta-temples
- banashankari-temple

Return a strict JSON object with this structure:
{
  "duration": ${duration},
  "style": "${style}",
  "start": "${start}",
  "note": "A brief summary advice for this trip",
  "itinerary": [
    {
      "day": 1,
      "time": "08:30",
      "slug": "one of the monument slugs above or null for meals/transfers",
      "activity": "Actionable description of what to see or do"
    }
  ]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
          maxOutputTokens: 2500,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error ${res.status}`);
    }

    const data = await res.json();
    const parsed = JSON.parse(
      data.candidates?.[0]?.content?.parts?.[0]?.text || "{}"
    );

    // Hydrate monuments into the itinerary items
    const hydratedItinerary = (parsed.itinerary || []).map((item) => {
      const mon = item.slug
        ? monuments.find((m) => m.slug === item.slug)
        : null;
      return {
        time: item.time || "09:00",
        day: item.day || 1,
        monument: mon,
        activity: item.activity,
        isDayHeader: Boolean(item.isDayHeader),
      };
    });

    return NextResponse.json({
      duration: parsed.duration || duration,
      style: parsed.style || style,
      start: parsed.start || start,
      note: parsed.note || "Curated route with realistic transit times.",
      itinerary: hydratedItinerary,
      demo: false,
    });
  } catch (error) {
    console.error("Trip planning API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate plan" },
      { status: 500 }
    );
  }
}
