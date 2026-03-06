import { InteractiveLogoGame } from "@/components/interactive-logo-game"

export const metadata = {
  title: "Logo Game | Bleedproof",
  description: "Play with the Bleedproof logo - marble run on mobile, pinball on desktop",
}

export default function GamePage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="font-display text-4xl md:text-6xl uppercase text-lime mb-8 text-center">Logo Game</h1>
      <InteractiveLogoGame />
      <p className="mt-8 text-offwhite/60 text-sm text-center max-w-md">
        {typeof window !== "undefined" && window.innerWidth < 768
          ? "Tilt your device to control the marble. Tap to drop more balls."
          : "Use A/D or Arrow Keys for flippers. Space or click to launch balls."}
      </p>
    </main>
  )
}
