"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScanSearch, ArrowDown } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export const HERO_VIEWS = [
  {
    id: "upper-shivalaya",
    src: "/images/upper-shivalaya-6k.jpg",
    alt: "Upper Shivalaya Dravidian temple atop Badami northern sandstone cliff with stone reflection tank",
  },
  {
    id: "badami-sunset",
    src: "/images/badami-evening-4k.jpg",
    alt: "Golden hour sunset over sacred Agastya Lake and Bhutanatha Temple, Badami",
  },
  {
    id: "badami-caves",
    src: "/images/badami-caves-4k.jpg",
    alt: "Panoramic sandstone gorge and rock-cut cave temples of Badami",
  },
  {
    id: "malegitti",
    src: "/images/malegitti-4k.jpg",
    alt: "7th-century Malegitti Shivalaya temple carved into living rock atop the cliff",
  },
];

const LOOP_INTERVAL_MS = 6500;

/**
 * State machine stages:
 * - "INTRO_START"       : Initial hero state, subtle camera push-in
 * - "INTRO_DARKEN"      : Initial hero text exits upward, dark overlay covers image into deep black
 * - "TITLE_KARNATAKA"   : Gold "KARNATAKA" emerges alone in black frame
 * - "TITLE_BAGALKOT"    : Karnataka exits, giant "BAGALKOT" emerges
 * - "TITLE_STORY"       : "WHERE STONE TELLS STORIES" + gold line unfold under Bagalkot
 * - "IMAGE_REVEAL"      : Intro text dissolves, center iris rectangle expands to full screen
 * - "HERO_READY"        : Settled hero layer active, scrolling restored, image carousel unlocked
 */

