import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { getImpressions } from "@/lib/notion/impressions";

export const metadata: Metadata = {
  title: "Impressionen",
  description:
    "Fotos aus unseren Workshops — Siebdruck, Risographie, Linolschnitt und 3D-Druck in Zürich.",
};

export const revalidate = 60;

export default async function ImpressionsPage() {
  let impressions: Awaited<ReturnType<typeof getImpressions>> = [];
  try {
    impressions = await getImpressions();
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
              Galerie
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Impressionen
            </h1>
          </div>
        </div>

        <section
          className="px-5 md:px-8 py-12 md:py-16"
          aria-label="Bildergalerie"
        >
          <div className="max-w-5xl mx-auto">
            {impressions.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-muted-foreground font-mono text-sm">
                  Keine Impressionen gefunden.
                </p>
              </div>
            ) : (
              <div className="columns-2 md:columns-3 gap-4 space-y-4">
                {impressions.map((impression) => (
                  <div
                    key={impression.id}
                    className="relative overflow-hidden bg-muted break-inside-avoid"
                  >
                    {impression.image ? (
                      <Image
                        src={impression.image}
                        alt={impression.title || "Impression"}
                        width={600}
                        height={600}
                        className="w-full h-auto object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="aspect-square flex items-center justify-center bg-muted">
                        <span className="text-muted-foreground font-mono text-xs">
                          {impression.title}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
