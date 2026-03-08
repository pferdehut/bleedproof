import { ContactForm } from "@/components/contact-form"
import { getLocations } from "@/lib/notion/locations"
import Link from "next/link"
import Image from "next/image"

export const revalidate = 60

export default async function ContactPage() {
  let locations = []
  
  try {
    locations = await getLocations()
  } catch (error) {
    console.error('Error fetching locations:', error)
  }
  return (
    <div className="min-h-screen bg-white p-0">
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-12 md:col-span-4 absolute w-full md:w-1/2 flex justify-center md:justify-start left-0 md:left-1/4 top-0 min-h-[450px] md:min-h-[450px] p-0 bg-transparent z-40">
          <Image src="/illus/printer.png" alt="smiley t-shirt" className="relative w-full h-full top-0 md:w-5/8 object-center object-contain" />
        </div>
        
        {/* Hero block - orange */}
        <div className="col-span-12 md:col-span-6 box box-orange px-2 py-6 md:p-6 min-h-[450px] flex flex-col justify-between content-between">
          <div className="text-xs mb-3">kontakt</div>
          <h1 className="text-5xl md:text-7xl font-display leading-none">
            ANFRAGEN &<br />
            BUCHUNGEN
          </h1>
        </div>

        {/* Description block - sky */}
        <div className="col-span-12 md:col-span-6 box box-sky px-2 py-6 md:p-6 min-h-[450px] flex justify-center items-center">
          <div className="md:w-3/4">
            <p className="text-lg md:text-xl leading-tight mb-6">
              Hast du Fragen zu unseren Workshops? Möchtest du genaueres darüber erfahren, was wir anbieten?
            </p>
            <p className="text-base">Schreibe uns. Wir melden uns baldmöglichst bei dir.</p>
          </div>
        </div>

        {/* Contact form block - white */}
        <div className="col-span-12 md:col-span-7 box box-white px-2 py-6 md:p-6 min-h-[500px]">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Sende uns eine Nachricht</h2>
          <p className="text-sm mb-8">
            Fülle das Formular aus und wir melden uns innerhalb der nächsten 72h bei dir.
          </p>
          <ContactForm />
        </div>

        {/* Locations block - peach */}
        <div className="col-span-12 md:col-span-5 box box-peach px-2 py-6 md:p-6 min-h-[500px]">
          <div className="text-xs mb-3 opacity-70">01</div>
          <h2 className="text-3xl md:text-4xl font-display mb-6">Workshop Orte</h2>
          <div className="space-y-4">
            {locations && locations.length > 0 ? (
              locations.map((location) => (
                <div key={location.id} className="border-4 border-black bg-white p-4">
                  <p className="text-sm mb-2 font-bold">{location.name}</p>
                  {location.address && (
                    <p className="whitespace-pre-line text-xs">{location.address}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm">Noch keine Standorte verfügbar</p>
            )}
          </div>
        </div>

        {/* Hours block - magenta */}
        <div className="col-span-6 md:col-span-4 box box-magenta px-2 py-6 md:p-6 min-h-[250px]">
          <div className="text-xs mb-3 opacity-70">02</div>
          <h2 className="text-3xl font-display  mb-6">Workshop Stunden</h2>
          <p className="text-xs mb-6">Wir sind (meistens) an diesen Tagen für Workshops verfügbar.</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm uppercase font-bold">
              <span>So - Di</span>
              <span>ganztags</span>
            </div>
            <div className="flex justify-between text-sm uppercase font-bold">
              <span>Mi - Sa</span>
              <span>vormittags</span>
            </div>
          </div>
        </div>

        {/* FAQ block - teal */}
        <div className="col-span-6 md:col-span-4 box box-teal px-2 py-6 md:p-6 min-h-[250px]">
          <div className="text-xs mb-3 opacity-70">03</div>
          <h2 className="text-3xl font-display mb-6">FAQ</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold mb-2">Wie viel Vorerfahrung braucht es?</p>
              <p className="text-xs">Keine. Wir holen die Gruppe da ab, wo sie steht.</p>
            </div>
            <div>
              <p className="text-xs font-bold mb-2">Dürfen Lernende eigene Motive mitbringen?</p>
              <p className="text-xs">Gerne. Wir prüfen vor Ort was technisch sinnvoll umsetzbar ist.</p>
            </div>
          </div>
        </div>

        {/* CTA block - lime */}
        <div className="col-span-12 md:col-span-4 box box-lime p-1 md:p-6 min-h-[250px] flex flex-wrap items-center justify-center">
          <p className="text-xl md:text-3xl font-bold uppercase text-center leading-tight w-full">
            Kollektiv bleedproof
            <br />
            <Link href="mailto:workshop@bleedproof.ch">workshop@bleedproof.ch</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
