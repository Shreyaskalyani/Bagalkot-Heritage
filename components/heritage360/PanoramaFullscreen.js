"use client";

import { useEffect } from "react";
import { X, Minimize } from "lucide-react";

export default function PanoramaFullscreen({
  isFullscreen,
  onClose,
  title,
  children,
}) {
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isFullscreen, onClose]);

  if (!isFullscreen) return null;

  return (
    <div
      className="fixed inset-0 z-[var(--z-dialog)] bg-charcoal-950 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} Fullscreen 360 View`}
    >
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 z-50 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-charcoal-950/90 via-charcoal-950/40 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400">
            360° Heritage Fullscreen Cinema
          </span>
          <h3 className="font-display text-lg md:text-xl text-ivory">{title}</h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-gold-500/40 bg-charcoal-950/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ivory hover:bg-gold-500 hover:text-charcoal-950 transition-all backdrop-blur-md"
          title="Exit Fullscreen (Escape)"
        >
          <Minimize size={14} />
          <span>Exit Fullscreen</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
