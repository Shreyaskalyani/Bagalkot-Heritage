"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Clock,
  Sun,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  QrCode,
  ShieldCheck,
  Phone,
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Train,
  Bus,
  CheckCircle2,
  AlertCircle,
  Camera,
  ChevronRight,
  X,
  ExternalLink,
} from "lucide-react";
import {
  liveWeather,
  liveMonumentsStatus,
  touristHelplines,
  liveAdvisories,
} from "@/data/realtime-info";

const TRAINS_FROM_BADAMI = [
  {
    trainNumber: "16535",
    trainName: "Gol Gumbaz Express",
    destination: "Bengaluru / Mysuru via Hubballi",
    departsBadami: "07:18 PM",
    frequency: "Daily",
  },
  {
    trainNumber: "11140",
    trainName: "Hosapete - CSMT Express",
    destination: "Mumbai CSMT via Solapur",
    departsBadami: "04:35 PM",
    frequency: "Daily",
  },
  {
    trainNumber: "07322",
    trainName: "Dharwad - Solapur Passenger",
    destination: "Bagalkot / Vijayapura / Solapur",
    departsBadami: "09:42 AM",
    frequency: "Daily",
  },
  {
    trainNumber: "17307",
    trainName: "Basava Express",
    destination: "Bagalkot, Vijayapura & Kalaburagi",
    departsBadami: "03:15 PM",
    frequency: "Daily",
  },
  {
    trainNumber: "06920",
    trainName: "Hubballi - Bagalkot Special",
    destination: "Bagalkot Junction",
    departsBadami: "11:20 AM",
    frequency: "Mon - Sat",
  },
];

const SLIDES = [
  { id: "radar", title: "Live Monuments Radar", icon: ShieldCheck },
  { id: "showcase", title: "4K Heritage Showcase", icon: Camera },
  { id: "weather", title: "Weather & Golden Hour", icon: Sun },
  { id: "transit", title: "Transit & Helplines", icon: Train },
];

const SHOWCASE_PHOTOS = [
  {
    title: "Upper Shivalaya Dravidian Temple",
    location: "Badami Northern Cliff",
    century: "Early 7th Century CE",
    dynasty: "Badami Chalukyas (Pulakeshin II)",
    image: "/images/upper-shivalaya-6k.jpg",
    resolution: "6,720 × 4,480 px (6K Native)",
    desc: "Perched atop the northern sandstone cliff overlooking ancient Vatapi. Features a square sanctum, stepped Dravidian shikhara, and an ancient rainwater reflection pool carved straight into living bedrock.",
    highlight: "Cradle of Deccan Dravidian Vimana architecture",
  },
  {
    title: "Sunset Over Agastya Lake & Bhutanatha",
    location: "Agastya Lake, Badami",
    century: "7th – 11th Century CE",
    dynasty: "Early & Later Chalukyas",
    image: "/images/badami-evening-4k.jpg",
    resolution: "4,288 × 2,848 px (4K UHD)",
    desc: "The spiritual heart of Badami. Sandstone shrines extend into the sacred waters against the dramatic red canyon. At dusk, the water reflects glowing amber light onto ancient sanctums.",
    highlight: "Sacred waterside pilgrimage complex",
  },
  {
    title: "UNESCO World Heritage Temple Complex",
    location: "Pattadakal (Banks of Malaprabha)",
    century: "7th – 8th Century CE",
    dynasty: "Badami Chalukyas (Queen Lokamahadevi & Trailokyamahadevi)",
    image: "/images/pattadakal-4k.jpg",
    resolution: "5,616 × 3,744 px (5.6K UHD)",
    desc: "The royal coronation sanctuary (Pattada-Kisuvolal) where northern curvilinear Nagara towers and southern stepped Dravida vimanas were constructed side by side in royal architectural dialogue.",
    highlight: "UNESCO World Heritage Site · 10 Royal Temples",
  },
  {
    title: "Malegitti Shivalaya Rock Spur",
    location: "Badami Northern Spur",
    century: "c. 675 CE",
    dynasty: "Badami Chalukyas (Vinayaditya)",
    image: "/images/malegitti-4k.jpg",
    resolution: "6,720 × 4,480 px (6K Native)",
    desc: "One of the earliest and best-preserved Dravida temples in the Deccan. Built from interlocking dry-stone sandstone masonry without mortar atop an isolated rocky outcrop.",
    highlight: "Masterpiece of early stone masonry",
  },
  {
    title: "Badami Sandstone Gorge & Cave Sanctuaries",
    location: "Badami Canyon",
    century: "578 CE (Cave 3 Inscription)",
    dynasty: "King Mangalesha & Kirtivarman I",
    image: "/images/badami-caves-4k.jpg",
    resolution: "5,757 × 2,784 px (5.7K Panoramic)",
    desc: "Four monumental rock-cut shrines excavated into precipitous red cliffs. Cave 3 contains a dated Sanskrit inscription from Saka 500 documenting the transition from timber to living stone.",
    highlight: "Transition from wood to monumental stone",
  },
];

