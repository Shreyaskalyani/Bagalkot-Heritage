"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, RotateCcw, BookOpen, Quote, Sparkles } from "lucide-react";
import { CULINARY_STORIES } from "@/data/food-culture";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassPanel from "@/components/ui/GlassPanel";
import { useLanguage } from "@/context/LanguageContext";
import { getHeritageAudioEngine } from "@/lib/heritage-audio";

const FOOD_NARRATION = {
  en: "Listen to the rhythmic cadence of the North Karnataka kitchen. For over a thousand years, across the red dirt fields of Bagalkot, the hearth has nourished generations with white jowar rotis patted by hand into paper-thin disks on an iron tava. Savour the pungent spice of stuffed brinjal ennegayi simmering with roasted peanuts, black sesame, garlic, and fiery Byadgi chillies. In every Lingayat khanavali, hospitality is sacred: a fresh banana leaf, a pinch of shenga chutney pudi, and a ladle of churned white butter offered with reverence.",
  kn: "ಉತ್ತರ ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ಅಡುಗೆ ಮನೆಯ ನಾದವನ್ನು ಆಲಿಸಿ. ಸಹಸ್ರಾರು ವರ್ಷಗಳಿಂದ ಬಾಗಲಕೋಟೆಯ ಹಳ್ಳಿಗಳಲ್ಲಿ ರೊಟ್ಟಿ ತಟ್ಟುವ ಲಯಬದ್ಧ ಸದ್ದು ನಿರಂತರವಾಗಿದೆ. ಕೆಂಡದ ಮೇಲಿನ ಕಾವಲಿಯ ಮೇಲೆ ಹಗುರವಾಗಿ ಹಾರುವ ಬಿಳಿ ಜೋಳದ ರೊಟ್ಟಿ, ಹುರಿದ ಶೇಂಗಾ ಮತ್ತು ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿಯ ಸುವಾಸನೆ ಬೀರುವ ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ, ಮತ್ತು ಖಾನಾವಳಿಯ ಬಾಳೆಎಲೆಯ ಮೇಲೆ ಬಡಿಸುವ ಗಟ್ಟಿ ಮೊಸರು, ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ ಹಾಗೂ ಬೆಣ್ಣೆ — ಇದು ಕೇವಲ ಊಟವಲ್ಲ, ಚಾಲುಕ್ಯರ ನಾಡಿನ ಅತಿಥಿ ಸತ್ಕಾರದ ಪರಂಪರೆ.",
  hi: "उत्तर कर्नाटक के पारंपरिक रसोई के सुरम्य वातावरण का अनुभव करें। सदियों से बागलकोट की धरती पर हाथ से थपथापकर बनाई गई पतली ज्वार की रोटियां और तवे पर सिकने की सौंधी खुशबू गाँव-गाँव गूँजती रही है। भुनी हुई मूँगफली, लहसुन और ब्याड़गी मिर्च के तीखे स्वाद में बनी बादामी एन्नेगायी बैंगन की सब्जी, और केले के पत्ते पर परोसा गया शुद्ध मक्खन व शेंगा चटनी — यह उत्तर कर्नाटक की अमर आतिथ्य परंपरा है।",
};

