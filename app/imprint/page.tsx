import type { Metadata } from "next";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImprintPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <div className="px-5 md:px-8 py-12 md:py-16 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Impressum
            </h1>
          </div>
        </div>

        <div className="px-5 md:px-8 py-12 md:py-16">
          <div className="max-w-2xl mx-auto prose-custom space-y-8">
            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                Verantwortlich
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                bleedproof<br />
                [Name / Rechtsform]<br />
                [Adresse]<br />
                [PLZ Ort]<br />
                Schweiz
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                Kontakt
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                E-Mail:{" "}
                <a
                  href="mailto:hallo@bleedproof.ch"
                  className="text-foreground hover:text-accent transition-colors underline underline-offset-4"
                >
                  hallo@bleedproof.ch
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                Haftungsausschluss
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen
                Gesetzen verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
                Urheberrecht
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
                Art der Verwertung ausserhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
