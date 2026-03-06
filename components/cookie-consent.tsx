"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "bleedproof_cookies_accepted";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      // Small delay so it doesn't flash immediately
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "false");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einwilligung"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50 bg-foreground text-background p-5 rounded-none shadow-lg"
    >
      <p className="text-sm leading-relaxed mb-4">
        Diese Website verwendet Cookies für Analysezwecke (Vercel Analytics).{" "}
        <Link href="/cookies" className="underline hover:opacity-75">
          Mehr erfahren
        </Link>
      </p>
      <div className="flex gap-3">
        <button
          onClick={accept}
          className="flex-1 h-10 bg-accent text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Akzeptieren
        </button>
        <button
          onClick={decline}
          className="flex-1 h-10 border border-background/30 text-background text-sm font-medium hover:bg-background/10 transition-colors"
        >
          Ablehnen
        </button>
      </div>
    </div>
  );
}
