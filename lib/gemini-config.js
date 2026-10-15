import fs from "fs";
import path from "path";

let cachedKey = null;

export function getGeminiApiKey() {
  if (cachedKey) return cachedKey;

  // 1. Try custom bagalkot env var
  if (process.env.BAGALKOT_AI_KEY && !process.env.BAGALKOT_AI_KEY.includes("B71r-3TP")) {
    cachedKey = process.env.BAGALKOT_AI_KEY.trim();
    return cachedKey;
  }

  // 2. Try parsing .env.local file directly on server to avoid stale machine-level env vars
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      const match = content.match(/GEMINI_API_KEY=([^\r\n#]+)/) || content.match(/AI_API_KEY=([^\r\n#]+)/);
      if (match && match[1]) {
        const parsedKey = match[1].trim();
        if (parsedKey && !parsedKey.includes("B71r-3TP")) {
          cachedKey = parsedKey;
          return cachedKey;
        }
      }
    }
  } catch (err) {
    // ignore filesystem read error in restricted runtimes
  }

  // 3. Fallback to process.env if not the invalid stale key
  const envKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (envKey && !envKey.includes("B71r-3TP")) {
    cachedKey = envKey.trim();
    return cachedKey;
  }

  return null;
}
