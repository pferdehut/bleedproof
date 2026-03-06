import type { Metadata } from "next";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "AGB",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <div className="px-5 md:px-8 py-12 md:py-16 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              AGB
            </h1>
          </div>
        </div>

        <div className="px-5 md:px-8 py-12 md:py-16">
          <div className="max-w-2xl mx-auto space-y-8">
            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                1. Geltungsbereich
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Workshop-Buchungen und
                Dienstleistungen von bleedproof.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                2. Buchung und Bestätigung
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Eine Buchungsanfrage über das Online-Formular stellt noch keine verbindliche Buchung dar.
                Die Buchung gilt als bestätigt, sobald du eine schriftliche Bestätigung per E-Mail erhalten hast.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                3. Preise und Zahlung
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Alle Preise sind in Schweizer Franken (CHF) angegeben. Die Zahlung erfolgt gemäss den in
                der Buchungsbestätigung angegebenen Konditionen.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                4. Stornierung
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Stornierungen bis 7 Tage vor dem Workshop-Datum sind kostenlos möglich. Bei späteren
                Stornierungen wird die volle Kursgebühr in Rechnung gestellt. Ausnahmen können in
                begründeten Fällen gemacht werden.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                5. Haftung
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                bleedproof haftet nicht für Schäden, die durch unsachgemässe Verwendung der
                Werkzeuge oder Materialien entstehen. Alle Teilnehmenden nutzen die Einrichtungen
                auf eigene Verantwortung.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                6. Datenschutz
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Deine persönlichen Daten werden ausschliesslich zur Bearbeitung deiner Buchungsanfrage
                verwendet und nicht an Dritte weitergegeben.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
