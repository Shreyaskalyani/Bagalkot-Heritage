"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { Play, Pause, Volume2, VolumeX, Headphones, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getHeritageAudioEngine } from "@/lib/heritage-audio";

const AUDIO_TRACKS = [
  {
    id: "badami",
    title: {
      en: "Badami Cave Temples: The Cliff Excavations",
      kn: "ಬಾದಾಮಿ ಗುಹಾಲಯಗಳು: ಶಿಲಾ ಕೊರೆತದ ಅದ್ಭುತ",
      hi: "बादामी गुहा मंदिर: पाषाण शिल्प की अमर गाथा",
    },
    narrator: {
      en: "Official ASI Heritage Guide",
      kn: "ಭಾರತೀಯ ಪುರಾತತ್ವ ಇಲಾಖೆಯ ಅಧಿಕೃತ ಧ್ವನಿ",
      hi: "भारतीय पुरातत्व सर्वेक्षण आधिकारिक गाइड",
    },
    location: {
      en: "Badami, Caves 1 – 4",
      kn: "ಬಾದಾಮಿ, ಗುಹೆ ೧ – ೪",
      hi: "बादामी, गुफा 1 – 4",
    },
    chapterTag: {
      en: "Badami",
      kn: "ಬಾದಾಮಿ",
      hi: "बादामी",
    },
    narration: {
      en: "Welcome to the cliff excavations of Badami, the ancient capital of Vatapi. In the sixth century, under the Early Chalukyan kings, master stone carvers carved four magnificent temple halls directly into the sheer red sandstone bluffs overlooking Agastya Lake. In Cave One, behold the eighteen-armed dancing Shiva performing eighty-one Bharatanatyam mudras. Higher up the cliff, Cave Three preserves King Mangalesha’s royal inscription from 578 CE, honoring Vishnu reclining upon the serpent Adisesha. Here, Hindu and Jain sanctuaries stand side by side, carved from living rock in an everlasting testament to Deccan craftsmanship.",
      kn: "ವಾತಾಪಿಯ ರಾಜಧಾನಿಯಾದ ಬಾದಾಮಿಯ ಶಿಲಾ ಗುಹಾಲಯಗಳಿಗೆ ಸ್ವಾಗತ. ಆರನೇ ಶತಮಾನದಲ್ಲಿ ಚಾಲುಕ್ಯ ಅರಸರ ಆಶ್ರಯದಲ್ಲಿ ಅಗಸ್ತ್ಯ ತೀರ್ಥದ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬಂಡೆಗಳನ್ನು ಕೊರೆದು ನಾಲ್ಕು ಭವ್ಯ ಗುಹೆಗಳನ್ನು ನಿರ್ಮಿಸಲಾಯಿತು. ಮೊದಲನೇ ಗುಹೆಯಲ್ಲಿ ೮೧ ಭರತನಾಟ್ಯ ಮುದ್ರೆಗಳನ್ನು ಪ್ರದರ್ಶಿಸುವ ಹದಿನೆಂಟು ತೋಳುಗಳ ನಟರಾಜನನ್ನು ಕಾಣಬಹುದು. ಮೂರನೇ ಗುಹೆಯಲ್ಲಿ ಮಂಗಳೇಶ ರಾಜನ ಕ್ರಿ.ಶ ೫೭೮ ರ ಶಾಸನ ಹಾಗೂ ಅನಂತಶೇಷನ ಮೇಲಿನ ವಿಷ್ಣುವಿನ ಶಿಲ್ಪವಿದೆ. ಈ ಪವಿತ್ರ ಬೆಟ್ಟದಲ್ಲಿ ಶೈವ, ವೈಷ್ಣವ ಮತ್ತು ಜೈನ ತೀರ್ಥಂಕರರ ಗುಹೆಗಳು ಸಾಮರಸ್ಯದಿಂದ ನೆಲೆಸಿವೆ.",
      hi: "बादामी की ऐतिहासिक गुफाओं में आपका स्वागत है। छठी शताब्दी में आरंभिक चालुक्य शासकों ने अगस्त्य झील के किनारे विशाल लाल बलुआ पत्थर की चट्टानों को तराशकर इन भव्य गुहा मंदिरों का निर्माण कराया। गुफा एक में अठारह भुजाओं वाले भगवान शिव का नटराज स्वरूप 81 भरतनाट्यम मुद्राओं को दर्शाता है। गुफा तीन में राजा मंगलेश का 578 ईस्वी का शिलालेख और शेषनाग पर विराजमान भगवान विष्णु की अद्भुत प्रतिमा है। यहाँ शैव, वैष्णव और जैन परंपराएं एक ही पर्वत पर जीवंत हैं।",
    },
  },
  {
    id: "pattadakal",
    title: {
      en: "Pattadakal: The Sacred Malaprabha Confluence",
      kn: "ಪಟ್ಟದಕಲ್ಲು: ಪವಿತ್ರ ಮಲಪ್ರಭಾ ಸಂಗಮದ ದೇವಾಲಯಗಳು",
      hi: "पत्तदकल: पवित्र मलप्रभा संगम एवं राज्याभिषेक पीठ",
    },
    narrator: {
      en: "UNESCO Site Historian",
      kn: "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ಇತಿಹಾಸಕಾರರು",
      hi: "यूनेस्को विश्व धरोहर इतिहासकार",
    },
    location: {
      en: "Pattadakal Complex",
      kn: "ಪಟ್ಟದಕಲ್ಲು ಸಂಕೀರ್ಣ",
      hi: "पत्तदकल परिसर",
    },
    chapterTag: {
      en: "Pattadakal Complex",
      kn: "ಪಟ್ಟದಕಲ್ಲು ಸಂಕೀರ್ಣ",
      hi: "पत्तदकल परिसर",
    },
    narration: {
      en: "Welcome to Pattadakal, a UNESCO World Heritage sanctuary resting on the sacred northward bend of the Malaprabha River. Here, Chalukyan monarchs celebrated their coronations. Following the conquest of Kanchipuram in 740 CE, Queen Lokamahadevi commissioned the colossal Virupaksha Temple, sculpted by master architect Gundan Anivaritachari. Marvel at the rare fusion of Northern Nagara towers and Southern Dravida vimanas standing together within a single sacred courtyard, chronicling the epics of the Ramayana and Mahabharata in exquisite sandstone relief.",
      kn: "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣವಾದ ಪಟ್ಟದಕಲ್ಲಿಗೆ ಸ್ವಾಗತ. ಮಲಪ್ರಭಾ ನದಿಯ ಉತ್ತರಾಭಿಮುಖ ತಿರುವಿನಲ್ಲಿ ನೆಲೆಸಿರುವ ಈ ಪವಿತ್ರ ಭೂಮಿಯು ಚಾಲುಕ್ಯ ಅರಸರ ಪಟ್ಟಾಭಿಷೇಕ ಕ್ಷೇತ್ರವಾಗಿತ್ತು. ಕ್ರಿ.ಶ ೭೪೦ ರಲ್ಲಿ ಕಾಂಚೀಪುರವನ್ನು ಗೆದ್ದ ವಿಜಯದ ನೆನಪಿನಲ್ಲಿ ರಾಣಿ ಲೋಕಮಹಾದೇವಿಯು ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಿದಳು. ಉತ್ತರ ಭಾರತದ ನಾಗರ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ದ್ರಾವಿಡ ಶೈಲಿಯ ಶಿಖರಗಳು ಒಂದೇ ಪ್ರಾಂಗಣದಲ್ಲಿ ಸಮ್ಮಿಳಿತವಾಗಿರುವ ಅಪೂರ್ವ ಅದ್ಭುತವಿದು. ಇಲ್ಲಿನ ಶಿಲ್ಪಗಳು ರಾಮಾಯಣ ಮತ್ತು ಮಹಾಭಾರತದ ಕಥೆಗಳನ್ನು ಕಲ್ಲಿನಲ್ಲಿ ಜೀವಂತವಾಗಿಸಿವೆ.",
      hi: "पत्तदकल के यूनेस्को विश्व धरोहर परिसर में आपका स्वागत है। मलप्रभा नदी के तट पर स्थित यह ऐतिहासिक स्थल चालुक्य राजाओं की राज्याभिषेक भूमि था। रानी लोकमहादेवी द्वारा 740 ईस्वी में बनवाया गया विरूपाक्ष मंदिर द्रविड़ स्थापत्य का शिखर है। यहाँ उत्तर भारतीय नागर शैली और दक्षिण भारतीय द्रविड़ शैली के शिखर एक ही प्रांगण में खड़े हैं, जो भारतीय मंदिर वास्तुकला के अभूतपूर्व समन्वय और रामायण व महाभारत के अमर प्रसंगों को पत्थर में दर्शाते हैं।",
    },
  },
  {
    id: "aihole",
    title: {
      en: "Aihole: The Laboratory of Early Architecture",
      kn: "ಐಹೊಳೆ: ಪ್ರಾಚೀನ ವಾಸ್ತುಶಿಲ್ಪದ ಪ್ರಯೋಗಾಲಯ",
      hi: "ऐहोल: भारतीय मंदिर स्थापत्य की ऐतिहासिक प्रयोगशाला",
    },
    narrator: {
      en: "Chalukyan Architecture Archivist",
      kn: "ಚಾಲುಕ್ಯ ವಾಸ್ತುಶಿಲ್ಪ ಸಂಶೋಧಕರು",
      hi: "चालुक्य स्थापत्य अभिलेखागार",
    },
    location: {
      en: "Aihole Complex",
      kn: "ಐಹೊಳೆ ಸಂಕೀರ್ಣ",
      hi: "ऐहोल परिसर",
    },
    chapterTag: {
      en: "Aihole Complex",
      kn: "ಐಹೊಳೆ ಸಂಕೀರ್ಣ",
      hi: "ऐहोल परिसर",
    },
    narration: {
      en: "Step into Aihole, celebrated across the world as the cradle of Indian temple architecture. Across this agrarian village, more than one hundred and twenty stone temples arose between the fifth and eighth centuries CE. From the apsidal Buddhist-inspired chaitya form of the Durga Temple with its horse-shoe ambulatory, to the flat-roofed Lad Khan temple mirroring timber assembly halls, and the hilltop Meguti Jain temple bearing Ravikirti’s famous 634 CE inscription of Pulakeshin the Second defeating Emperor Harsha — Aihole served as an open-air laboratory where architects pioneered every classical temple plan in stone.",
      kn: "ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು ಎಂದೇ ಖ್ಯಾತವಾದ ಐಹೊಳೆಗೆ ಸ್ವಾಗತ. ಈ ಗ್ರಾಮದಾದ್ಯಂತ ಐದರಿಂದ ಎಂಟನೇ ಶತಮಾನದ ನಡುವೆ ನಿರ್ಮಾಣವಾದ ನೂರಕ್ಕೂ ಹೆಚ್ಚು ಶಿಲಾ ದೇವಾಲಯಗಳಿವೆ. ಅಪ್ಸಿಡಲ್ ಗಜಪೃಷ್ಠ ಆಕಾರದ ದುರ್ಗಾ ದೇವಾಲಯ, ಮರದ ಮಂಟಪಗಳ ಮಾದರಿಯ ಲಾಡ್ ಖಾನ್ ದೇವಾಲಯ, ಮತ್ತು ಇಮ್ಮಡಿ ಪುಲಕೇಶಿಯು ಹರ್ಷವರ್ಧನನನ್ನು ಸೋಲಿಸಿದ ಐತಿಹಾಸಿಕ ರವಿಕೀರ್ತಿಯ ಶಾಸನವಿರುವ ಮೇಗುತಿ ಜೈನ ದೇವಾಲಯ — ಇವೆಲ್ಲವೂ ಭಾರತೀಯ ದೇವಾಲಯ ಶೈಲಿಗಳನ್ನು ರೂಪಿಸಿದ ಬಯಲು ಪ್ರಯೋಗಾಲಯವಾಗಿದೆ.",
      hi: "भारतीय मंदिर वास्तुकला के पालने, ऐतिहासिक ऐहोल में आपका स्वागत है। यहाँ पाँचवीं से आठवीं शताब्दी के बीच 120 से अधिक प्रयोगात्मक मंदिरों की रचना हुई। घोड़े की नाल जैसी गजपृष्ठाकार दुर्गा मंदिर, काष्ठ वास्तुकला से प्रेरित लाड खान मंदिर, और मेगुती जैन मंदिर जहाँ 634 ईस्वी में रविकीर्ति द्वारा रचित शिलालेख में द्वितीय पुलकेशी द्वारा सम्राट हर्षवर्धन को पराजित करने का ऐतिहासिक विवरण मिलता है — ऐहोल भारतीय वास्तुकला की अमर प्रयोगशाला है।",
    },
  },
];

