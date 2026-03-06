import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { getWorkshops } from "@/lib/notion/workshops";
import { ArrowRight, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Entdecke unsere Workshops für Siebdruck, Risographie, Linolschnitt und 3D-Druck in Zürich.",
};

export const revalidate = 60;

export default async function WorkshopsPage() {
  let workshops: Awaited<ReturnType<typeof getWorkshops>> = [];
  try {
    workshops = await getWorkshops();
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
              Angebot
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Workshops
            </h1>
          </div>
        </div>

        {/* Workshop grid */}
        <section className="px-5 md:px-8 py-12 md:py-16" aria-label="Workshop-Liste">
          <div className="max-w-5xl mx-auto">
            {workshops.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-muted-foreground font-mono text-sm">
                  Keine Workshops verfügbar. Notion noch nicht konfiguriert?
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  Füge deine Umgebungsvariablen hinzu um Workshops anzuzeigen.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {workshops.map((workshop) => (
                  <Link
                    key={workshop.id}
                    href={`/workshops/${workshop.slug}`}
                    className="group block"
                    aria-label={`Workshop: ${workshop.name}`}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-5">
                      {workshop.images[0] ? (
                        <Image
                          src={workshop.images[0]}
                          alt={workshop.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-mono text-xs text-muted-foreground">
                            {workshop.name}
                          </span>
                        </div>
                      )}
                      {/* Audience tags */}
                      {workshop.audienceLevel.length > 0 && (
                        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                          {workshop.audienceLevel.map((level) => (
                            <span
                              key={level}
                              className="bg-background/90 text-foreground text-xs font-mono px-2 py-0.5"
                            >
                              {level}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="text-xl font-bold group-hover:text-accent transition-colors">
                          {workshop.name}
                        </h2>
                        <ArrowRight
                          size={16}
                          className="text-muted-foreground mt-1 shrink-0 group-hover:text-accent group-hover:translate-x-1 transition-all"
                        />
                      </div>

                      {workshop.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                          {workshop.description}
                        </p>
                      )}

                      <div className="flex items-center gap-5 text-xs font-mono text-muted-foreground">
                        {workshop.duration && (
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {workshop.duration}
                          </span>
                        )}
                        {workshop.maxParticipants && (
                          <span className="flex items-center gap-1.5">
                            <Users size={12} />
                            max. {workshop.maxParticipants}
                          </span>
                        )}
                        {workshop.price && (
                          <span className="ml-auto text-foreground font-bold">
                            {workshop.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
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
