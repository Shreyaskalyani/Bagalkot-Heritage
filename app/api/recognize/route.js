import { NextResponse } from "next/server";
import { getGeminiApiKey } from "@/lib/gemini-config";
import { monuments } from "@/data/monuments";

export async function POST(request) {
  try {
    const { image } = await request.json();

    const apiKey = getGeminiApiKey();

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured on server" },
        { status: 503 }
      );
    }

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Invalid image provided" },
        { status: 400 }
      );
    }

    // Extract mime type and raw base64 data
    let mimeType = "image/jpeg";
    let rawBase64 = image;

    if (image.startsWith("data:")) {
      const match = image.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        mimeType = match[1];
        rawBase64 = match[2];
      }
    }

    const promptText = `Analyze this image to determine if it shows a historical monument, temple, rock cave, sculpture, waterfall, or heritage structure in or around Bagalkot district, Karnataka, India (e.g., Badami Cave Temples, Bhutanatha Temple, Agastya Lake, Virupaksha or Mallikarjuna at Pattadakal, Durga Temple or Lad Khan at Aihole, Mahakuta, Banashankari, Kudalasangama, Akka-Tangi Falls, etc.).

Output a valid JSON object with the following fields:
{
  "identified": boolean,
  "monumentName": "Name of monument (e.g. Badami Cave Temples, Durga Temple Aihole, etc.)",
  "slug": "one of: badami-cave-temples, bhutanatha-temples, pattadakal-group-of-monuments, virupaksha-temple-pattadakal, mallikarjuna-temple-pattadakal, durga-temple-aihole, lad-khan-temple, meguti-jain-temple, mahakuta-temples, banashankari-temple, kudalasangama, almatti-dam (or null if not matching these)",
  "location": "e.g. Badami / Pattadakal / Aihole / Mahakuta",
  "detectedFeatures": ["list", "of", "4", "specific", "architectural", "elements", "spotted"],
  "confidence": number between 0.50 and 0.99,
  "description": "2-3 informative sentences about this structure, its century, dynasty and architectural significance."
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType,
                data: rawBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
        maxOutputTokens: 2048,
      },
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini Vision error:", res.status, errText);
      return NextResponse.json(
        { error: `Gemini Vision error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const rawJsonStr = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(rawJsonStr || "{}");

    // Match with local monument if possible for rich metadata
    let matchedMonument = monuments.find((m) => m.slug === parsed.slug);
    if (!matchedMonument && parsed.monumentName) {
      matchedMonument = monuments.find(
        (m) =>
          m.name.toLowerCase().includes(parsed.monumentName.toLowerCase()) ||
          parsed.monumentName.toLowerCase().includes(m.name.toLowerCase())
      );
    }

    return NextResponse.json({
      success: parsed.identified !== false,
      monument: {
        name: matchedMonument ? matchedMonument.name : parsed.monumentName,
        slug: matchedMonument ? matchedMonument.slug : parsed.slug,
        location: matchedMonument ? matchedMonument.location : parsed.location,
      },
      detected_features:
        parsed.detectedFeatures ||
        matchedMonument?.detectedFeatures || [
          "Sandstone masonry",
          "Chalukyan relief",
        ],
      confidence: parsed.confidence || 0.92,
      message:
        parsed.description ||
        `Identified ${parsed.monumentName || "monument"} with high confidence via Gemini Vision.`,
      demo: false,
    });
  } catch (error) {
    console.error("Vision recognition error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process image recognition" },
      { status: 500 }
    );
  }
}