export default function AudioGuideWidget() {
  const { currentLang } = useLanguage();
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const progressBarRef = useRef(null);

  const track = AUDIO_TRACKS[trackIdx];
  const langKey = currentLang === "kn" ? "kn" : currentLang === "hi" ? "hi" : "en";

  const trackTitle = track.title[langKey] || track.title.en;
  const trackNarrator = track.narrator[langKey] || track.narrator.en;
  const trackNarration = track.narration[langKey] || track.narration.en;

  // Cleanup on unmount or track change
  useEffect(() => {
    return () => {
      const engine = getHeritageAudioEngine();
      if (engine) engine.stop();
    };
  }, []);

  // When language changes while playing, restart speech in new language
  useEffect(() => {
    const engine = getHeritageAudioEngine();
    if (isPlaying && engine) {
      playTrack(trackIdx, langKey);
    }
  }, [langKey]);

  const playTrack = (index, lang) => {
    const engine = getHeritageAudioEngine();
    if (!engine) return;

    const selectedTrack = AUDIO_TRACKS[index];
    const textToSpeak = selectedTrack.narration[lang] || selectedTrack.narration.en;

    setCurrentTime(0);
    setIsPlaying(true);
    setIsPaused(false);

    engine.speak({
      text: textToSpeak,
      lang: lang,
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

  const handleTogglePlay = () => {
    const engine = getHeritageAudioEngine();
    if (!engine) return;

    if (!isPlaying) {
      playTrack(trackIdx, langKey);
    } else if (isPlaying && !isPaused) {
      engine.pause();
      setIsPaused(true);
    } else if (isPlaying && isPaused) {
      engine.resume();
      setIsPaused(false);
    }
  };

  const handleResetPlay = () => {
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

  const handleSelectChapter = (idx) => {
    setTrackIdx(idx);
    const engine = getHeritageAudioEngine();
    if (engine) engine.stop();
    playTrack(idx, langKey);
  };

  const formatSecs = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const progressPct = totalDuration > 0 ? Math.min(100, (currentTime / totalDuration) * 100) : 0;

  return (
    <div className="rounded-2xl border border-gold-500/25 bg-charcoal-950/85 p-5 backdrop-blur-md shadow-xl transition-all">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`grid h-8 w-8 place-items-center rounded-full border transition-colors ${
              isPlaying && !isPaused
                ? "border-gold-400 bg-gold-500/20 text-gold-300 animate-pulse"
                : "border-gold-500/40 bg-gold-500/10 text-gold-400"
            }`}
          >
            <Headphones size={15} />
          </span>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400">
              Audio Guide · {trackNarrator}
            </span>
            <h4 className="font-display text-base text-ivory line-clamp-1">
              {trackTitle}
            </h4>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMute}
            className={`p-1.5 transition-colors ${
              isMuted ? "text-amber-400" : "text-stone-400 hover:text-gold-400"
            }`}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <button
            onClick={handleResetPlay}
            className="p-1.5 text-stone-400 hover:text-ivory transition-colors"
            aria-label="Restart audio track"
            title="Restart"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={handleTogglePlay}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-950 hover:bg-gold-400 transition-all shadow-md active:scale-95"
            aria-label={isPlaying && !isPaused ? "Pause audio narration" : "Play audio narration"}
          >
            {isPlaying && !isPaused ? (
              <Pause size={13} />
            ) : (
              <Play size={13} fill="currentColor" />
            )}
            <span>{isPlaying && !isPaused ? "Pause" : "Listen"}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-1.5">
          <span>{formatSecs(currentTime)}</span>
          <span className="text-gold-400">{formatSecs(totalDuration)}</span>
        </div>
        <div
          ref={progressBarRef}
          className="relative h-1.5 w-full rounded-full bg-stone-800 overflow-hidden cursor-pointer"
        >
          <div
            className="h-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Track selector strip */}
      <div className="mt-3 flex items-center gap-2 pt-2 border-t border-stone-800/60 overflow-x-auto text-[11px] text-stone-400">
        <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500">Chapters:</span>
        {AUDIO_TRACKS.map((t, idx) => {
          const tag = t.chapterTag[langKey] || t.chapterTag.en;
          const isCurrent = trackIdx === idx;
          return (
            <button
              key={t.id}
              onClick={() => handleSelectChapter(idx)}
              className={`whitespace-nowrap px-2.5 py-0.5 rounded-full border text-[10px] transition-colors ${
                isCurrent
                  ? "border-gold-500/50 bg-gold-500/10 text-gold-300 font-semibold"
                  : "border-stone-800 text-stone-400 hover:text-stone-200"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
