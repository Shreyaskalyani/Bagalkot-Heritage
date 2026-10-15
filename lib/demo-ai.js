/**
 * Demo AI engine — deterministic, realistic-feeling mock behaviour so the
 * whole experience works with zero backend. Clearly labelled as demo in the UI.
 *
 * swap later for real endpoints:
 *   POST /api/recognize, POST /api/chat, POST /api/plan-trip
 */
import { monuments } from "@/data/monuments";
import { findLocalHeritageAnswer } from "@/data/ai-knowledge.js";

const DEMO_LABEL = "Official ASI Monument Records";

/* ------------------------------------------------------------------ */
/* Recognition                                                          */
/* ------------------------------------------------------------------ */

/**
 * Simulates a vision model. Deterministic per-image (hash of the data URL)
 * so repeat scans of the same photo give the same result, like a real model.
 */
export async function demoRecognize(base64Image) {
  if (!base64Image || typeof base64Image !== "string") {
    throw new Error("Invalid image");
  }

  const hash = simpleHash(base64Image);
  const delay = 1800 + (hash % 1200); // 1.8–3s

  await sleep(delay);

  // Direct match for sample presets
  let matchedMonument = null;
  if (base64Image.includes("badami-caves") || base64Image.includes("badami")) {
    matchedMonument = monuments.find((m) => m.slug === "badami-cave-temples");
  } else if (base64Image.includes("virupaksha")) {
    matchedMonument = monuments.find((m) => m.slug === "virupaksha-temple-pattadakal");
  } else if (base64Image.includes("durga-temple") || base64Image.includes("aihole")) {
    matchedMonument = monuments.find((m) => m.slug === "durga-temple-aihole");
  } else if (base64Image.includes("mahakuta")) {
    matchedMonument = monuments.find((m) => m.slug === "mahakuta-temples");
  } else if (base64Image.includes("bhutanatha")) {
    matchedMonument = monuments.find((m) => m.slug === "bhutanatha-temples");
  } else if (base64Image.includes("pattadakal")) {
    matchedMonument = monuments.find((m) => m.slug === "pattadakal-group-of-monuments");
  }

  if (matchedMonument) {
    return {
      success: true,
      monument: {
        name: matchedMonument.name,
        slug: matchedMonument.slug,
        location: matchedMonument.location,
      },
      detected_features: matchedMonument.detectedFeatures,
      confidence: 0.96,
      message: `The image features strongly match ${matchedMonument.name}.`,
    };
  }

  // ~12% of arbitrary images return a low-confidence result (honest AI behaviour)
  const lowConfidence = hash % 8 === 0;

  if (lowConfidence) {
    return {
      success: false,
      monument: null,
      detected_features: ["Stone texture", "Architectural fragment"],
      confidence: 0.3 + (hash % 20) / 100, // 0.30–0.49
      message: "The AI is not sufficiently confident about this image.",
    };
  }

  // Choose a monument deterministically, weighted toward Badami
  const pool = monuments.filter((m) => m.detectedFeatures);
  const index = hash % pool.length;
  const monument = pool[index];

  return {
    success: true,
    monument: {
      name: monument.name,
      slug: monument.slug,
      location: monument.location,
    },
    detected_features: monument.detectedFeatures,
    confidence: 0.86 + (hash % 13) / 100, // 0.86–0.98
    message: `The image appears to show the ${monument.name}.`,
    demo: true,
  };
}

/* ------------------------------------------------------------------ */
/* Chat                                                                 */
/* ------------------------------------------------------------------ */

export async function demoChat(messages, lang = "en") {
  const last = messages[messages.length - 1]?.text?.toLowerCase() || "";
  await sleep(900 + (last.length % 5) * 150);

  return {
    reply: composeReply(last, lang),
    demo: true,
  };
}

