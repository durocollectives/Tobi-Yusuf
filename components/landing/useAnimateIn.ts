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

    // ── Legacy .animate-in (stagger by DOM index) ──
    const animateInTargets = Array.from(
      document.querySelectorAll<HTMLElement>(".animate-in")
    );

    if (prefersReducedMotion) {
      animateInTargets.forEach((el) => el.classList.add("visible"));
      const revealTargets = REVEAL_CLASSES.flatMap((cls) =>
        Array.from(document.querySelectorAll<HTMLElement>(`.${cls}`))
      );
      revealTargets.forEach((el) => el.classList.add("visible"));
      return;
    }

    animateInTargets.forEach((el, i) => {
      if (!el.dataset.staggerIndex) el.dataset.staggerIndex = String(i);
    });

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
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
    );
    animateInTargets.forEach((el) => animateInObserver.observe(el));

    // ── New reveal classes (CSS handles sequencing, observer just adds .visible) ──
    const revealTargets = REVEAL_CLASSES.flatMap((cls) =>
      Array.from(document.querySelectorAll<HTMLElement>(`.${cls}`))
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));

    return () => {
      animateInObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);
}