export default function FoodStory() {
  const { currentLang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(55);
  const [isMuted, setIsMuted] = useState(false);

  const langKey = currentLang === "kn" ? "kn" : currentLang === "hi" ? "hi" : "en";

  useEffect(() => {
    return () => {
      const engine = getHeritageAudioEngine();
      if (engine) engine.stop();
    };
  }, []);

  const playFoodNarration = () => {
    const engine = getHeritageAudioEngine();
    if (!engine) return;

    const textToSpeak = FOOD_NARRATION[langKey] || FOOD_NARRATION.en;

    setCurrentTime(0);
    setIsPlaying(true);
    setIsPaused(false);

    engine.speak({
      text: textToSpeak,
      lang: langKey,
      callbacks: {
        onStart: ({ totalSecs }) => {
          setTotalDuration(totalSecs);
          setIsPlaying(true);
          setIsPaused(false);
        },
        onProgress: ({ elapsed, totalSecs }) => {
          setCurrentTime(elapsed);
          setTotalDuration(totalSecs);
        },
        onEnd: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setCurrentTime(0);
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
      },
    });
  };

  const togglePlay = () => {
    const engine = getHeritageAudioEngine();
    if (!engine) return;

    if (!isPlaying) {
      playFoodNarration();
    } else if (isPlaying && !isPaused) {
      engine.pause();
      setIsPaused(true);
    } else if (isPlaying && isPaused) {
      engine.resume();
      setIsPaused(false);
    }
  };

  const handleReset = () => {
    const engine = getHeritageAudioEngine();
    if (engine) engine.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
  };

  const handleToggleMute = () => {
    const engine = getHeritageAudioEngine();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (engine) engine.setMute(nextMuted);
  };

  const formatSecs = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const progressPct = totalDuration > 0 ? Math.min(100, (currentTime / totalDuration) * 100) : 0;

  return (
    <section className="py-24 md:py-32 bg-charcoal-950" aria-label="Culinary Lore and Audio Story">
      <div className="mx-auto max-w-7xl px-5 md:px-8 space-y-16">
        {/* Documentary Prose Showcase */}
        <div className="rounded-3xl border border-gold-500/25 bg-gradient-to-b from-charcoal-900 to-charcoal-950 p-8 sm:p-14">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Quote size={40} className="mx-auto text-gold-500/40" />

            <h2 className="font-display text-3xl sm:text-5xl font-light text-ivory tracking-tight leading-tight">
              You can see Bagalkot in stone.
              <span className="block text-gold-400 font-normal">You can taste it in jowar.</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
              Empire upon empire rose and fell beside the Malaprabha — Early Chalukyas, Rashtrakutas, Kalyani Chalukyas, Vijayanagara, and Adil Shahis. The sandstone temples stood silent witness as dynasties dissolved. Yet throughout every change of sovereign crown, the village hearth remained constant: the hand slapping out white sorghum dough, the fragrance of roasted peanuts and Byadgi chillies, and the warmth of a banana leaf offered to a wandering guest.
            </p>

            {/* Audio Guide Narration Player */}
            <div className="mt-8 rounded-2xl border border-gold-500/35 bg-charcoal-950/90 p-5 backdrop-blur-md max-w-md mx-auto text-left shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="grid h-10 w-10 place-items-center rounded-full bg-gold-500 text-charcoal-950 shadow-md hover:bg-gold-400 transition-all active:scale-95"
                    aria-label={isPlaying && !isPaused ? "Pause audio narration" : "Play audio narration"}
                  >
                    {isPlaying && !isPaused ? (
                      <Pause size={16} />
                    ) : (
                      <Play size={16} className="ml-0.5" fill="currentColor" />
                    )}
                  </button>

                  <div>
                    <p className="text-xs font-semibold text-ivory">
                      Sounds of the Hearth
                    </p>
                    <p className="text-[10px] text-stone-400 font-mono">
                      Village Kitchen Ambiance &amp; Folklore
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className="p-1 text-stone-400 hover:text-gold-400 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-1 text-stone-400 hover:text-ivory transition-colors"
                    aria-label="Restart audio track"
                  >
                    <RotateCcw size={13} />
                  </button>
                  <span className="text-[11px] font-mono text-gold-400 ml-1">
                    {formatSecs(currentTime)} / {formatSecs(totalDuration)}
                  </span>
                </div>
              </div>

              {/* Progress Scrubber */}
              <div className="mt-4 relative h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-gold-400 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Lore Pillars */}
        <div className="grid gap-6 md:grid-cols-3">
          {CULINARY_STORIES.map((story) => (
            <GlassPanel key={story.title} className="p-7 space-y-4">
              <div className="flex items-center gap-2 text-gold-400">
                <BookOpen size={16} />
                <h3 className="font-display text-lg text-ivory">{story.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-stone-300 font-sans">
                {story.text}
              </p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