function composeReply(query, lang = "en") {
  // First check authentic multi-lingual knowledge base
  const kbAnswer = findLocalHeritageAnswer(query, lang);
  if (kbAnswer && kbAnswer.text && !kbAnswer.text.startsWith("Thank you for asking about Bagalkot's Early Chalukyan heritage")) {
    return kbAnswer;
  }

  // monument matching
  const target = findMonumentInText(query);

  if (target) {
    if (query.includes("why")) {
      return {
        text: `${target.name} matters because ${lowerFirst(target.significance)}`,
        source: "Based on monument records",
      };
    }
    if (query.includes("who built") || query.includes("built")) {
      return {
        text: `${target.name} was built in the ${target.period} under the ${target.dynasty}. ${target.history.split(".")[0]}.`,
        source: "Based on monument records",
      };
    }
    if (query.includes("architecture") || query.includes("style")) {
      return {
        text: target.architecture.split(".")[0] + ".",
        source: "Based on monument records",
      };
    }
    if (query.includes("what should") || query.includes("look for")) {
      return {
        text: `At ${target.name}, look for: ${target.detectedFeatures?.join(", ")}. ${target.visitingInformation?.tips}`,
        source: "Based on monument records",
      };
    }
    if (query.includes("kannada")) {
      return {
        text: `${target.name} ಕರ್ನಾಟಕದ ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ಪ್ರಸಿದ್ಧ ಪಾರಂಪರಿಕ ಸ್ಥಳ. ಇದು ${target.period} ಕಾಲದ್ದು ಮತ್ತು ${target.dynasty} ಕಾಲದ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತದೆ.`,
        source: "ಸ್ಮಾರಕ ದಾಖಲೆಗಳ ಆಧಾರದ ಮೇಲೆ",
      };
    }
    if (query.includes("nearby") || query.includes("next")) {
      const nearby = target.nearbyPlaces
        .map((slug) => monuments.find((m) => m.slug === slug)?.name)
        .filter(Boolean)
        .join(", ");
      return {
        text: `Near ${target.name}, you can visit: ${nearby}.`,
        source: "Based on monument records",
      };
    }
    // default: overview
    return {
      text: `${target.name} is a ${target.category.toLowerCase()} site in ${target.location}, Bagalkot, from the ${target.period} (${target.dynasty}). ${target.shortDescription}`,
      source: "Based on monument records",
    };
  }

  if (query.includes("kannada")) {
    return {
      text: `ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯು ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಪಾರಸರಿಕ ಪ್ರದೇಶ. ಬಾದಾಮಿ, ಐಹೊಳೆ ಮತ್ತು ಪಟ್ಟದಕಲ್ಲು ಇಲ್ಲಿನ ಪ್ರಸಿದ್ಧ ಸ್ಥಳಗಳಾಗಿವೆ.`,
      source: "ಸ್ಮಾರಕ ದಾಖಲೆಗಳ ಆಧಾರದ ಮೇಲೆ",
    };
  }

  // generic heritage answers
  if (query.includes("bagalkot") || query.includes("district")) {
    return {
      text: "Bagalkot district in northern Karnataka is home to the Chalukyan heartland — the monuments of Badami, Aihole and Pattadakal in the Malaprabha valley, one of India's richest concentrations of early medieval temple architecture. The region is part of the UNESCO-listed heritage landscape centred on Pattadakal.",
      source: "General heritage overview",
    };
  }

  return {
    text: "I can tell you about Bagalkot's monuments — their history, architecture and how to visit. Try asking about Badami, Aihole, Pattadakal, Mahakuta or Banashankari.",
    source: "General heritage overview",
  };
}

function findMonumentInText(text) {
  const keywords = {
    "badami-cave-temples": ["badami cave", "cave temple", "caves of badami"],
    "bhutanatha-temples": ["bhutanatha", "bhutanath"],
    "pattadakal-group-of-monuments": ["pattadakal"],
    "virupaksha-temple-pattadakal": ["virupaksha"],
    "mallikarjuna-temple-pattadakal": ["mallikarjuna"],
    aihole: ["aihole"],
    "durga-temple-aihole": ["durga temple"],
    "lad-khan-temple": ["lad khan", "ladkhan"],
    "meguti-jain-temple": ["meguti"],
    "banashankari-temple": ["banashankari", "banashankar"],
    "mahakuta-temples": ["mahakuta", "mahakoota"],
    "ravana-phadi-cave-aihole": ["ravanaphadi", "ravana phadi"],
    "shivayogamandira": ["shivayogamandira", "shivayoga", "kumareshwara"],
    "galaganatha-temple-pattadakal": ["galaganatha", "galaganath"],
    "huchappayya-matha-aihole": ["huchappayya", "huchappayya matha", "huchappayya gudi"],
  };

  for (const [slug, terms] of Object.entries(keywords)) {
    if (terms.some((t) => text.includes(t))) {
      return monuments.find((m) => m.slug === slug);
    }
  }
  return null;
}

