import Link from "next/link"
import { InteractiveLogoGame } from "@/components/interactive-logo-game"

export default function TermsPage() {
  return (
    <div className="min-h-dvh bg-white p-0">
      <div className="grid-collage grid-cols-12">
        <div className="col-span-6 md:col-span-3 box box-white min-h-[250px] md:min-h-[350px] flex items-center justify-center overflow-hidden">
          <InteractiveLogoGame />
        </div>

        <div className="col-span-6 md:col-span-9 box box-teal p-6 md:p-12 min-h-[250px] md:min-h-[350px] flex flex-col justify-center">
          <h1 className="text-6xl md:text-8xl font-display font-black leading-none">
            AGB
          </h1>
        </div>

        <div className="col-span-12 box box-peach p-6 md:p-12 min-h-[200px]">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-display font-black mb-6">
              Allgemeine Geschäftsbedingungen
            </h2>
            
            <div className="space-y-6 text-sm font-bold leading-relaxed">
              <section>
                <h3 className="text-xl font-black uppercase mb-3">1. Geltungsbereich</h3>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über die 
                  Teilnahme an Workshops, die zwischen bleedproof und den Teilnehmern geschlossen werden.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black uppercase mb-3">2. Buchung und Anmeldung</h3>
                <p>
                  Die Buchung eines Workshops erfolgt über unser Kontaktformular oder per E-Mail. 
                  Die Anmeldung wird verbindlich mit der Bestätigung durch bleedproof. Die Teilnahme 
                  ist erst nach Zahlungseingang gesichert.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black uppercase mb-3">3. Preise und Zahlung</h3>
                <p>
                  Alle Preise verstehen sich in Schweizer Franken (CHF) und sind inklusive Mehrwertsteuer. 
                  Die Zahlung ist vor Beginn des Workshops fällig. Wir akzeptieren Banküberweisung und TWINT.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black uppercase mb-3">4. Stornierung und Rücktritt</h3>
                <p>
                  <strong>Durch den Teilnehmer:</strong><br />
                  - Bis 14 Tage vor Workshopbeginn: kostenlose Stornierung<br />
                  - 7-13 Tage vor Workshopbeginn: 50% der Teilnahmegebühr<br />
                  - Weniger als 7 Tage vor Workshopbeginn: 100% der Teilnahmegebühr
                </p>
                <p className="mt-3">
                  <strong>Durch bleedproof:</strong><br />
                  Wir behalten uns vor, Workshops bei zu geringer Teilnehmerzahl oder aus wichtigen Gründen 
                  abzusagen. In diesem Fall erhalten Sie die volle Teilnahmegebühr zurückerstattet.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black uppercase mb-3">5. Haftung</h3>
                <p>
                  Die Teilnahme an den Workshops erfolgt auf eigene Gefahr. bleedproof haftet nicht für 
                  Personen-, Sach- oder Vermögensschäden, die durch leichte Fahrlässigkeit entstehen. 
                  Für Schäden an mitgebrachten Gegenständen wird keine Haftung übernommen.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black uppercase mb-3">6. Materialien</h3>
                <p>
                  Alle notwendigen Materialien werden gestellt und sind im Workshoppreis inbegriffen. 
                  Eigene Werkstücke können nach Absprache mitgebracht werden.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black uppercase mb-3">7. Urheberrecht</h3>
                <p>
                  Während des Workshops erstellte Werke bleiben im Eigentum der Teilnehmer*innen. 
                  bleedproof behält sich vor, Fotos von Workshop-Arbeiten für Werbezwecke zu verwenden, 
                  sofern dem nicht widersprochen wird.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black uppercase mb-3">8. Anwendbares Recht</h3>
                <p>
                  Es gilt ausschliesslich Schweizer Recht. Gerichtsstand ist Zürich.
                </p>
              </section>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 box box-blue p-6 md:p-12 min-h-[150px]">
          <p className="text-sm font-bold">
            Stand: {new Date().toLocaleDateString("de-CH")}
          </p>
        </div>

        <Link
          href="/"
          className="col-span-12 md:col-span-6 box box-lime p-6 min-h-[150px] flex items-center justify-center hover:scale-[1.02] transition-transform"
        >
          <span className="text-2xl md:text-3xl font-black">← Zurück zur Startseite</span>
        </Link>
      </div>
    </div>
  )
}
