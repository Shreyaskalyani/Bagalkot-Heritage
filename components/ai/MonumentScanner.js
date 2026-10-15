"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ScanSearch, Upload, Camera, ArrowRight } from "lucide-react";
import { recognizeMonument, isDemoMode } from "@/lib/api";
import ScanAnimation from "./ScanAnimation";
import AIResult from "./AIResult";
import GlassPanel from "@/components/ui/GlassPanel";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/heic"];

const SAMPLE_PRESETS = [
  { name: "Badami Caves", image: "/images/badami-caves-4k.jpg" },
  { name: "Virupaksha Temple", image: "/images/virupaksha-temple.jpg" },
  { name: "Durga Temple Aihole", image: "/images/durga-temple-aihole.jpg" },
  { name: "Mahakuta Temples", image: "/images/mahakuta-temples.jpg" },
];

/**
 * AI Monument Scanner.
 * Upload / drag-and-drop / camera capture → analysis → result.
 * All API traffic goes through lib/api.js (demo fallback included).
 */
export default function MonumentScanner() {
  const [imageData, setImageData] = useState(null); // data URL
  const [stage, setStage] = useState("idle"); // idle → preview → scanning → result → error
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const cameraRef = useRef(null);
  const timerRef = useRef(null);
  const analyzeBtnRef = useRef(null);

  /* ---------------- image handling ---------------- */

  const handleFile = useCallback(async (file) => {
    setError(null);
    setResult(null);

    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      setError("This doesn't appear to be a valid photograph. Please try a JPEG, PNG or WebP image.");
      setStage("error");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("This photograph is too large (over 10 MB). Please try a smaller image.");
      setStage("error");
      return;
    }

    try {
      const dataUrl = await readFileAsDataURL(file);
      setImageData(dataUrl);
      setStage("preview");
    } catch {
      setError("We couldn't read that file. Please try a different photograph.");
      setStage("error");
    }
  }, []);

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Could not read the file"));
      reader.readAsDataURL(file);
    });
  }

  /* ---------------- drag & drop ---------------- */

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  /* ---------------- analysis ---------------- */

  async function analyze() {
    setStage("scanning");
    setProgress(0);

    // Drive the checklist animation while the API resolves
    const timer = setInterval(() => {
      setProgress((p) => (p >= 0.92 ? 0.92 : p + 0.03));
    }, 140);
    timerRef.current = timer;

    try {
      const res = await recognizeMonument(imageData);
      setProgress(1);
      setResult(res);
      setStage("result");
    } catch (err) {
      setError(
        "We couldn't complete the analysis — the AI service is unavailable. You can still explore Bagalkot's heritage."
      );
      setStage("error");
    } finally {
      clearInterval(timer);
      timerRef.current = null;
    }
  }

  // Clear any still-running progress interval if the component unmounts
  // mid-scan (route change)
  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    []
  );

  function reset() {
    setImageData(null);
    setResult(null);
    setError(null);
    setProgress(0);
    setStage("idle");
  }

  /* ---------------- keyboard focus return ---------------- */

  useEffect(() => {
    if (stage === "preview" && analyzeBtnRef.current) {
      analyzeBtnRef.current.focus();
    }
  }, [stage]);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {/* ---------- idle / dropzone ---------- */}
        {stage === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload a photograph of a heritage monument, or drag and drop"
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`group mx-auto flex max-w-2xl cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-300 md:p-16 ${
                dragging
                  ? "border-gold-400 bg-gold-500/10"
                  : "border-stone-400/30 bg-charcoal-900/40 hover:border-gold-500/60 hover:bg-charcoal-900/70"
              }`}
            >
              <span className="grid h-16 w-16 place-items-center rounded-full border border-gold-500/40 text-gold-400 transition-transform duration-300 group-hover:scale-110">
                <ScanSearch size={26} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-display text-2xl text-ivory md:text-3xl">
                Identify a Monument
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-400">
                Upload a photograph of a heritage structure in Bagalkot — the
                AI will identify it and tell its story.
              </p>
              <span className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-950">
                <Upload size={14} strokeWidth={2} aria-hidden="true" />
                Upload Photograph
              </span>
              <p className="mt-4 text-xs text-stone-500">or drag & drop</p>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => cameraRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-full border border-stone-400/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-stone-200 transition-colors hover:border-gold-500/60 hover:text-gold-300"
              >
                <Camera size={14} strokeWidth={1.75} aria-hidden="true" />
                Use Camera
              </button>
              <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
                Official ASI Architectural Dataset
              </span>
            </div>

            {/* Quick-pick sample monument chips */}
            <div className="mt-8 border-t border-stone-400/15 pt-6 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-400">
                Or test with sample monument photography:
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {SAMPLE_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setError(null);
                      setResult(null);
                      setImageData(p.image);
                      setStage("preview");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 px-3.5 py-1.5 text-xs text-stone-200 transition-all hover:border-gold-400 hover:bg-gold-500/15 hover:text-gold-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ---------- preview ---------- */}
        {stage === "preview" && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto max-w-2xl"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
              Image preview
            </p>
            <div className="overflow-hidden rounded-2xl border border-stone-400/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageData}
                alt="Uploaded photograph awaiting AI analysis"
                className="max-h-[420px] w-full object-contain bg-charcoal-950"
              />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={analyze}
                ref={analyzeBtnRef}
                className="flex-1 rounded-full bg-gold-500 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-950 transition-all hover:bg-gold-400 hover:shadow-[0_0_24px_rgba(181,137,56,0.35)]"
              >
                Analyze with AI
              </button>
              <button
                onClick={reset}
                className="rounded-full border border-stone-400/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-200 transition-colors hover:border-gold-500/60"
              >
                Choose another
              </button>
            </div>
          </motion.div>
        )}

        {/* ---------- scanning ---------- */}
        {stage === "scanning" && (
          <motion.div key="scanning" exit={{ opacity: 0 }}>
            <ScanAnimation active={stage === "scanning"} progress={progress} />
          </motion.div>
        )}

        {/* ---------- result ---------- */}
        {stage === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AIResult result={result} onReset={reset} />
          </motion.div>
        )}

        {/* ---------- error ---------- */}
        {stage === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 16 }}
            animate={{opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-2xl"
            role="alert"
          >
            <GlassPanel className="p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
                Something went wrong
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone-200">
                {error}
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={reset}
                  className="rounded-full bg-gold-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-950 transition-colors hover:bg-gold-400"
                >
                  Try Again
                </button>
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-400/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-200 transition-colors hover:border-gold-500/60"
                >
                  Explore heritage
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden file inputs */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = ""; // allow re-selecting the same file
        }}
        aria-label="Upload photograph"
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = ""; // allow re-capturing the same file
        }}
        aria-label="Take a photograph with your camera"
      />
    </div>
  );
}