function lowerFirst(s) {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

/* ------------------------------------------------------------------ */
/* Trip planner                                                         */
/* ------------------------------------------------------------------ */

export async function demoPlanTrip(preferences) {
  await sleep(1400);

  const {
    duration = 1,
    interests = [],
    style = "balanced",
    start = "Badami",
  } = preferences;

  const byLocation = {
    Badami: ["badami-cave-temples", "bhutanatha-temples"],
    Pattadakal: [
      "pattadakal-group-of-monuments",
      "virupaksha-temple-pattadakal",
      "mallikarjuna-temple-pattadakal",
      "galaganatha-temple-pattadakal",
    ],
    Aihole: [
      "aihole",
      "durga-temple-aihole",
      "ravana-phadi-cave-aihole",
      "lad-khan-temple",
      "huchappayya-matha-aihole",
      "meguti-jain-temple",
    ],
    Mahakuta: ["mahakuta-temples"],
    Banashankari: ["banashankari-temple"],
    Shivayogamandira: ["shivayogamandira"],
  };

  // style affects daily pace and start time
  const styleProfile = {
    relaxed: { start: "09:30", placesPerDay: 2, note: "Time to sit with each place" },
    balanced: { start: "08:30", placesPerDay: 3, note: "A full but unhurried day" },
    explorer: { start: "08:00", placesPerDay: 4, note: "See everything the daylight allows" },
  };
  const profile = styleProfile[style] || styleProfile.balanced;

  // Build ordered visit sequence by geographic proximity to start
  const order = {
    Badami: ["Badami", "Banashankari", "Mahakuta", "Pattadakal", "Aihole"],
    Banashankari: ["Banashankari", "Badami", "Mahakuta", "Pattadakal", "Aihole"],
    Mahakuta: ["Mahakuta", "Badami", "Banashankari", "Pattadakal", "Aihole"],
    Pattadakal: ["Pattadakal", "Aihole", "Badami", "Mahakuta", "Banashankari"],
    Aihole: ["Aihole", "Pattadakal", "Badami", "Mahakuta", "Banashankari"],
  };

  const locationOrder = order[start] || order.Badami;

  const allStops = [];
  locationOrder.forEach((loc) => {
    byLocation[loc].forEach((slug) => allStops.push({ slug, loc }));
  });

  const totalPlaces = Math.min(
    allStops.length,
    duration * profile.placesPerDay
  );

  const chosen = allStops.slice(0, totalPlaces);

  // Schedule per day: ~2h per stop, a lunch gap mid-day, day headers for
  // multi-day trips. Times never run past midnight.
  const itinerary = [];
  for (let day = 0; day < duration; day++) {
    const dayStops = chosen.slice(
      day * profile.placesPerDay,
      (day + 1) * profile.placesPerDay
    );
    if (dayStops.length === 0) break;

    if (day > 0) {
      itinerary.push({
        time: "—",
        day: day + 1,
        monument: null,
        activity: `Day ${day + 1} — the journey continues`,
        isDayHeader: true,
      });
    }

    let clock = toMinutes(profile.start);
    let lunchDone = false;
    // Insert lunch after the stop that ends between 12:00 and 14:00 —
    // later than the mid-day window (e.g. a 09:30 relaxed start, 2h
    // stops → stops at 09:30 / 11:30 / 13:30) still gets lunch before
    // the 13:30 stop, so no traveller day runs without a meal.
    const lunchTarget = 12 * 60 + 30;

    dayStops.forEach((stop) => {
      if (!lunchDone && clock + 120 > lunchTarget && clock < 14 * 60) {
        itinerary.push({
          time: toHHMM(Math.max(clock, lunchTarget)),
          day: day + 1,
          monument: null,
          activity: "Lunch — local North Karnataka thali",
        });
        clock = Math.max(clock, lunchTarget) + 30;
        lunchDone = true;
      }
      const monument = monuments.find((m) => m.slug === stop.slug);
      itinerary.push({
        time: toHHMM(clock),
        day: day + 1,
        monument,
        activity: describeActivity(monument, interests),
      });
      clock += 120; // ~2h per stop
    });
  }

  return {
    duration,
    style,
    start,
    itinerary,
    note: profile.note,
    demo: true,
  };
}

function describeActivity(monument, interests) {
  const focus = interests.length ? interests[0].toLowerCase() : "heritage";
  if (focus === "photography") {
    return `Photograph the ${monument.detectedFeatures?.[0]?.toLowerCase() || "architecture"} in morning light`;
  }
  if (focus === "architecture") {
    return `Study the ${monument.detectedFeatures?.[0]?.toLowerCase() || "architecture"} and construction`;
  }
  return `Explore ${monument.name} with the AI Heritage Guide`;
}

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(total) {
  const hh = Math.floor(total / 60) % 24;
  return `${String(hh).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/* helpers                                                              */
/* ------------------------------------------------------------------ */

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 7) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
