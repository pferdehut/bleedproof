"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

const AUTOPLAY_DELAY = 4000

interface WorkshopSlideshowProps {
  images: string[]
  name: string
}

export function WorkshopSlideshow({ images, name }: WorkshopSlideshowProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  if (!images || images.length === 0) return null

  const next = useCallback(
    () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length]
  )
  const prev = () => {
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1))
    setPaused(true)
  }
  const goTo = (i: number) => {
    setCurrent(i)
    setPaused(true)
  }

  // Auto-advance, pauses on manual interaction then resumes after one cycle
  useEffect(() => {
    if (images.length <= 1 || paused) return
    const id = setInterval(next, AUTOPLAY_DELAY)
    return () => clearInterval(id)
  }, [images.length, next, paused])

  // Resume auto-play after the user has been idle for one delay period
  useEffect(() => {
    if (!paused) return
    const id = setTimeout(() => setPaused(false), AUTOPLAY_DELAY)
    return () => clearTimeout(id)
  }, [paused])

  return (
    <div className="col-span-12 box box-black p-0 min-h-[400px] md:min-h-[600px] relative overflow-hidden group">
      {/* Images */}
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <Image
            src={src}
            alt={`${name} – Bild ${i + 1}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Controls — only show if more than one image */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Vorheriges Bild"
            className="absolute left-0 top-0 h-full w-1/2 z-10 cursor-w-resize"
          />
          <button
            onClick={() => { next(); setPaused(true) }}
            aria-label="Nächstes Bild"
            className="absolute right-0 top-0 h-full w-1/2 z-10 cursor-e-resize"
          />

          {/* Counter */}
          <div className="absolute bottom-4 right-4 z-20 bg-black text-white text-xs font-black px-3 py-1 border-2 border-white">
            {current + 1} / {images.length}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Bild ${i + 1}`}
                className={`w-2 h-2 border-2 border-white transition-colors ${i === current ? "bg-white" : "bg-transparent"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
