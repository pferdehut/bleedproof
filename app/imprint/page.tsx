import Link from "next/link"
import { InteractiveLogoGame } from "@/components/interactive-logo-game"

export default function ImprintPage() {
  return (
    <div className="min-h-dvh bg-white p-0">
      <div className="grid-collage grid-cols-12">
        <div className="col-span-6 md:col-span-3 box box-white min-h-[250px] md:min-h-[350px] flex items-center justify-center overflow-hidden">
          <InteractiveLogoGame />
        </div>

        <div className="col-span-6 md:col-span-9 box box-purple p-6 md:p-12 min-h-[250px] md:min-h-[350px] flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl leading-none">
            Impressum
          </h1>
        </div>

        <div className="col-span-12 box box-yellow p-6 md:p-12 min-h-[200px]">
          <div className="max-w-4xl">
            <div className="space-y-6 text-sm leading-relaxed">
              <section>
                <h3 className="text-xl uppercase mb-3">Betreiber*in</h3>
                <p>
                  Kollektiv bleedproof<br />
                  Rosengartenstrasse 23<br />
                  8037 Zürich<br />
                  Schweiz
                </p>
              </section>

              <section>
                <h3 className="text-xl uppercase mb-3">Kontakt</h3>
                <p>
                  E-Mail: workshop@bleedproof.ch<br />
                  Website: www.bleedproof.ch
                </p>
              </section>

              <section>
                <h3 className="text-xl uppercase mb-3">Verantwortlich für den Inhalt</h3>
                <p>
                  Christa Kuratli<br />
                  Kollektiv bleedproof<br />
                  Rosengartenstrasse 23<br />
                  8037 Zürich<br />
                  Schweiz
                </p>
              </section>

              <section>
                <h3 className="text-xl uppercase mb-3">Haftungsausschluss</h3>
                <p>
                  Die Autorin übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität, 
                  Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen 
                  die Autorin wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff 
                  oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen entstanden 
                  sind, werden grundsätzlich ausgeschlossen.
                </p>
              </section>

              <section>
                <h3 className="text-xl uppercase mb-3">Urheberrechte</h3>
                <p>
                  Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen 
                  Dateien auf dieser Website gehören ausschliesslich bleedproof oder den speziell 
                  genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die 
                  schriftliche Zustimmung des Urheberrechtsträgers im Voraus einzuholen.
                </p>
              </section>

              <section>
                <h3 className="text-xl uppercase mb-3">Design & Entwicklung</h3>
                <p>
                  Website erstellt mit pferdehut<br />
                  Hosting: Vercel
                </p>
              </section>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 box box-orange p-6 md:p-12 min-h-[150px]">
          <p className="text-sm font-bold">
            Stand: {new Date().toLocaleDateString("de-CH")}
          </p>
        </div>

        <Link
          href="/"
          className="col-span-12 md:col-span-6 box box-sky p-6 min-h-[150px] flex items-center justify-center hover:scale-[1.02] transition-transform"
        >
          <span className="text-2xl md:text-3xl font-bold">← Zurück zur Startseite</span>
        </Link>
      </div>
    </div>
  )
}
