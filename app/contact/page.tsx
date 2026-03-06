import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { getLocations } from "@/lib/notion/locations";
import { MapPin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Nimm Kontakt mit bleedproof auf.",
};

export const revalidate = 60;

export default async function ContactPage() {
  let locations: Awaited<ReturnType<typeof getLocations>> = [];
  try {
    locations = await getLocations();
  } catch {
    // Notion not configured
  }

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Header */}
        <div className="px-5 md:px-8 py-12 md:py-16 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-sm text-muted-foreground mb-3 tracking-widest uppercase">
              Schreib uns
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Kontakt
            </h1>
          </div>
        </div>

        <div className="px-5 md:px-8 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left: form */}
              <div>
                <h2 className="font-mono text-xs text-muted-foreground mb-6 tracking-widest uppercase">
                  Nachricht senden
                </h2>
                <ContactForm />
              </div>

              {/* Right: info */}
              <div className="space-y-10">
                <div>
                  <h2 className="font-mono text-xs text-muted-foreground mb-4 tracking-widest uppercase">
                    E-Mail
                  </h2>
                  <a
                    href="mailto:hallo@bleedproof.ch"
                    className="text-xl font-bold hover:text-accent transition-colors"
                  >
                    hallo@bleedproof.ch
                  </a>
                </div>

                {locations.length > 0 && (
                  <div>
                    <h2 className="font-mono text-xs text-muted-foreground mb-4 tracking-widest uppercase">
                      Standorte
                    </h2>
                    <div className="space-y-5">
                      {locations.map((loc) => (
                        <div key={loc.id}>
                          <p className="font-bold mb-1">{loc.name}</p>
                          {loc.address && (
                            <p className="text-sm text-muted-foreground flex items-start gap-1.5">
                              <MapPin size={12} className="mt-0.5 shrink-0" />
                              {loc.address}
                            </p>
                          )}
                          {loc.website && (
                            <a
                              href={loc.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mt-1 flex items-center gap-1"
                            >
                              <ExternalLink size={10} />
                              Website
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="font-mono text-xs text-muted-foreground mb-4 tracking-widest uppercase">
                    Workshop buchen?
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Für Workshop-Anfragen nutze bitte das Formular direkt auf der jeweiligen Workshop-Seite.
                  </p>
                  <Link
                    href="/workshops"
                    className="text-sm font-bold hover:text-accent transition-colors underline underline-offset-4"
                  >
                    Alle Workshops anzeigen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
