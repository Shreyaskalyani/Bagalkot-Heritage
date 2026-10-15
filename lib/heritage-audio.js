/**
 * Heritage Audio & Speech Engine for Bagalkot Heritage Tourism
 * 
 * Provides:
 * 1. Web Speech Synthesis with multi-language voice detection (EN, KN, HI)
 * 2. Chromium 15-second speech keepalive bug workaround
 * 3. Real-time speech progress tracking and pause/resume/restart states
 * 4. Web Audio API acoustic temple chime & warm harmonic resonance
 */

class HeritageAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.currentUtterance = null;
    this.keepAliveTimer = null;
    this.progressTimer = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.isMuted = false;
    this.volume = 1;
    this.currentText = "";
    this.currentLang = "en";
    this.totalDurationEstimate = 30; // seconds
    this.elapsedSeconds = 0;
    this.callbacks = {
      onStart: () => {},
      onProgress: () => {},
      onEnd: () => {},
      onError: () => {},
    };
  }

  getAudioContext() {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Plays a gentle, resonant temple bell / tanpura drone chime using Web Audio API.
   * Gives instant acoustic confirmation and atmospheric depth.
   */
  playTempleChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx || this.isMuted) return;

      const now = ctx.currentTime;
      // Frequencies for a warm meditative chord (B2, F#3, B3, D#4)
      const freqs = [123.47, 185.0, 246.94, 311.13];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now);

        const baseGain = 0.04 / (idx + 1);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(baseGain * this.volume, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.9);
      });
    } catch (e) {
      // AudioContext may be blocked until user gesture, safely ignore
    }
  }

  /**
   * Finds the best voice for the chosen language
   */
  getBestVoice(lang) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) return null;

    if (lang === "kn") {
      // Kannada voice
      const knVoice = voices.find(
        (v) => v.lang.startsWith("kn") || v.name.toLowerCase().includes("kannada")
      );
      if (knVoice) return knVoice;
    }

    if (lang === "hi") {
      // Hindi voice
      const hiVoice = voices.find(
        (v) => v.lang.startsWith("hi") || v.name.toLowerCase().includes("hindi")
      );
      if (hiVoice) return hiVoice;
    }

    // Indian English preferred for heritage narration
    const inEnVoice = voices.find(
      (v) =>
        (v.lang === "en-IN" || v.lang === "en_IN") ||
        (v.lang.startsWith("en") && (v.name.includes("India") || v.name.includes("Ravi") || v.name.includes("Heera")))
    );
    if (inEnVoice) return inEnVoice;

    // Fallback to any natural English voice
    const enVoice = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Daniel"))
    );
    if (enVoice) return enVoice;

    // Default voice for the language
    const langPrefix = lang === "kn" ? "kn" : lang === "hi" ? "hi" : "en";
    return voices.find((v) => v.lang.startsWith(langPrefix)) || voices[0] || null;
  }

  /**
   * Speak narration text
   */
  speak({ text, lang = "en", callbacks = {}, initialElapsed = 0 }) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      callbacks.onError?.("Speech synthesis not supported");
      return;
    }

    this.stop();

    this.currentText = text;
    this.currentLang = lang;
    this.callbacks = callbacks;
    this.elapsedSeconds = initialElapsed;

    // Estimate duration: average 130 words per minute
    const words = text.trim().split(/\s+/).length;
    this.totalDurationEstimate = Math.max(12, Math.round((words / 130) * 60));

    // Play subtle chime on start
    this.playTempleChime();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    const voice = this.getBestVoice(lang);
    if (voice) utterance.voice = voice;

    utterance.lang = lang === "kn" ? "kn-IN" : lang === "hi" ? "hi-IN" : "en-IN";
    utterance.rate = lang === "kn" || lang === "hi" ? 0.92 : 0.95;
    utterance.pitch = 1.0;
    utterance.volume = this.isMuted ? 0 : this.volume;

    utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.startProgressTracking();
      this.startKeepAlive();
      this.callbacks.onStart?.({
        totalSecs: this.totalDurationEstimate,
        elapsed: this.elapsedSeconds,
      });
    };

    utterance.onend = () => {
      this.cleanup();
      this.callbacks.onEnd?.();
    };

    utterance.onerror = (e) => {
      if (e.error === "interrupted" || e.error === "canceled") return;
      this.cleanup();
      this.callbacks.onError?.(e);
    };

    // Word boundary tracking for smooth progress
    utterance.onboundary = (e) => {
      if (e.name === "word" && this.currentText.length > 0) {
        const charPct = e.charIndex / this.currentText.length;
        const calculatedSecs = Math.round(charPct * this.totalDurationEstimate);
        if (calculatedSecs > this.elapsedSeconds) {
          this.elapsedSeconds = calculatedSecs;
        }
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  startProgressTracking() {
    this.stopProgressTracking();
    this.progressTimer = setInterval(() => {
      if (this.isPlaying && !this.isPaused) {
        this.elapsedSeconds += 1;
        if (this.elapsedSeconds > this.totalDurationEstimate) {
          this.elapsedSeconds = this.totalDurationEstimate;
        }
        this.callbacks.onProgress?.({
          elapsed: this.elapsedSeconds,
          totalSecs: this.totalDurationEstimate,
          progressPct: (this.elapsedSeconds / this.totalDurationEstimate) * 100,
        });
      }
    }, 1000);
  }

  stopProgressTracking() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  /**
   * Chromium bug workaround: keeps utterance alive past 15 seconds
   */
  startKeepAlive() {
    this.stopKeepAlive();
    this.keepAliveTimer = setInterval(() => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 10000);
  }

  stopKeepAlive() {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  pause() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (this.isPlaying && !this.isPaused) {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  resume() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (this.isPlaying && this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    } else if (!this.isPlaying && this.currentText) {
      this.speak({
        text: this.currentText,
        lang: this.currentLang,
        callbacks: this.callbacks,
        initialElapsed: this.elapsedSeconds,
      });
    }
  }

  stop() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.cleanup();
  }

  cleanup() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.stopKeepAlive();
    this.stopProgressTracking();
  }

  setMute(mute) {
    this.isMuted = mute;
    if (this.currentUtterance) {
      this.currentUtterance.volume = mute ? 0 : this.volume;
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentUtterance && !this.isMuted) {
      this.currentUtterance.volume = this.volume;
    }
  }
}

// Global singleton instance so audio doesn't overlap across components
let globalAudioEngine = null;

export function getHeritageAudioEngine() {
  if (typeof window === "undefined") return null;
  if (!globalAudioEngine) {
    globalAudioEngine = new HeritageAudioEngine();
  }
  return globalAudioEngine;
}
