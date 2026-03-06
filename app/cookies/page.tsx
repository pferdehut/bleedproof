import type { Metadata } from "next";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie",
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <div className="px-5 md:px-8 py-12 md:py-16 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Cookie-Richtlinie
            </h1>
          </div>
        </div>

        <div className="px-5 md:px-8 py-12 md:py-16">
          <div className="max-w-2xl mx-auto space-y-8">
            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                Was sind Cookies?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Cookies sind kleine Textdateien, die von Webseiten auf deinem Gerät gespeichert werden.
                Sie ermöglichen es, bestimmte Einstellungen oder Informationen zu speichern.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                Welche Cookies verwenden wir?
              </h2>
              <div className="space-y-4">
                <div className="border border-border p-4">
                  <p className="font-bold text-sm mb-1">Vercel Analytics</p>
                  <p className="text-xs font-mono text-muted-foreground mb-2">Analytisch — Drittanbieter</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Wir verwenden Vercel Analytics zur anonymen Analyse des Website-Traffics.
                    Es werden keine personenbezogenen Daten gesammelt.
                  </p>
                </div>
                <div className="border border-border p-4">
                  <p className="font-bold text-sm mb-1">Cookie-Einwilligung</p>
                  <p className="text-xs font-mono text-muted-foreground mb-2">Funktional — Lokal</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Wir speichern deine Cookie-Präferenz lokal in deinem Browser (localStorage),
                    damit du nicht bei jedem Besuch gefragt wirst.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                Einwilligung und Widerruf
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Du kannst deine Einwilligung jederzeit widerrufen, indem du den lokalen Speicher
                deines Browsers leerst oder uns unter{" "}
                <a
                  href="mailto:hallo@bleedproof.ch"
                  className="text-foreground hover:text-accent transition-colors underline underline-offset-4"
                >
                  hallo@bleedproof.ch
                </a>{" "}
                kontaktierst.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
