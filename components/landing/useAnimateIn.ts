"use client";

import { useEffect } from "react";

const REVEAL_CLASSES = [
  "reveal-mask",
  "reveal-drift",
  "reveal-scale",
  "reveal-line",
  "reveal-sequence",
  "reveal-fade",
  "reveal-whisper",
] as const;

export function useAnimateIn() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const animateInTargets = Array.from(
      document.querySelectorAll<HTMLElement>(".animate-in")
    );

    const revealTargets = REVEAL_CLASSES.flatMap((cls) =>
      Array.from(document.querySelectorAll<HTMLElement>(`.${cls}`))
    );

    if (prefersReducedMotion) {
      animateInTargets.forEach((el) => el.classList.add("visible"));
      revealTargets.forEach((el) => el.classList.add("visible"));
      return;
    }

    animateInTargets.forEach((el, i) => {
      if (!el.dataset.staggerIndex) el.dataset.staggerIndex = String(i);
    });

    // Reveal elements already in the viewport on mount (no scroll needed)
    const revealIfInView = (el: HTMLElement, delay = 0) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setTimeout(() => el.classList.add("visible"), delay);
        return true;
      }
      return false;
    };

    animateInTargets.forEach((el, i) => {
      revealIfInView(el, Math.min(i * 60, 200));
    });
    revealTargets.forEach((el) => revealIfInView(el));

    const animateInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.staggerIndex || "0"
            );
            setTimeout(
              () => entry.target.classList.add("visible"),
              Math.min(idx * 60, 200)
            );
            animateInObserver.unobserve(entry.target);
          }
        });
      },
      // Positive rootMargin pre-triggers animations before elements enter viewport
      { threshold: 0.04, rootMargin: "0px 0px 25% 0px" }
    );
    animateInTargets.forEach((el) => animateInObserver.observe(el));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px 20% 0px" }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));

    return () => {
      animateInObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);
}
