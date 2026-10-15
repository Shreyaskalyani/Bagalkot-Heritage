/**
 * Glassmorphism panel used for HUD/AI overlays.
 * Border tone is configurable for light or dark contexts.
 */
export default function GlassPanel({ children, className = "", tone = "dark" }) {
  const tones = {
    dark: "bg-charcoal-950/60 border-gold-500/20",
    light: "bg-ivory/8 border-ivory/15",
  };

  return (
    <div
      className={`rounded-2xl border backdrop-blur-xl ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