export default function CinematicIntro() {
  const rootRef = useRef(null);
  const imageLayerRef = useRef(null);
  const heroImageRef = useRef(null);
  const darkOverlayRef = useRef(null);
  const revealLayerRef = useRef(null);
  const revealBorderRef = useRef(null);

  // Layers
  const initialHeroContentRef = useRef(null);
  const introTextLayerRef = useRef(null);
  const karnatakaRef = useRef(null);
  const bagalkotIntroRef = useRef(null);
  const storyLine1Ref = useRef(null);
  const storyLine2Ref = useRef(null);
  const goldenLineRef = useRef(null);
  const finalHeroLayerRef = useRef(null);

  // Sub-elements in final hero
  const finalSubRef = useRef(null);
  const finalTitleRef = useRef(null);
  const finalDescRef = useRef(null);
  const finalButtonsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const skipBtnRef = useRef(null);

  // State
  const [animStage, setAnimStage] = useState("INTRO_START");
  const [activeIdx, setActiveIdx] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const masterTimeline = useRef(null);

  // Scroll locking during intro
  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.stop();
    }
  };

  const unlockScroll = () => {
    document.body.style.overflow = "";
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.start();
    }
  };

  // Immediate safe transition to settled final state
  const handleSkip = () => {
    if (masterTimeline.current) {
      masterTimeline.current.kill();
    }
    sessionStorage.setItem("bagalkot-intro-seen", "true");
    setAnimStage("HERO_READY");
    setIntroFinished(true);
    unlockScroll();

    // Explicitly hide non-hero layers to prevent any DOM collision
    if (initialHeroContentRef.current) {
      gsap.set(initialHeroContentRef.current, { display: "none", opacity: 0 });
    }
    if (introTextLayerRef.current) {
      gsap.set(introTextLayerRef.current, { display: "none", opacity: 0 });
    }
    if (revealLayerRef.current) {
      gsap.set(revealLayerRef.current, { display: "none", opacity: 0 });
    }
    if (skipBtnRef.current) {
      gsap.set(skipBtnRef.current, { display: "none" });
    }
    if (darkOverlayRef.current) {
      gsap.set(darkOverlayRef.current, { opacity: 0 });
    }

    // Restore base image to natural state
    if (heroImageRef.current) {
      gsap.set(heroImageRef.current, {
        scale: 1.0,
        opacity: 1,
        filter: "none",
      });
    }

    // Make final hero layer fully active and interactive
    if (finalHeroLayerRef.current) {
      gsap.set(finalHeroLayerRef.current, {
        display: "flex",
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
      });
    }

    if (
      finalSubRef.current &&
      finalTitleRef.current &&
      finalDescRef.current &&
      finalButtonsRef.current
    ) {
      gsap.set(
        [
          finalSubRef.current,
          finalTitleRef.current,
          finalDescRef.current,
          finalButtonsRef.current,
        ],
        { opacity: 1, y: 0 }
      );
    }

    if (scrollIndicatorRef.current) {
      gsap.set(scrollIndicatorRef.current, { opacity: 1, y: 0 });
    }
  };

  // Master GSAP Timeline Orchestration
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("bagalkot-intro-seen") === "true";
    const isMobile = window.innerWidth < 768;

    if (reduced || seen) {
      handleSkip();
      return;
    }

    lockScroll();

    // Failsafe timer: automatically recovers website if animation stalls
    const safetyTimer = setTimeout(() => {
      handleSkip();
    }, 11000);

    const ctx = gsap.context(() => {
      try {
        // Step 0: Initial states — enforce mutual exclusivity in DOM
        gsap.set(heroImageRef.current, {
          scale: 1.0,
          opacity: 1,
          filter: "brightness(0.92)",
        });

        gsap.set(initialHeroContentRef.current, {
          display: "flex",
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });

        gsap.set(darkOverlayRef.current, { opacity: 0 });

        gsap.set(introTextLayerRef.current, {
          display: "none",
          opacity: 0,
        });

        gsap.set(karnatakaRef.current, {
          display: "none",
          opacity: 0,
          y: 20,
          letterSpacing: "0.25em",
        });

        gsap.set(bagalkotIntroRef.current, {
          display: "none",
          opacity: 0,
          y: 25,
          scale: 0.95,
          filter: "blur(6px)",
          letterSpacing: "0.25em",
        });

        gsap.set([storyLine1Ref.current, storyLine2Ref.current], {
          opacity: 0,
          y: 25,
        });

        gsap.set(goldenLineRef.current, { width: "0px", opacity: 0 });

        gsap.set(revealLayerRef.current, {
          display: "none",
          opacity: 0,
          clipPath: isMobile ? "inset(42% 40% 42% 40%)" : "inset(45% 45% 45% 45%)",
          scale: 1.1,
          filter: "brightness(0.95)",
        });

        gsap.set(finalHeroLayerRef.current, {
          display: "none",
          opacity: 0,
          pointerEvents: "none",
        });

        gsap.set(
          [
            finalSubRef.current,
            finalTitleRef.current,
            finalDescRef.current,
            finalButtonsRef.current,
          ],
          { opacity: 0, y: 22 }
        );

        gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 15 });
        gsap.set(skipBtnRef.current, { opacity: 0 });

        // MASTER TIMELINE
        const tl = gsap.timeline({
          paused: false,
          onComplete: () => {
            clearTimeout(safetyTimer);
            sessionStorage.setItem("bagalkot-intro-seen", "true");
            setAnimStage("HERO_READY");
            setIntroFinished(true);
            unlockScroll();

            // Clean up unneeded layers
            if (initialHeroContentRef.current) {
              gsap.set(initialHeroContentRef.current, { display: "none" });
            }
            if (introTextLayerRef.current) {
              gsap.set(introTextLayerRef.current, { display: "none" });
            }
            if (revealLayerRef.current) {
              gsap.set(revealLayerRef.current, { display: "none" });
            }
            if (skipBtnRef.current) {
              gsap.set(skipBtnRef.current, { display: "none" });
            }
            if (darkOverlayRef.current) {
              gsap.set(darkOverlayRef.current, { opacity: 0 });
            }
            if (finalHeroLayerRef.current) {
              gsap.set(finalHeroLayerRef.current, { pointerEvents: "auto" });
            }
          },
        });

        masterTimeline.current = tl;

        // Show skip button gently
        tl.to(skipBtnRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.3);

        // 1. CAMERA PUSH ON HERO (0.0s - 1.8s)
        tl.to(
          heroImageRef.current,
          {
            scale: 1.05,
            duration: 1.8,
            ease: "power2.inOut",
          },
          0
        );

        // 2. HERO CONTENT EXIT UPWARD (0.4s - 1.4s)
        tl.to(
          initialHeroContentRef.current,
          {
            y: -55,
            opacity: 0,
            filter: "blur(6px)",
            duration: 1.0,
            ease: "power2.in",
            onComplete: () => {
              if (initialHeroContentRef.current) {
                gsap.set(initialHeroContentRef.current, { display: "none" });
              }
              setAnimStage("INTRO_DARKEN");
            },
          },
          0.4
        );

        // 3. IMAGE DARKENS TO BLACK (0.9s - 1.9s)
        tl.to(
          darkOverlayRef.current,
          {
            opacity: 1.0,
            duration: 1.0,
            ease: "power2.inOut",
          },
          0.9
        );

        // 4. BRIEF BLACK FRAME PAUSE (1.9s - 2.2s)

        // 5. TITLE_KARNATAKA (2.2s - 3.2s)
        tl.call(() => {
          setAnimStage("TITLE_KARNATAKA");
          if (introTextLayerRef.current) {
            gsap.set(introTextLayerRef.current, { display: "flex", opacity: 1 });
          }
          if (karnatakaRef.current) {
            gsap.set(karnatakaRef.current, { display: "block" });
          }
        }, null, 2.2);

        tl.to(
          karnatakaRef.current,
          {
            opacity: 1,
            y: 0,
            letterSpacing: isMobile ? "0.38em" : "0.5em",
            duration: 0.8,
            ease: "power3.out",
          },
          2.25
        );

        // 6. KARNATAKA LIFTS & BAGALKOT EMERGES (3.2s - 4.4s)
        tl.to(
          karnatakaRef.current,
          {
            opacity: 0,
            y: -18,
            filter: "blur(5px)",
            duration: 0.45,
            ease: "power2.in",
            onComplete: () => {
              if (karnatakaRef.current) {
                gsap.set(karnatakaRef.current, { display: "none" });
              }
              setAnimStage("TITLE_BAGALKOT");
            },
          },
          3.2
        );

        tl.call(() => {
          if (bagalkotIntroRef.current) {
            gsap.set(bagalkotIntroRef.current, { display: "block" });
          }
        }, null, 3.55);

        tl.to(
          bagalkotIntroRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1.0,
            filter: "blur(0px)",
            letterSpacing: isMobile ? "0.22em" : "0.35em",
            duration: 0.9,
            ease: "power3.out",
          },
          3.6
        );

        // 7. WHERE STONE TELLS STORIES + GOLD LINE (4.4s - 5.5s)
        tl.call(() => setAnimStage("TITLE_STORY"), null, 4.4);

        tl.to(
          storyLine1Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          4.45
        );

        tl.to(
          storyLine2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          4.65
        );

        tl.to(
          goldenLineRef.current,
          {
            width: isMobile ? "100px" : "150px",
            opacity: 1,
            duration: 0.8,
            ease: "power3.inOut",
          },
          4.9
        );

        // 8. PAUSE TO CONTEMPLATE THE HERO COMPOSITION (5.5s - 6.4s)

        // 9. INTRO TEXT DISSOLVES (6.4s - 7.1s)
        tl.to(
          introTextLayerRef.current,
          {
            opacity: 0,
            scale: 0.97,
            filter: "blur(8px)",
            duration: 0.65,
            ease: "power2.inOut",
            onComplete: () => {
              if (introTextLayerRef.current) {
                gsap.set(introTextLayerRef.current, { display: "none" });
              }
              setAnimStage("IMAGE_REVEAL");
            },
          },
          6.4
        );

        // 10. CENTER IRIS RECTANGLE EXPANSION REVEAL (6.9s - 8.6s)
        tl.call(() => {
          if (revealLayerRef.current) {
            gsap.set(revealLayerRef.current, {
              display: "block",
              opacity: 1,
              clipPath: isMobile ? "inset(42% 40% 42% 40%)" : "inset(45% 45% 45% 45%)",
              scale: 1.1,
              filter: "brightness(0.95)",
            });
          }
        }, null, 6.9);

        tl.to(
          revealLayerRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1.0,
            filter: "brightness(1.0)",
            duration: isMobile ? 1.3 : 1.6,
            ease: "power4.inOut",
          },
          7.0
        );

        tl.to(
          revealBorderRef.current,
          {
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          7.8
        );

        tl.to(
          darkOverlayRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          8.1
        );

        tl.to(skipBtnRef.current, { opacity: 0, duration: 0.4 }, 7.6);

        // 11. FINAL HERO CONTENT REVEAL (8.3s - 9.8s)
        tl.call(() => {
          setAnimStage("HERO_READY");
          if (finalHeroLayerRef.current) {
            gsap.set(finalHeroLayerRef.current, {
              display: "flex",
              opacity: 1,
            });
          }
        }, null, 8.3);

        tl.to(
          finalSubRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          8.35
        );

        tl.to(
          finalTitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          8.5
        );

        tl.to(
          finalDescRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          8.75
        );

        tl.to(
          finalButtonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          8.95
        );

        tl.to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          9.2
        );

        // Boost speed on mobile
        if (isMobile) {
          tl.timeScale(1.25);
        }
      } catch (err) {
        console.error("Cinematic intro error, falling back to final hero:", err);
        handleSkip();
      }
    }, rootRef);

    return () => {
      clearTimeout(safetyTimer);
      unlockScroll();
      ctx.revert();
    };
  }, []);

  // Keyboard shortcut listener (Escape to skip)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleSkip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Hero Image Carousel ONLY starts after intro is complete
  useEffect(() => {
    if (!introFinished) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_VIEWS.length);
    }, LOOP_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [introFinished]);

  // Subtle cursor depth shift on desktop after intro completes
  useEffect(() => {
    if (!introFinished || typeof window === "undefined" || window.innerWidth < 768) return;

    const handlePointerMove = (e) => {
      if (!imageLayerRef.current) return;
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 8;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 5;

      gsap.to(imageLayerRef.current, {
        x: xOffset,
        y: yOffset,
        duration: 1.4,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [introFinished]);

  // Scroll parallax exit when scrolling past hero
  useEffect(() => {
    if (!introFinished) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(imageLayerRef.current, { yPercent: -8, scale: 1.04, ease: "none" }, 0)
        .to(
          finalHeroLayerRef.current,
          { yPercent: -22, opacity: 0, pointerEvents: "none", ease: "none" },
          0
        );
    }, rootRef);

    return () => ctx.revert();
  }, [introFinished]);

  return (
    <div
      ref={rootRef}
      className="cinematic-stage relative flex w-full min-h-[100svh] min-h-[100dvh] items-center justify-center overflow-hidden bg-charcoal-950 pt-[calc(var(--nav-height)+0.5rem)] pb-12"
      aria-label="Bagalkot Heritage Tourism — Introduction"
    >
      {/* ======================================================== */}
      {/* 1. HERO IMAGE LAYER (Locked on image 0 during intro)     */}
      {/* ======================================================== */}
      <div
        ref={imageLayerRef}
        className="image-layer absolute inset-0 overflow-hidden pointer-events-none z-[var(--z-background)]"
      >
        {HERO_VIEWS.map((view, index) => {
          const isActive = index === activeIdx;
          return (
            <div
              key={view.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={view.src}
                alt={view.alt}
                ref={index === 0 ? heroImageRef : null}
                className="cinematic-img select-none object-[50%_35%] md:object-center"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 2. FILM LOOK: Ambient Radial Vignette & Linear Gradients */}
      {/* ======================================================== */}
      <div
        className="film-look absolute inset-0 pointer-events-none z-[calc(var(--z-background)+5)]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(14,12,10,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-transparent to-charcoal-950/95" />
      </div>

      {/* ======================================================== */}
      {/* 3. OVERLAY LAYER (Dark overlay for cinematic black scene)*/}
      {/* ======================================================== */}
      <div
        ref={darkOverlayRef}
        className="dark-overlay absolute inset-0 bg-charcoal-950 pointer-events-none z-[var(--z-overlay)]"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />

      {/* ======================================================== */}
      {/* 4. TRANSITION LAYER (Masked iris rectangle reveal)       */}
      {/* ======================================================== */}
      <div
        ref={revealLayerRef}
        className="reveal-layer absolute inset-0 overflow-hidden pointer-events-none z-[calc(var(--z-overlay)+5)] hidden"
        style={{
          opacity: 0,
          clipPath: "inset(45% 45% 45% 45%)",
        }}
        aria-hidden="true"
      >
        <img
          src={HERO_VIEWS[0].src}
          alt=""
          className="cinematic-img select-none object-[50%_35%] md:object-center"
          loading="eager"
          decoding="async"
        />
        <div
          ref={revealBorderRef}
          className="absolute inset-0 border border-gold-400/50 pointer-events-none transition-opacity duration-700"
        />
      </div>

      {/* ======================================================== */}
      {/* 5. INITIAL HERO CONTENT LAYER (Exits upward at start)    */}
      {/* ======================================================== */}
      <div
        ref={initialHeroContentRef}
        className="initial-hero-content absolute z-[var(--z-cinematic-typography)] flex flex-col items-center px-4 text-center max-w-4xl pointer-events-none"
      >
        <p className="eyebrow mb-3 text-gold-400">
          Karnataka Tourism · Official Heritage Valley Portal
        </p>
        <h1 className="font-display font-light leading-[0.92] text-ivory text-[12vw] md:text-[8.5vw] lg:text-[7vw] tracking-tight drop-shadow-lg word-keep">
          BAGALKOT
        </h1>
        <p className="mt-3 font-display text-lg md:text-2xl tracking-[0.25em] text-gold-400 uppercase word-keep">
          Where Stone Tells Stories
        </p>
      </div>

      {/* ======================================================== */}
      {/* 6. INTRO TEXT LAYER (Karnataka → Bagalkot → Story)       */}
      {/* ======================================================== */}
      <div
        ref={introTextLayerRef}
        className="intro-text-layer absolute inset-0 z-[var(--z-cinematic-typography)] hidden flex-col items-center justify-center px-4 text-center pointer-events-none"
      >
        {/* Step A: KARNATAKA */}
        <div
          ref={karnatakaRef}
          className="karnataka-title hidden font-display text-sm md:text-xl font-normal text-gold-400 uppercase drop-shadow word-keep"
          style={{ letterSpacing: "0.25em" }}
        >
          KARNATAKA
        </div>

        {/* Step B: BAGALKOT */}
        <div
          ref={bagalkotIntroRef}
          className="bagalkot-intro hidden font-display text-5xl md:text-8xl lg:text-9xl font-light text-ivory tracking-[0.3em] uppercase drop-shadow-2xl mt-1 word-keep"
        >
          BAGALKOT
        </div>

        {/* Step C: WHERE STONE TELLS STORIES */}
        <div className="story-lines-container mt-6 md:mt-8 flex flex-col items-center gap-1.5 overflow-hidden">
          <span
            ref={storyLine1Ref}
            className="story-line font-display text-base md:text-2xl lg:text-3xl text-stone-200 tracking-[0.22em] uppercase font-light word-keep"
          >
            WHERE STONE
          </span>
          <span
            ref={storyLine2Ref}
            className="story-line font-display text-base md:text-2xl lg:text-3xl text-gold-400 tracking-[0.22em] uppercase font-light drop-shadow word-keep"
          >
            TELLS STORIES
          </span>
        </div>

        {/* Step D: GOLDEN LINE */}
        <div
          ref={goldenLineRef}
          className="transition-line mt-6 md:mt-8 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent"
          style={{ width: "0px" }}
        />
      </div>

      {/* ======================================================== */}
      {/* 7. HERO READY LAYER (Settled final hero state)           */}
      {/* ======================================================== */}
      <div
        ref={finalHeroLayerRef}
        className="hero-ready-layer relative z-[calc(var(--z-cinematic-typography)+5)] hidden flex-col items-center px-4 md:px-6 text-center max-w-5xl mx-auto"
      >
        <p ref={finalSubRef} className="eyebrow mb-3 text-gold-400">
          Karnataka Tourism · Official Heritage Valley Portal
        </p>

        <h1
          ref={finalTitleRef}
          className="font-display font-light leading-[0.92] text-ivory drop-shadow-md"
        >
          <span className="block text-[12vw] md:text-[8.5vw] lg:text-[7vw] font-normal tracking-tight word-keep">
            BAGALKOT
          </span>
          <span className="mt-2 block font-display text-xl md:text-3xl lg:text-4xl tracking-[0.25em] text-gold-400 font-normal drop-shadow word-keep">
            WHERE STONE TELLS STORIES
          </span>
          <span className="mt-2 block text-[11px] md:text-sm tracking-[0.35em] text-stone-200 uppercase font-light word-keep">
            Cradle of Indian Temple Architecture
          </span>
        </h1>

        <p
          ref={finalDescRef}
          className="body-large mt-5 max-w-2xl text-stone-200 drop-shadow-sm font-sans"
        >
          The official digital tourism guide to Badami, UNESCO Pattadakal, Aihole &amp; Mahakuta.
          Discover 1,400 years of rock-cut sanctuaries, live travel logistics, and curated valley
          circuits.
        </p>

        {/* Primary Action Buttons */}
        <div
          ref={finalButtonsRef}
          className="mt-7 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-950 transition-all hover:bg-gold-400 hover:scale-105 hover:shadow-[0_0_28px_rgba(181,137,56,0.4)] active:scale-95"
          >
            Explore Heritage
          </Link>
          <Link
            href="/planner"
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/60 bg-charcoal-950/60 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-300 transition-all hover:border-gold-400 hover:bg-gold-500/15 hover:scale-105 active:scale-95"
          >
            Plan Your Trip
          </Link>
          <Link
            href="/scanner"
            className="inline-flex items-center gap-2 rounded-full border border-stone-400/40 bg-charcoal-950/40 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-stone-200 transition-all hover:border-stone-200 hover:text-ivory hover:bg-charcoal-950/70 active:scale-95"
          >
            <ScanSearch size={14} strokeWidth={2} aria-hidden="true" />
            AI Monument Scanner
          </Link>
        </div>

        {/* Landscape Switcher Indicator Dots */}
        {introFinished && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {HERO_VIEWS.map((view, idx) => (
              <button
                key={view.id}
                onClick={() => setActiveIdx(idx)}
                aria-label={`Jump to view ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === activeIdx
                    ? "w-8 bg-gold-400 shadow-[0_0_10px_rgba(181,137,56,0.6)]"
                    : "w-2 bg-stone-500/40 hover:bg-stone-400/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 8. SCROLL INDICATOR                                      */}
      {/* ======================================================== */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator absolute bottom-4 left-1/2 z-[var(--z-floating-controls)] pb-safe flex -translate-x-1/2 flex-col items-center gap-1.5 text-stone-400 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-stone-400">
          Scroll to explore
        </span>
        <ArrowDown size={13} className="animate-bounce text-gold-400" strokeWidth={1.5} />
      </div>

      {/* ======================================================== */}
      {/* 9. SKIP INTRO BUTTON                                     */}
      {/* ======================================================== */}
      <button
        ref={skipBtnRef}
        type="button"
        onClick={handleSkip}
        className="skip-button fixed top-4 right-4 md:top-6 md:right-8 z-[var(--z-dialog)] pt-safe inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-charcoal-950/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-300 backdrop-blur-md transition-all hover:border-gold-400 hover:text-gold-300 hover:bg-charcoal-950 shadow-lg"
        aria-label="Skip cinematic introduction"
      >
        <span>Skip Intro</span>
        <span className="hidden md:inline-block ml-1 px-1.5 py-0.2 text-[9px] font-mono text-stone-400 bg-charcoal-900 border border-stone-700/60 rounded">
          ESC
        </span>
      </button>
    </div>
  );
}
