"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook.
 * Returns null on the server / first render (use === true guards).
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
