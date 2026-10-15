/**
 * Centralized API service for Bagalkot Heritage AI.
 *
 * All network calls live here — components never call fetch directly.
 * When NEXT_PUBLIC_API_URL is unset or the backend is unreachable, every
 * function falls back to local demo data so the site works fully offline.
 *
 * Server-side env (never client-exposed):
 *   AI_API_URL, AI_API_KEY  → real vision/chat backend
 *   NEXT_PUBLIC_API_URL     → optional custom backend origin
 *   NEXT_PUBLIC_DEMO_MODE   → "true" forces demo responses
 */

import { monuments } from "@/data/monuments";
import { events } from "@/data/events";
import {
  demoRecognize,
  demoChat,
  demoPlanTrip,
} from "@/lib/demo-ai";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const DEMO_MODE =
  process.env.NEXT_PUBLIC_DEMO_MODE === "true"; // default: live mode if not explicitly "true"

async function request(path, { method = "GET", body, timeout = 25000 } = {}) {
  if (DEMO_MODE) throw new DemoFallbackError();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const url = API_URL ? `${API_URL}${path}` : path;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export class DemoFallbackError extends Error {
  constructor() {
    super("Using local demo data");
    this.name = "DemoFallbackError";
  }
}

export const isDemoMode = () => DEMO_MODE;

/* ------------------------------------------------------------------ */
/* Monuments                                                           */
/* ------------------------------------------------------------------ */

export async function getMonuments() {
  try {
    return await request("/api/monuments");
  } catch {
    return monuments; // demo fallback (immediate)
  }
}

export async function getMonument(slug) {
  try {
    return await request(`/api/monuments/${slug}`);
  } catch {
    const m = monuments.find((m) => m.slug === slug);
    if (!m) throw new Error("Monument not found");
    return m;
  }
}

/* ------------------------------------------------------------------ */
/* AI recognition — POST /api/recognize                                */
/* ------------------------------------------------------------------ */

/**
 * Sends a base64 image to the recognition endpoint.
 * Expected response:
 * {
 *   success: true,
 *   monument: { name, slug, confidence },
 *   detected_features: [...],
 *   message: "..."
 * }
 */
export async function recognizeMonument(base64Image) {
  try {
    return await request("/api/recognize", {
      method: "POST",
      body: { image: base64Image },
      timeout: 20000,
    });
  } catch (err) {
    if (err instanceof DemoFallbackError) {
      return demoRecognize(base64Image);
    }
    throw err; // real network failure — surface a friendly error upstream
  }
}

/* ------------------------------------------------------------------ */
/* Heritage guide chat — POST /api/chat                                */
/* ------------------------------------------------------------------ */

export async function chatWithGuide(messages, lang = "en") {
  try {
    return await request("/api/chat", {
      method: "POST",
      body: { messages, lang },
      timeout: 20000,
    });
  } catch (err) {
    if (err instanceof DemoFallbackError) {
      return demoChat(messages, lang);
    }
    throw err;
  }
}

/* ------------------------------------------------------------------ */
/* Trip planner — POST /api/plan-trip                                  */
/* ------------------------------------------------------------------ */

export async function createTripPlan(preferences) {
  try {
    return await request("/api/plan-trip", {
      method: "POST",
      body: preferences,
    });
  } catch (err) {
    if (err instanceof DemoFallbackError) {
      return demoPlanTrip(preferences);
    }
    throw err;
  }
}

/* ------------------------------------------------------------------ */
/* Events — GET /api/events                                            */
/* ------------------------------------------------------------------ */

export async function getEvents() {
  try {
    return await request("/api/events");
  } catch {
    return events; // sample events, clearly labelled
  }
}
