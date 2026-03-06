import Link from "next/link";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CookieConsent from "@/components/cookie-consent";
import { getWorkshops } from "@/lib/notion/workshops";
import { ArrowRight } from "lucide-react";
import { truncate } from "@/lib/utils";

const techniques = [
  {
    name: "Siebdruck",
    en: "Screen Printing",
    description:
      "Farbe durch ein Sieb auf Papier, Stoff oder andere Materialien drücken. Schicht für Schicht, Farbe für Farbe.",
  },
  {
    name: "Risographie",
    en: "Risography",
    description:
      "Der Drucker, der Fehler feiert. Überlappende Lagen in leuchtenden Riso-Farben — kein Bild gleicht dem anderen.",
  },
  {
    name: "Linolschnitt",
    en: "Linocut",
    description:
      "Schneiden, walzen, drücken. Die Schnittstelle zwischen Handwerk und Ausdruck — uralt und immer noch relevant.",
  },
  {
    name: "3D-Druck",
    en: "3D Printing",
    description:
      "Vom digitalen Modell zum greifbaren Objekt. Prototyping, Kunst, Alltagsgegenstände — was auch immer du brauchst.",
  },
];

export default async function HomePage() {
  let workshops: Awaited<ReturnType<typeof getWorkshops>> = [];
  try {
    workshops = await getWorkshops();
  } catch {
    // Notion not configured — show static content
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-end pb-16 px-5 md:px-8 pt-32">
          <div className="max-w-5xl mx-auto w-full">
            <p className="font-mono text-sm text-muted-foreground mb-6 tracking-widest uppercase">
              Zürich — Workshops
            </p>
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.95] tracking-tight text-balance mb-10">
              Drucken.
              <br />
              <span className="text-accent">Machen.</span>
              <br />
              Lernen.
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                href="/workshops"
                className="inline-flex items-center gap-2 h-12 px-6 bg-foreground text-background text-sm font-bold tracking-wide hover:bg-accent transition-colors"
              >
                Alle Workshops <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center h-12 px-6 border border-border text-foreground text-sm font-medium hover:border-foreground transition-colors"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </section>

        {/* Marquee divider */}
        <div className="border-t border-b border-border py-3 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap font-mono text-sm text-muted-foreground flex gap-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mr-12">
                Siebdruck &mdash; Risographie &mdash; Linolschnitt &mdash; 3D-Druck &mdash;
              </span>
            ))}
          </div>
        </div>

        {/* Techniques */}
        <section className="px-5 md:px-8 py-20 md:py-28" aria-labelledby="techniques-heading">
          <div className="max-w-5xl mx-auto">
            <h2
              id="techniques-heading"
              className="font-mono text-sm text-muted-foreground mb-12 tracking-widest uppercase"
            >
              Techniken
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {techniques.map((t, i) => (
                <div
                  key={t.name}
                  className="border-t border-border py-8 md:py-10 md:pr-12 group"
                  style={{
                    borderRight:
                      i % 2 === 0 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl md:text-3xl font-bold">{t.name}</h3>
                    <span className="font-mono text-xs text-muted-foreground mt-1">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured workshops */}
        {workshops.length > 0 && (
          <section className="px-5 md:px-8 pb-20 md:pb-28" aria-labelledby="workshops-heading">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-end justify-between mb-10">
                <h2
                  id="workshops-heading"
                  className="text-3xl md:text-4xl font-bold"
                >
                  Aktuelle Workshops
                </h2>
                <Link
                  href="/workshops"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:flex items-center gap-1"
                >
                  Alle <ArrowRight size={14} />
                </Link>
              </div>

              <div className="space-y-0">
                {workshops.slice(0, 5).map((w, i) => (
                  <Link
                    key={w.id}
                    href={`/workshops/${w.slug}`}
                    className="flex items-center justify-between py-5 border-t border-border hover:bg-muted -mx-4 px-4 transition-colors group"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-muted-foreground w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-bold text-lg group-hover:text-accent transition-colors">
                          {w.name}
                        </p>
                        {w.audienceLevel.length > 0 && (
                          <p className="text-xs text-muted-foreground font-mono mt-0.5">
                            {w.audienceLevel.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      {w.price && (
                        <span className="text-sm font-mono hidden sm:block">
                          {w.price}
                        </span>
                      )}
                      <ArrowRight
                        size={16}
                        className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </Link>
                ))}
                <div className="border-t border-border" />
              </div>

              <Link
                href="/workshops"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors sm:hidden"
              >
                Alle Workshops <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-5 md:px-8 pb-20 md:pb-28">
          <div className="max-w-5xl mx-auto">
            <div className="bg-foreground text-background p-8 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <p className="font-mono text-xs text-background/50 mb-4 tracking-widest uppercase">
                  Workshop buchen
                </p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight text-balance max-w-md">
                  Bereit, etwas zu machen?
                </h2>
              </div>
              <Link
                href="/workshops"
                className="inline-flex items-center gap-2 h-12 px-6 bg-accent text-background text-sm font-bold tracking-wide hover:opacity-90 transition-opacity shrink-0"
              >
                Workshops entdecken <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />

      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
}
