"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "tobi_intentional_space_shown";

function hasBeenShown(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markShown(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch { /* ignore */ }
}

export function IntentionalSpaceModal() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new Date() >= new Date("2025-07-06T00:00:00Z")) return;
    if (hasBeenShown()) return;
    const t = window.setTimeout(() => {
      markShown();
      setOpen(true);
      requestAnimationFrame(() => setVisible(true));
    }, 2000);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    window.setTimeout(() => setOpen(false), 380);
  };

  if (!open) return null;

  return (
    <div
      className={`is-modal-backdrop${visible ? " is-modal-backdrop--visible" : ""}`}
      onClick={close}
      aria-modal="true"
      role="dialog"
      aria-labelledby="is-modal-title"
    >
      <div
        className={`is-modal-card${visible ? " is-modal-card--visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="is-modal-close"
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>

        <p className="is-modal-kicker">July 2025</p>

        <h2 id="is-modal-title" className="is-modal-title">
          The Intentional Space
        </h2>

        <p className="is-modal-body">
          A curated gathering for couples ready to go deeper — honest conversation,
          guided reflection, and a room designed for the marriage you actually want.
          Spaces are limited.
        </p>

        <a
          href="https://mrstobiyusuf.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-terracotta is-modal-cta"
          onClick={close}
        >
          Join the Waitlist
        </a>
      </div>
    </div>
  );
}
