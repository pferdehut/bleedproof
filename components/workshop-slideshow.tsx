"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkshopSlideshowProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function WorkshopSlideshow({
  images,
  alt,
  className,
}: WorkshopSlideshowProps) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "bg-muted flex items-center justify-center aspect-[4/3]",
          className
        )}
        aria-label="Kein Bild vorhanden"
      >
        <span className="text-muted-foreground text-sm font-mono">
          No image
        </span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={cn("relative aspect-[4/3] overflow-hidden", className)}>
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden group", className)}>
      {images.map((src, i) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            i === current ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={i !== current}
        >
          <Image
            src={src}
            alt={`${alt} — Bild ${i + 1} von ${images.length}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
        aria-label="Nächstes Bild"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all",
              i === current ? "bg-background w-4" : "bg-background/50"
            )}
            aria-label={`Bild ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