const SLIDE_DURATION_MS = 14000;

export default function VisitorCenterScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  const containerRef = useRef(null);
  const photo = SHOWCASE_PHOTOS[showcaseIndex] || SHOWCASE_PHOTOS[0];

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-Cycle Engine with Progress Bar
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 100;
    const stepIncrement = (intervalStep / SLIDE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % SLIDES.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  // Rotate showcase images automatically when on the showcase slide
  useEffect(() => {
    if (currentSlide !== 1 || isPaused) return;
    const photoTimer = setInterval(() => {
      setShowcaseIndex((prev) => (prev + 1) % SHOWCASE_PHOTOS.length);
    }, 7000);
    return () => clearInterval(photoTimer);
  }, [currentSlide, isPaused]);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Jump to specific slide and reset progress
  const selectSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <div
      ref={containerRef}
      className="visitor-center-screen relative flex min-h-[100svh] min-h-[100dvh] flex-col justify-between overflow-hidden bg-charcoal-950 text-ivory select-none font-sans"
    >
      {/* Background Ambience Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-900/30 via-charcoal-950 to-charcoal-950" />

      {/* ========================================================== */}
      {/* TOP HEADER BAR (Digital Visitor Center Header)             */}
      {/* ========================================================== */}
      <header className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-gold-500/20 bg-charcoal-950/90 px-6 py-3.5 backdrop-blur-md">
        {/* Brand & Crest */}
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 15h12M2 15V7l6-5 6 5v8M6 15v-4h4v4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg tracking-[0.2em] font-light text-ivory">
                BAGALKOT
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400">
                HERITAGE TOURISM
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-stone-400 uppercase tracking-widest">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-semibold">Visitor Information Center</span>
              <span>•</span>
              <span>Live Tourism Hub</span>
            </div>
          </div>
        </div>

        {/* Slide Switcher Navigation Pills */}
        <nav className="flex items-center gap-1.5 rounded-full border border-stone-800 bg-charcoal-900/80 p-1">
          {SLIDES.map((slide, idx) => {
            const Icon = slide.icon;
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => selectSlide(idx)}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-gold-500 text-charcoal-950 font-bold shadow-md"
                    : "text-stone-300 hover:text-ivory hover:bg-stone-800/60"
                }`}
              >
                <Icon size={13} strokeWidth={2} />
                <span className="hidden sm:inline">{slide.title}</span>
              </button>
            );
          })}
        </nav>

        {/* Live Clock & Action Controls */}
        <div className="flex items-center gap-4">
          {/* Live IST Clock */}
          <div className="hidden text-right lg:block">
            <p className="font-mono text-base font-bold text-ivory leading-tight">
              {currentTime || "12:00:00 PM"}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-gold-400">
              {currentDate || "IST · Karnataka, India"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Resume auto-slide" : "Pause auto-slide"}
              className="grid h-9 w-9 place-items-center rounded-full border border-stone-700 bg-charcoal-900 text-stone-300 hover:border-gold-500 hover:text-gold-400 transition-colors"
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
            </button>

            {/* QR Code Button */}
            <button
              onClick={() => setShowQR(true)}
              title="Show mobile QR code"
              className="grid h-9 w-9 place-items-center rounded-full border border-stone-700 bg-charcoal-900 text-stone-300 hover:border-gold-500 hover:text-gold-400 transition-colors"
            >
              <QrCode size={15} />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
              className="grid h-9 w-9 place-items-center rounded-full border border-stone-700 bg-charcoal-900 text-stone-300 hover:border-gold-500 hover:text-gold-400 transition-colors"
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>

            {/* Exit to Website */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-300 hover:bg-gold-500 hover:text-charcoal-950 transition-colors"
            >
              <span>Portal Home</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </header>

      {/* Slide Auto-Cycle Progress Indicator Line */}
      <div className="relative h-1 w-full bg-charcoal-900">
        <div
          className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(199,154,69,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ========================================================== */}
      {/* MAIN SLIDE CONTENT CANVAS                                  */}
      {/* ========================================================== */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-4 md:p-6 lg:p-8 overflow-y-auto">
        {/* ======================================================== */}
        {/* SLIDE 0: LIVE MONUMENT RADAR & OPERATIONAL BOARD         */}
        {/* ======================================================== */}
        {currentSlide === 0 && (
          <div className="w-full max-w-7xl animate-fadeIn">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold-400">
                  Archaeological Survey of India (ASI) &amp; District Radar
                </span>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-ivory">
                  Today’s Monument Status &amp; Entry Timings
                </h2>
              </div>
              <div className="text-right text-xs text-stone-400">
                <span>Updated every 15 mins · Composite ASI pass valid across sites</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {liveMonumentsStatus.map((item) => (
                <div
                  key={item.slug}
                  className="group relative flex flex-col justify-between rounded-2xl border border-stone-800 bg-charcoal-900/90 p-4 shadow-lg backdrop-blur-sm transition-all hover:border-gold-500/40"
                >
                  <div>
                    {/* Status Badge & Location */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 size={11} />
                        {item.isOpen ? "OPEN TODAY" : "CLOSED"}
                      </span>
                      <span className="text-[11px] text-stone-400 flex items-center gap-1">
                        <MapPin size={11} className="text-gold-400" />
                        {item.location}
                      </span>
                    </div>

                    {/* Monument Name */}
                    <h3 className="mt-2.5 font-display text-lg text-ivory leading-snug group-hover:text-gold-300 transition-colors">
                      {item.name}
                    </h3>

                    {/* Timings */}
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-300">
                      <Clock size={13} className="text-gold-400 shrink-0" />
                      <span>{item.hoursToday}</span>
                    </div>

                    {/* Ticket Price */}
                    <div className="mt-1 text-xs text-stone-400">
                      Fee: <strong className="text-stone-200">{item.ticketPrice}</strong>
                    </div>

                    {/* Crowd Level */}
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                        <span>Crowd Density</span>
                        <span className="text-gold-400 font-semibold">{item.crowdLevel}</span>
                      </div>
                      <div className="h-1.5 w-full bg-charcoal-950 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 via-gold-400 to-amber-500 rounded-full"
                          style={{ width: `${item.crowdPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ASI Guide Tip */}
                  <div className="mt-3 border-t border-stone-800/80 pt-2 text-[11px] text-stone-400 italic">
                    💡 {item.liveTip}
                  </div>
                </div>
              ))}

              {/* Emergency Summary Card in the Grid */}
              <div className="flex flex-col justify-between rounded-2xl border border-gold-500/30 bg-gradient-to-br from-charcoal-900 via-charcoal-900 to-gold-950/20 p-4 shadow-lg">
                <div>
                  <div className="flex items-center gap-2 text-gold-400">
                    <ShieldCheck size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Visitor Support Desk
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl text-ivory">Need Assistance?</h3>
                  <p className="mt-1.5 text-xs text-stone-300 leading-relaxed">
                    Official Karnataka Tourism Information Officer &amp; Tourist Police are stationed at Badami Main Station &amp; Pattadakal entry gate.
                  </p>
                </div>
                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between rounded-lg bg-charcoal-950/70 p-2">
                    <span className="text-stone-400">Helpline:</span>
                    <strong className="text-gold-400 text-sm">1363 (Toll-Free)</strong>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-charcoal-950/70 p-2">
                    <span className="text-stone-400">Emergency Police:</span>
                    <strong className="text-emerald-400 text-sm">112</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SLIDE 1: 4K HERITAGE PHOTOGRAPHY SHOWCASE                */}
        {/* ======================================================== */}
        {currentSlide === 1 && (
          <div className="w-full max-w-7xl animate-fadeIn">
            <div className="relative grid gap-6 lg:grid-cols-12 items-center rounded-3xl border border-gold-500/20 bg-charcoal-900/80 p-5 md:p-8 backdrop-blur-md shadow-2xl">
              {/* Photo Display Window */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-7 group">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 rounded-full bg-charcoal-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-400 border border-gold-500/30 backdrop-blur-md">
                  ✨ {photo.resolution}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-200">
                  <span>{photo.location}</span>
                  <span className="text-gold-400 font-medium">{photo.highlight}</span>
                </div>
              </div>

              {/* Contextual Narrative Information */}
              <div className="flex flex-col justify-between lg:col-span-5 h-full py-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold-400">
                      {photo.dynasty}
                    </span>
                    <span>•</span>
                    <span className="text-xs text-stone-400">{photo.century}</span>
                  </div>

                  <h2 className="mt-2 font-display text-3xl md:text-4xl text-ivory leading-tight">
                    {photo.title}
                  </h2>

                  <p className="mt-4 text-sm md:text-base leading-relaxed text-stone-300">
                    {photo.desc}
                  </p>

                  <div className="mt-6 rounded-2xl border border-stone-800 bg-charcoal-950/60 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-1">
                      Architectural Significance
                    </p>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Pioneered the transition from subterranean rock-cut excavations into freestanding structural stone temples with carved pillared mandapas and stepped Dravidian towers.
                    </p>
                  </div>
                </div>

                {/* Thumbnail Switcher */}
                <div className="mt-6 border-t border-stone-800 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                    Switch 4K View ({showcaseIndex + 1} / {SHOWCASE_PHOTOS.length})
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {SHOWCASE_PHOTOS.map((p, idx) => (
                      <button
                        key={p.title}
                        onClick={() => setShowcaseIndex(idx)}
                        className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                          idx === showcaseIndex
                            ? "border-gold-400 scale-105 shadow-md"
                            : "border-stone-700 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={p.image} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SLIDE 2: WEATHER & GOLDEN HOUR PHOTOGRAPHY WINDOWS       */}
        {/* ======================================================== */}
        {currentSlide === 2 && (
          <div className="w-full max-w-7xl animate-fadeIn">
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold-400">
                Atmospheric Conditions &amp; Sunset Radar
              </span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-ivory">
                Live Valley Weather &amp; Photography Windows
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Main Weather Card */}
              <div className="flex flex-col justify-between rounded-3xl border border-gold-500/20 bg-gradient-to-br from-charcoal-900 to-charcoal-950 p-6 shadow-xl">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>{liveWeather.location}</span>
                    <span className="text-emerald-400 font-semibold">{liveWeather.condition}</span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-6xl md:text-7xl font-light text-ivory">
                      {liveWeather.currentTempC}°C
                    </span>
                    <span className="text-stone-400 text-lg">({liveWeather.currentTempF}°F)</span>
                  </div>
                  <p className="mt-2 text-xs text-stone-400">
                    High: {liveWeather.highTempC}°C · Low: {liveWeather.lowTempC}°C
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2 border-t border-stone-800/80 pt-4 text-xs">
                  <div>
                    <span className="text-stone-400">Air Quality</span>
                    <p className="font-semibold text-emerald-400">{liveWeather.aqi}</p>
                  </div>
                  <div>
                    <span className="text-stone-400">UV Index</span>
                    <p className="font-semibold text-amber-400">{liveWeather.uvIndex}</p>
                  </div>
                  <div className="mt-2">
                    <span className="text-stone-400">Humidity</span>
                    <p className="font-semibold text-ivory">{liveWeather.humidity}</p>
                  </div>
                  <div className="mt-2">
                    <span className="text-stone-400">Wind</span>
                    <p className="font-semibold text-ivory">{liveWeather.wind}</p>
                  </div>
                </div>
              </div>

              {/* Sun Times & Agastya Lake Countdown */}
              <div className="flex flex-col justify-between rounded-3xl border border-stone-800 bg-charcoal-900/90 p-6 shadow-xl">
                <div>
                  <div className="flex items-center gap-2 text-gold-400">
                    <Sun size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Solar Ephemeris
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-ivory">
                    Sunrise &amp; Sunset Times
                  </h3>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-2xl bg-charcoal-950 p-4 border border-stone-800/60">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400">
                          Sunrise (Morning Glow)
                        </span>
                        <p className="text-xl font-mono font-bold text-amber-300">
                          {liveWeather.sunrise}
                        </p>
                      </div>
                      <span className="text-xs text-stone-400">Best for Aihole Temples</span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-charcoal-950 p-4 border border-gold-500/20">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold">
                          Sunset at Agastya Lake
                        </span>
                        <p className="text-xl font-mono font-bold text-gold-400">
                          {liveWeather.sunset}
                        </p>
                      </div>
                      <span className="text-xs text-stone-300">Golden Hour Peak</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-stone-400 border-t border-stone-800 pt-3">
                  Optimal Visiting Window Today:{" "}
                  <strong className="text-ivory">{liveWeather.bestVisitingWindowToday}</strong>
                </div>
              </div>

              {/* Photography Advisory Card */}
              <div className="flex flex-col justify-between rounded-3xl border border-stone-800 bg-charcoal-900/90 p-6 shadow-xl md:col-span-2 lg:col-span-1">
                <div>
                  <div className="flex items-center gap-2 text-gold-400">
                    <Camera size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Photographer’s Dispatch
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-ivory">
                    Golden Hour Windows
                  </h3>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-stone-800 bg-charcoal-950/70 p-3.5">
                      <p className="text-xs font-semibold text-amber-300">
                        🌅 Morning Window: {liveWeather.goldenHourMorning}
                      </p>
                      <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                        Soft side light strikes the apsidal colonnade of Durga Temple Aihole and the eastern cave facades of Badami.
                      </p>
                    </div>

                    <div className="rounded-xl border border-stone-800 bg-charcoal-950/70 p-3.5">
                      <p className="text-xs font-semibold text-gold-400">
                        🌇 Evening Window: {liveWeather.goldenHourEvening}
                      </p>
                      <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                        Flaming amber reflection across Agastya Lake. Position on the stone steps across from Bhutanatha Temple.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-stone-400 italic">
                  💡 Tripods and drone cameras require Archaeological Survey of India (ASI) prior written permits. Handheld cameras &amp; smartphones are permitted without fee.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SLIDE 3: TRANSIT SCHEDULES & EMERGENCY SERVICES          */}
        {/* ======================================================== */}
        {currentSlide === 3 && (
          <div className="w-full max-w-7xl animate-fadeIn">
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold-400">
                Transport Hubs &amp; Tourist Police Emergency Desk
              </span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-ivory">
                Transit Timings &amp; 24x7 Emergency Services
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-12">
              {/* Badami Railway Station Departures */}
              <div className="rounded-3xl border border-stone-800 bg-charcoal-900/90 p-5 shadow-xl lg:col-span-7">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <Train size={18} className="text-gold-400" />
                    <div>
                      <h3 className="font-display text-xl text-ivory">
                        Badami Railway Station (BDM)
                      </h3>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider">
                        South Western Railway · Direct links to Hubballi, Bengaluru, Goa
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    STATION OPERATIONAL
                  </span>
                </div>

                <div className="mt-4 space-y-2.5 overflow-x-auto">
                  {TRAINS_FROM_BADAMI.map((train) => (
                    <div
                      key={train.trainNumber}
                      className="flex items-center justify-between rounded-xl bg-charcoal-950/80 p-3 border border-stone-800/80 hover:border-gold-500/40 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-semibold text-ivory">
                            {train.trainName}
                          </strong>
                          <span className="text-xs font-mono text-stone-400">
                            #{train.trainNumber}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400">
                          To: <strong className="text-stone-300">{train.destination}</strong> ({train.frequency})
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-gold-400">
                          {train.departsBadami}
                        </span>
                        <p className="text-[10px] text-emerald-400 font-medium">On Schedule</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-stone-400 border-t border-stone-800 pt-3">
                  <span>KSRTC Express Buses: Every 20 mins to Pattadakal &amp; Aihole from Badami KSRTC Stand</span>
                  <Link href="/planner" className="text-gold-400 hover:underline">
                    View Full Circuit Details →
                  </Link>
                </div>
              </div>

              {/* Emergency & Medical Desk */}
              <div className="flex flex-col justify-between rounded-3xl border border-gold-500/30 bg-gradient-to-br from-charcoal-900 via-charcoal-900 to-gold-950/20 p-5 shadow-xl lg:col-span-5">
                <div>
                  <div className="flex items-center gap-2 text-gold-400 mb-1">
                    <ShieldCheck size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      24x7 Public Assistance Directory
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-ivory">
                    Emergency &amp; Medical Helplines
                  </h3>
                  <p className="mt-1 text-xs text-stone-300">
                    For medical emergencies, transport breakdowns, or tourist assistance anywhere in the Bagalkot heritage circuit.
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-xl bg-charcoal-950 p-3 border border-stone-800">
                      <div>
                        <p className="font-semibold text-ivory">Karnataka Tourism Helpline</p>
                        <p className="text-[11px] text-stone-400">Multi-lingual traveler support</p>
                      </div>
                      <strong className="text-gold-400 text-sm font-mono">1363</strong>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-charcoal-950 p-3 border border-stone-800">
                      <div>
                        <p className="font-semibold text-ivory">Tourist Police Assistance</p>
                        <p className="text-[11px] text-stone-400">Badami, Pattadakal, Aihole outposts</p>
                      </div>
                      <strong className="text-emerald-400 text-sm font-mono">112</strong>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-charcoal-950 p-3 border border-stone-800">
                      <div>
                        <p className="font-semibold text-ivory">Bagalkot District Hospital</p>
                        <p className="text-[11px] text-stone-400">24/7 Casualty &amp; Ambulance</p>
                      </div>
                      <strong className="text-stone-300 text-xs font-mono">08354-235444</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-gold-500/10 border border-gold-500/30 p-3 text-[11px] text-gold-300">
                  🛡️ <strong>Bagalkote District Administration Advisory:</strong> Registered government guides wear official photo ID badges issued by the Archaeological Survey of India (ASI). Do not engage unverified touts.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================== */}
      {/* BOTTOM TICKER & ADVISORY MARQUEE                           */}
      {/* ========================================================== */}
      <footer className="relative z-20 border-t border-gold-500/20 bg-charcoal-950/95 py-2.5 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded bg-gold-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-950">
              LIVE DISPATCH
            </span>
          </div>

          {/* Scrolling Marquee */}
          <div className="overflow-hidden whitespace-nowrap text-xs text-stone-300">
            <div className="inline-block animate-[marquee_40s_linear_infinite]">
              {liveAdvisories.map((advisory) => (
                <span key={advisory.id} className="mr-8">
                  • <strong>{advisory.title}:</strong> {advisory.content}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================== */}
      {/* SCAN TO PHONE QR MODAL                                     */}
      {/* ========================================================== */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/90 p-4 backdrop-blur-xl">
          <div className="relative w-full max-w-sm rounded-3xl border border-gold-500/40 bg-charcoal-900 p-6 text-center shadow-2xl">
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full border border-stone-700 text-stone-400 hover:text-ivory"
            >
              <X size={16} />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold-400">
              Mobile Companion
            </span>
            <h3 className="mt-1 font-display text-2xl text-ivory">Take Guide On Your Phone</h3>
            <p className="mt-2 text-xs text-stone-300">
              Scan this QR code with your smartphone camera to access interactive maps, audio guides, and the AI monument scanner.
            </p>

            {/* Generated High-Resolution SVG QR Code Representation */}
            <div className="my-6 mx-auto grid h-48 w-48 place-items-center rounded-2xl bg-white p-3 shadow-inner">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {/* QR Finder Patterns */}
                <rect x="5" y="5" width="25" height="25" fill="#171512" />
                <rect x="9" y="9" width="17" height="17" fill="#ffffff" />
                <rect x="13" y="13" width="9" height="9" fill="#171512" />

                <rect x="70" y="5" width="25" height="25" fill="#171512" />
                <rect x="74" y="9" width="17" height="17" fill="#ffffff" />
                <rect x="78" y="13" width="9" height="9" fill="#171512" />

                <rect x="5" y="70" width="25" height="25" fill="#171512" />
                <rect x="9" y="74" width="17" height="17" fill="#ffffff" />
                <rect x="13" y="78" width="9" height="9" fill="#171512" />

                {/* Decorative Data Modules */}
                <rect x="35" y="8" width="5" height="5" fill="#b58938" />
                <rect x="45" y="8" width="5" height="5" fill="#171512" />
                <rect x="55" y="8" width="5" height="5" fill="#171512" />
                <rect x="35" y="20" width="10" height="5" fill="#171512" />
                <rect x="50" y="20" width="5" height="5" fill="#b58938" />

                <rect x="8" y="35" width="5" height="5" fill="#171512" />
                <rect x="20" y="35" width="5" height="5" fill="#b58938" />
                <rect x="8" y="45" width="5" height="10" fill="#171512" />
                <rect x="20" y="50" width="5" height="5" fill="#171512" />

                <rect x="35" y="35" width="10" height="10" fill="#b58938" />
                <rect x="55" y="35" width="10" height="5" fill="#171512" />
                <rect x="70" y="35" width="5" height="5" fill="#171512" />
                <rect x="85" y="35" width="5" height="10" fill="#171512" />

                <rect x="40" y="50" width="15" height="5" fill="#171512" />
                <rect x="60" y="50" width="5" height="10" fill="#b58938" />
                <rect x="75" y="50" width="10" height="5" fill="#171512" />

                <rect x="35" y="70" width="5" height="10" fill="#171512" />
                <rect x="45" y="70" width="10" height="5" fill="#b58938" />
                <rect x="60" y="70" width="5" height="5" fill="#171512" />
                <rect x="75" y="70" width="10" height="10" fill="#171512" />

                <rect x="40" y="85" width="10" height="5" fill="#171512" />
                <rect x="55" y="85" width="5" height="5" fill="#b58938" />
                <rect x="85" y="85" width="5" height="5" fill="#171512" />
              </svg>
            </div>

            <p className="text-[11px] font-mono text-gold-400">
              bagalkot-tourism.karnataka.gov.in
            </p>

            <button
              onClick={() => setShowQR(false)}
              className="mt-5 w-full rounded-full bg-gold-500 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-950 transition-colors hover:bg-gold-400"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
