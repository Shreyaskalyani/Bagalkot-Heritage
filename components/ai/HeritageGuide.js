"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizontal, Loader2, Sparkles, Globe, MessageSquare } from "lucide-react";
import { chatWithGuide, isDemoMode } from "@/lib/api";
import GlassPanel from "@/components/ui/GlassPanel";

const QUICK_PROMPTS_BY_LANG = {
  en: [
    "Timings & ASI entry fees?",
    "How many caves in Badami?",
    "Waterfalls in Bagalkot",
    "Authentic Jolada Rotti food",
    "Plan a 1-day heritage trip",
    "Who built Virupaksha temple?",
  ],
  kn: [
    "ಸ್ಮಾರಕಗಳ ಪ್ರವೇಶ ಶುಲ್ಕ ಮತ್ತು ಸಮಯ?",
    "ಬಾದಾಮಿಯಲ್ಲಿ ಎಷ್ಟು ಗುಹೆಗಳಿವೆ?",
    "ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ಜಲಪಾತಗಳು",
    "ಅಧಿಕೃತ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ",
    "1 ದಿನದ ಪ್ರವಾಸ ಯೋಜನೆ ನೀಡಿ",
    "ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯವನ್ನು ಯಾರು ನಿರ್ಮಿಸಿದರು?",
  ],
  hi: [
    "स्मारकों का समय एवं प्रवेश शुल्क?",
    "बादामी में कुल कितनी गुफाएं हैं?",
    "बागलकोट के खूबसूरत जलप्रपात",
    "पारंपरिक उत्तर कर्नाटक भोजन",
    "1-दिवसीय यात्रा कार्यक्रम बताएं",
    "पट्टदकल विरूपाक्ष मंदिर किसने बनवाया?",
  ],
};

const GUIDE_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "hi", label: "हिन्दी" },
];

const INITIAL_CONVERSATION = [
  {
    role: "user",
    text: "What am I looking at?",
  },
  {
    role: "ai",
    text: "This appears to be the celebrated 6th-century Cave 3 at Badami, dedicated to Vishnu and consecrated by Chalukya King Mangalesha in 578 CE. The rock-cut sanctuary is famed for its massive four-armed Vishnu seated upon the celestial serpent Adisesha, its intricately carved bracket figures, and the earliest dated inscription in the Deccan.",
    source: "ASI Epigraphia Indica & Monument Inventory",
    demo: true,
  },
];

export default function HeritageGuide() {
  const [messages, setMessages] = useState(INITIAL_CONVERSATION);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [lang, setLang] = useState("en");
  const scrollRef = useRef(null);

  // auto-scroll to newest message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  async function send(text) {
    const question = (text ?? input).trim();
    if (!question || busy) return;

    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setBusy(true);

    try {
      const res = await chatWithGuide(
        [
          ...messages.map((m) => ({ role: m.role, text: m.text })),
          { role: "user", text: question },
        ],
        lang
      );
      const reply =
        typeof res.reply === "string" ? { text: res.reply } : res.reply;
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: reply?.text ?? "",
          source: reply?.source || "ASI Heritage Records",
          demo: res.demo,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: "The AI guide is temporarily unavailable. You can still explore official monuments on the Explore page.",
          error: true,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <GlassPanel className="flex h-[560px] flex-col overflow-hidden rounded-3xl border-gold-500/25 shadow-2xl">
        {/* Header with Title and Language Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 bg-charcoal-950/70 px-6 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400">
              <Sparkles size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ivory">Heritage AI</p>
              <p className="text-[11px] text-stone-400">
                Bagalkot heritage assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Controls */}
            <div className="flex items-center rounded-full border border-stone-800 bg-charcoal-900/90 p-0.5 text-[11px]">
              {GUIDE_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`rounded-full px-2.5 py-0.5 transition-colors ${
                    lang === l.code
                      ? "bg-gold-500 text-charcoal-950 font-bold"
                      : "text-stone-400 hover:text-ivory"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {isDemoMode() && (
              <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-widest text-gold-400">
                Demo
              </span>
            )}
          </div>
        </div>

        {/* Message Thread */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4 font-sans text-sm"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                  m.role === "user"
                    ? "bg-gold-500 text-charcoal-950 font-medium ml-8"
                    : "border border-stone-800 bg-charcoal-900/80 text-stone-200 mr-8 shadow-md"
                }`}
              >
                <p>{m.text}</p>
                {m.source && (
                  <p className="mt-2 text-[10px] font-mono uppercase tracking-wider text-gold-400/90 border-t border-stone-800/80 pt-1.5">
                    Source: {m.source}
                  </p>
                )}
              </div>
            </div>
          ))}

          {busy && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl border border-stone-800 bg-charcoal-900/80 px-4 py-3 text-xs text-stone-400">
                <Loader2 size={14} className="animate-spin text-gold-400" />
                <span>Reading ASI records…</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts Strip */}
        <div className="border-t border-stone-800/80 bg-charcoal-950/60 px-5 py-2.5">
          <p className="text-[10px] uppercase font-mono tracking-wider text-stone-400 mb-1.5 flex items-center gap-1">
            <MessageSquare size={11} className="text-gold-400" /> Suggested Questions:
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {(QUICK_PROMPTS_BY_LANG[lang] || QUICK_PROMPTS_BY_LANG.en).map((prompt) => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                disabled={busy}
                className="whitespace-nowrap rounded-full border border-stone-800 bg-charcoal-900/90 px-3 py-1 text-stone-300 transition-colors hover:border-gold-500/50 hover:text-ivory disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-3 border-t border-stone-800 bg-charcoal-950 px-5 py-3.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Badami, Pattadakal, Aihole, architecture or travel..."
            disabled={busy}
            className="w-full bg-transparent text-sm text-ivory placeholder-stone-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-500 text-charcoal-950 transition-all hover:bg-gold-400 disabled:opacity-40 disabled:hover:bg-gold-500"
            aria-label="Send question"
          >
            <SendHorizontal size={15} />
          </button>
        </form>
      </GlassPanel>
    </div>
  );
}
