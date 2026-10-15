"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: (key, fallback) => fallback || key,
  localize: (content) => content,
});

export const TRANSLATIONS = {
  // Navigation Bar Links
  "/explore": {
    en: "Explore",
    kn: "ಅನ್ವೇಷಿಸಿ",
    hi: "अन्वेषण",
  },
  "/destinations": {
    en: "Destinations",
    kn: "ತಾಣಗಳು",
    hi: "गंतव्य",
  },
  "/waterfalls": {
    en: "Waterfalls",
    kn: "ಜಲಪಾತಗಳು",
    hi: "जलप्रपात",
  },
  "/360-heritage": {
    en: "360° View",
    kn: "360° ವೀಕ್ಷಣೆ",
    hi: "360° दृश्य",
  },
  "/food-culture": {
    en: "Food & Culture",
    kn: "ಆಹಾರ & ಸಂಸ್ಕೃತಿ",
    hi: "खान-पान एवं संस्कृति",
  },
  "/heritage": {
    en: "Heritage",
    kn: "ಪರಂಪರೆ",
    hi: "धरोहर",
  },
  "/planner": {
    en: "Trip Planner",
    kn: "ಪ್ರವಾಸ ಯೋಜನೆ",
    hi: "यात्रा योजनाकार",
  },
  "/map": {
    en: "Map",
    kn: "ನಕ್ಷೆ",
    hi: "मानचित्र",
  },
  "/stories": {
    en: "Stories",
    kn: "ಕಥೆಗಳು",
    hi: "कहानियाँ",
  },
  "/guide": {
    en: "AI Guide",
    kn: "AI ಮಾರ್ಗದರ್ಶಿ",
    hi: "एआई गाइड",
  },
  "/visitor-center": {
    en: "Visitor Center",
    kn: "ಯಾತ್ರಿ ಕೇಂದ್ರ",
    hi: "आगंतुक केंद्र",
  },
  // Header Actions
  search: {
    en: "Search",
    kn: "ಹುಡುಕಿ",
    hi: "खोजें",
  },
  search_placeholder: {
    en: "Search Bagalkot (monuments, food, stories...)",
    kn: "ಬಾಗಲಕೋಟೆ ಅನ್ವೇಷಿಸಿ (ಸ್ಮಾರಕಗಳು, ಆಹಾರ, ಕಥೆಗಳು...)",
    hi: "बागलकोट खोजें (स्मारक, भोजन, कहानियाँ...)",
  },
  ai_scan: {
    en: "AI Scan",
    kn: "AI ಸ್ಕ್ಯಾನ್",
    hi: "एआई स्कैन",
  },
  brand_title: {
    en: "BAGALKOT",
    kn: "ಬಾಗಲಕೋಟೆ",
    hi: "बागलकोट",
  },
  brand_subtitle: {
    en: "Heritage Tourism",
    kn: "ಪರಂಪರೆ ಪ್ರವಾಸೋದ್ಯಮ",
    hi: "धरोहर पर्यटन",
  },
  // Map & Viewpoint Strings
  viewpoint_navigator: {
    en: "Geographic Viewpoint Navigator",
    kn: "ಭೌಗೋಳಿಕ ವೀಕ್ಷಣೆ ಮಾರ್ಗದರ್ಶಿ",
    hi: "भौगोलिक दृष्टिकोण नेविगेटर",
  },
  find_the_view: {
    en: "Find the View. Find the Place.",
    kn: "ನೋಟವನ್ನು ಅರಿಯಿರಿ. ತಾಣವನ್ನು ತಲುಪಿ.",
    hi: "दृश्य खोजें। स्थान पाएं।",
  },
  map_desc: {
    en: "Locate every 360° viewpoint across the Malaprabha River Valley. Click any viewpoint pin on the map to instantly swing the panoramic camera to that heritage site.",
    kn: "ಮಲಪ್ರಭಾ ನದಿ ಕಣಿವೆಯ ಪ್ರತಿಯೊಂದು 360° ವೀಕ್ಷಣಾ ತಾಣವನ್ನು ನಕ್ಷೆಯಲ್ಲಿ ಗುರುತಿಸಿ. ಆ ಸ್ಥಳದ ವಿಹಂಗಮ ಕ್ಯಾಮೆರಾ ವೀಕ್ಷಣೆಗೆ ಯಾವುದೇ ಪಿನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.",
    hi: "मलप्रभा नदी घाटी में प्रत्येक 360° दृश्य स्थल का पता लगाएं। उस विरासत स्थल पर पैनोरमिक कैमरा ले जाने के लिए मानचित्र पर किसी भी पिन पर क्लिक करें।",
  },
  open_full_map: {
    en: "Open Full Valley Corridor Map",
    kn: "ಸಂಪೂರ್ಣ ಕಣಿವೆ ನಕ್ಷೆ ತೆರೆಯಿರಿ",
    hi: "संपूर्ण घाटी मानचित्र खोलें",
  },
  quick_jump: {
    en: "Quick Jump:",
    kn: "ತ್ವರಿತ ಆಯ್ಕೆ:",
    hi: "त्वरित चयन:",
  },
  directions: {
    en: "Directions",
    kn: "ದಾರಿ",
    hi: "दिशा-निर्देश",
  },
  details: {
    en: "Details",
    kn: "ವಿವರಗಳು",
    hi: "विवरण",
  },
  drive_here: {
    en: "Drive Here",
    kn: "ಇಲ್ಲಿಗೆ ಚಾಲನೆ ಮಾಡಿ",
    hi: "यहाँ ड्राइव करें",
  },
  // Category Labels
  category_monument: {
    en: "Monument",
    kn: "ಸ್ಮಾರಕ",
    hi: "स्मारक",
  },
  category_hotel: {
    en: "Hotel",
    kn: "ಹೋಟೆಲ್",
    hi: "होटल",
  },
  category_food: {
    en: "Food",
    kn: "ಆಹಾರ",
    hi: "खान-पान",
  },
  category_transit: {
    en: "Transit",
    kn: "ಸಾರಿಗೆ",
    hi: "परिवहन",
  },
  category_handloom: {
    en: "Handloom",
    kn: "ಕೈಮಗ್ಗ",
    hi: "हथकरघा",
  },
  category_safety: {
    en: "Safety",
    kn: "ಸುರಕ್ಷತೆ",
    hi: "सुरक्षा",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  // Load language preference from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bagalkot_language");
      if (saved && (saved === "en" || saved === "kn" || saved === "hi")) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // localStorage not accessible
    }
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("bagalkot_language", lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const t = (key, fallback = "") => {
    const entry = TRANSLATIONS[key];
    if (!entry) return fallback || key;
    return entry[language] || entry.en || fallback || key;
  };

  const localize = (content) => {
    if (!content) return "";
    if (typeof content === "string") return content;
    if (typeof content === "object") {
      // Format { en: "...", kn: "...", hi: "..." }
      if (content[language]) return content[language];
      if (content.en) return content.en;

      // Format { name: "...", kannadaName: "...", hindiName: "..." }
      if (language === "kn" && content.kannadaName) return content.kannadaName;
      if (language === "hi" && content.hindiName) return content.hindiName;
      if (content.name) return content.name;
    }
    return String(content);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
