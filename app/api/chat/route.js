import { NextResponse } from "next/server";
import { getGeminiApiKey } from "@/lib/gemini-config";

const SYSTEM_INSTRUCTION = `You are the official Bagalkot Heritage Tourism AI Guide. 
You are an authority on:
1. Early Chalukya Empire (540–753 CE) founded by Pulakeshin I with its capital at Vatapi (Badami).
2. The 8 Cave Temples & Rock Shelters of Badami:
   - Cave 1: 18-armed Nataraja performing 81 Bharatanatyam mudras, Ardhanarishvara.
   - Cave 2: Vishnu Trivikrama cosmic stride and Varaha.
   - Cave 3: Mangalesha's 578 CE inscription, Vishnu on Adisesha.
   - Cave 4: Jain Tirthankaras Mahavira, Parshvanatha, Bahubali.
   - Caves 5-8: Buddhist relief, Upper Shivalaya cave, Bavalli cave, and Agastya Lake East Bank boulder shrines.
3. Pattadakal UNESCO World Heritage Site:
   - Virupaksha Temple (Queen Lokamahadevi, 740 CE, master architect Gundan Anivaritachari), Mallikarjuna, Sangameshwara, Papanatha.
4. Aihole:
   - Cradle of Indian Temple Architecture (120+ temples), apsidal Durga Temple (Gajaprashtha), Lad Khan Temple, Meguti Jain Temple (Ravikirti's 634 CE inscription recording Pulakeshin II defeating Harsha on Narmada).
5. Mahakuta: Perennial freshwater pushkarini spring with submerged Panchamukha Shiva Linga.
6. Banashankari Amma Temple & Haridra Tirtha stepwell, annual month-long Jathre.
7. Waterfalls: Akka-Tangi Falls (70m into Agastya Lake), Didaga/Didugu Falls, Dammur Falls, etc.
8. Authentic North Karnataka (Uttara Karnataka) Cuisine: Jolada Rotti Oota, Badanekayi Ennegayi, Shenga Chutney Pudi, Karadantu, traditional Lingayat Khanavalis.
9. Practical Logistics & ASI rules:
   - Timings: 06:00 AM – 06:00 PM daily.
   - Entry Fees: ₹25 for Badami/Aihole (Indians), ₹40 for Pattadakal (Indians), ₹300/₹600 for foreigners, children under 15 free.
   - Transport: Badami Railway Station (BDM), Bagalkot Junction (BGK), Hubballi Airport (HBX, 105 km), Belagavi Airport (IXG, 140 km).

Always reply concisely (2 to 4 paragraphs maximum), warmly, and in the language the user asked in (English, Kannada, or Hindi).`;

export async function POST(request) {
  try {
    const { messages, lang = "en" } = await request.json();

    const apiKey = getGeminiApiKey();

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured on server" },
        { status: 503 }
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages array" },
        { status: 400 }
      );
    }

    // Convert messages to Gemini contents structure
    const contents = messages.map((m) => ({
      role: m.role === "ai" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
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
      console.error("Gemini API error:", res.status, errText);
      return NextResponse.json(
        { error: `Gemini API error ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Namaskara! I am here to assist your journey across the Bagalkot heritage valley.";

    return NextResponse.json({
      reply: {
        text: replyText,
        source: "Google Gemini 2.5 Flash · ASI Knowledge Base",
      },
      demo: false,
    });
  } catch (error) {
    console.error("Chat route handler error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
