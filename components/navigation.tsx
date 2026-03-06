"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";

const navLinks = [
  { href: "/workshops", label: "Workshops" },
  { href: "/team", label: "Team" },
  { href: "/impressions", label: "Impressionen" },
  { href: "/contact", label: "Kontakt" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Fixed nav bar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-sm border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between px-5 md:px-8 h-14">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono font-bold text-base tracking-tight text-foreground hover:text-accent transition-colors"
            aria-label="bleedproof — Startseite"
          >
            bleedproof
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Hauptnavigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  pathname.startsWith(link.href)
                    ? "text-accent"
                    : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-foreground"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col pt-14">
          <nav
            className="flex flex-col px-5 py-8 gap-1"
            aria-label="Mobile Navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-4xl font-bold py-3 border-b border-border transition-colors hover:text-accent",
                  pathname.startsWith(link.href)
                    ? "text-accent"
                    : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
