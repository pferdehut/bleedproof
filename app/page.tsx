import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InteractiveLogoGame } from "@/components/interactive-logo-game"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-white p-0 m-0">
      <div className="grid-collage grid-cols-12">
        <div className="col-span-6 md:col-span-3 box box-coral h-full min-h-[250px] md:min-h-[350px] flex items-center justify-center overflow-hidden">
          <InteractiveLogoGame />
        </div>

        <div className="col-span-6 md:col-span-4 box box-coral px-2 py-6 md:p-6 min-h-[250px] md:min-h-[350px] flex flex-col justify-between">
          <div className="text-xs font-bold mb-3">bleedproof</div>
          <h1 className="text-4xl md:text-7xl font-display">
            Druck
            <br />
            work
            <br />
            shops
          </h1>
        </div>

        <div className="col-span-12 md:col-span-5 md:-ml-18 box box-blue px-2 py-6 md:p-6 min-h-[200px] md:min-h-[350px] flex items-center justify-center bg-linear-to-t md:bg-linear-to-l from-blue from-90% to-coral to-100%">
          <p className="text-lg md:text-xl w-3/4 leading-tight">
            Von Siebdruck über Riso- und Linoldruck bis hin zu 3D-Druck: Gemeinsam entwickeln wir kleine
            Projekte.
          </p>
        </div>

        <Link
          href="/workshops"
          className="col-span-6 md:col-span-4  px-2 py-6 md:p-6 box box-mint min-h-[250px] hover:scale-[1.02] transition-transform"
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="text-sm mb-2 opacity-70">01</div>
              <h2 className="text-2xl md:text-5xl font-display leading-none">Workshops</h2>
            </div>
            <p className="text-sm mt-4">Alle unsere Workshops →</p>
          </div>
        </Link>

        <Link
          href="/team"
          className="col-span-6 md:col-span-3 px-2 py-6 md:p-6 box box-yellow min-h-[250px] hover:scale-[1.02] transition-transform"
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="text-sm mb-2 opacity-70">02</div>
              <h2 className="text-2xl md:text-5xl font-display leading-none">Team</h2>
            </div>
            <p className="text-sm mt-4">Wer bietet die Workshops an →</p>
          </div>
        </Link>

        <div className="col-span-12 md:col-span-5 relative flex justify-center box box-lime min-h-[250px] md:min-h-[300px] p-0 bg-lime z-40">
          <Image src="/illus/smile-shirt.png" alt="smiley t-shirt" className="absolute w-2/3 md:w-2/3 object-center pt-16 -top-[50px] md:-top-[50px] object-contain opacity-90" />
        </div>

        <Link
          href="/contact"
          className="col-span-6 md:col-span-3  px-2 py-6 md:p-6 box box-peach min-h-[250px] hover:scale-[1.02] transition-transform"
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="text-sm mb-2 opacity-70">03</div>
              <h2 className="text-2xl md:text-5xl font-display leading-none">Kontakt</h2>
            </div>
            <p className="text-sm mt-4">Schreibe uns →</p>
          </div>
        </Link>

        <Link
          href="/impressions"
          className="flex flex-col col-span-6 md:col-span-4  px-2 py-6 md:p-6 box box-purple min-h-[250px] hover:scale-[1.02] transition-transform"
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="text-sm mb-2 opacity-70">04</div>
              <h2 className="text-2xl md:text-5xl font-display leading-none">Impressionen</h2>
            </div>
            <p className="text-sm mt-4">Was wir bisher gemacht haben →</p>
          </div>
        </Link>

        <div className="col-span-12 md:col-span-5 px-2 py-6 md:p-6 box box-lime min-h-[200px] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-2xl md:text-3xl font-bold max-w-md leading-none ">Bereit für deinen ersten Workshop?</p>
          <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 text-lg px-8 py-6">
            <Link href="/workshops">los geht's →</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
