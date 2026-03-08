import Link from "next/link"
import { InteractiveLogoGame } from "@/components/interactive-logo-game"

export default function CookiesPage() {
  return (
    <div className="min-h-dvh bg-white p-0">
      <div className="grid-collage grid-cols-12">
        <div className="col-span-6 md:col-span-3 box box-white min-h-[250px] md:min-h-[350px] flex items-center justify-center overflow-hidden">
          <InteractiveLogoGame />
        </div>

        <div className="col-span-6 md:col-span-9 box box-magenta p-6 md:p-12 min-h-[250px] md:min-h-[350px] flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-display font-black leading-none">
            Cookie
            <br />
            Richtlinie
          </h1>
        </div>

        <div className="col-span-12 box box-lime p-6 md:p-12 min-h-[200px]">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-display font-black mb-6">
              Verwendung von Cookies
            </h2>
            
            <div className="space-y-6 text-sm font-bold leading-relaxed">
              <section>
                <h3 className="text-xl font-black uppercase mb-3">Was sind Cookies?</h3>
                <p>
                  Cookies sind kleine Textdateien, die von Websites auf Ihrem Computer oder Mobilgerät 
                  gespeichert werden. Sie werden weitverbreitet eingesetzt, um Websites funktionsfähig 
                  zu machen oder ihre Effizienz zu verbessern, sowie um Informationen an die Eigentümer 
                  der Website zu übermitteln.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black uppercase mb-3">Welche Cookies verwenden wir?</h3>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-black mb-2">Notwendige Cookies</h4>
                    <p>
                      Diese Cookies sind für den Betrieb der Website unerlässlich und können in unseren 
                      Systemen nicht deaktiviert werden. Sie werden in der Regel nur als Reaktion auf 
                      von Ihnen vorgenommene Aktionen gesetzt, wie z.B. das Festlegen Ihrer Cookie-Präferenzen.
                    </p>
                    <ul className="mt-2 ml-4 list-disc">
                      <li>cookie-consent: Speichert Ihre Cookie-Einwilligung</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black mb-2">Analytics Cookies</h4>
                    <p>
                      Diese Cookies ermöglichen es uns, Besuche und Traffic-Quellen zu zählen, damit wir 
                      die Leistung unserer Website messen und verbessern können. Alle von diesen Cookies 
                      erfassten Informationen werden aggregiert und sind daher anonym.
                    </p>
                    <ul className="mt-2 ml-4 list-disc">
                      <li>Vercel Analytics: Anonymisierte Nutzungsstatistiken (keine personenbezogenen Daten)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-black uppercase mb-3">Cookie-Verwaltung</h3>
                <p>
                  Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie die Cookies in Ihrem 
                  Browser löschen. Beachten Sie jedoch, dass das Deaktivieren von Cookies die Funktionalität 
                  dieser und vieler anderer Websites, die Sie besuchen, beeinträchtigen kann.
                </p>
                <p className="mt-3">
                  Die meisten Webbrowser ermöglichen eine gewisse Kontrolle über die meisten Cookies über 
                  die Browsereinstellungen. Um mehr über Cookies zu erfahren, einschließlich der Anzeige 
                  von Cookies, die gesetzt wurden, und deren Verwaltung und Löschung, besuchen Sie 
                  www.allaboutcookies.org.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black uppercase mb-3">Cookie-Lebensdauer</h3>
                <p>
                  Session-Cookies: Werden gelöscht, wenn Sie Ihren Browser schließen<br />
                  Persistente Cookies: Bleiben auf Ihrem Gerät für einen festgelegten Zeitraum oder 
                  bis Sie sie löschen
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black uppercase mb-3">Aktualisierungen dieser Richtlinie</h3>
                <p>
                  Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um Änderungen in 
                  unseren Praktiken oder aus anderen betrieblichen, rechtlichen oder regulatorischen 
                  Gründen widerzuspiegeln.
                </p>
              </section>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 box box-coral p-6 md:p-12 min-h-[150px]">
          <p className="text-sm font-bold">
            Stand: {new Date().toLocaleDateString("de-CH")}
          </p>
        </div>

        <Link
          href="/"
          className="col-span-12 md:col-span-6 box box-teal p-6 min-h-[150px] flex items-center justify-center hover:scale-[1.02] transition-transform"
        >
          <span className="text-2xl md:text-3xl font-black">← Zurück zur Startseite</span>
        </Link>
      </div>
    </div>
  )
}
