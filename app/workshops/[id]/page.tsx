import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BookingForm from "@/components/booking-form";
import WorkshopSlideshow from "@/components/workshop-slideshow";
import { getWorkshop, getWorkshops } from "@/lib/notion/workshops";
import { getTeamMembersByIds } from "@/lib/notion/team";
import { ChevronLeft, Clock, Users } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const workshops = await getWorkshops();
    return workshops.map((w) => ({ id: w.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const workshop = await getWorkshop(id);
    if (!workshop) return {};
    return {
      title: workshop.name,
      description: workshop.description,
    };
  } catch {
    return {};
  }
}

export const revalidate = 60;

export default async function WorkshopDetailPage({ params }: Props) {
  const { id } = await params;

  let workshop: Awaited<ReturnType<typeof getWorkshop>> = null;
  let teamMembers: Awaited<ReturnType<typeof getTeamMembersByIds>> = [];

  try {
    workshop = await getWorkshop(id);
    if (!workshop) notFound();
    teamMembers = await getTeamMembersByIds(workshop.teamMemberIds);
  } catch {
    notFound();
  }

  if (!workshop) notFound();

  return (
    <>
      <Navigation />
      <main className="pt-14">
        {/* Back */}
        <div className="px-5 md:px-8 py-5 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/workshops"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
            >
              <ChevronLeft size={14} />
              Alle Workshops
            </Link>
          </div>
        </div>

        <div className="px-5 md:px-8 py-10 md:py-14">
          <div className="max-w-5xl mx-auto">
            {/* Audience tags */}
            {workshop.audienceLevel.length > 0 && (
              <div className="flex gap-2 mb-5">
                {workshop.audienceLevel.map((level) => (
                  <span
                    key={level}
                    className="bg-muted text-muted-foreground text-xs font-mono px-2.5 py-1"
                  >
                    {level}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-balance">
              {workshop.name}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm font-mono text-muted-foreground mb-10 pb-10 border-b border-border">
              {workshop.duration && (
                <span className="flex items-center gap-2">
                  <Clock size={14} />
                  {workshop.duration}
                </span>
              )}
              {workshop.maxParticipants && (
                <span className="flex items-center gap-2">
                  <Users size={14} />
                  max. {workshop.maxParticipants} Personen
                </span>
              )}
              {workshop.price && (
                <span className="text-foreground font-bold text-base ml-auto">
                  {workshop.price}
                </span>
              )}
            </div>

            {/* Two-col layout: content + form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left: slideshow + description + team */}
              <div>
                {workshop.images.length > 0 && (
                  <WorkshopSlideshow
                    images={workshop.images}
                    alt={workshop.name}
                    className="mb-8"
                  />
                )}

                {workshop.description && (
                  <div className="mb-10">
                    <h2 className="font-mono text-xs text-muted-foreground mb-4 tracking-widest uppercase">
                      Beschreibung
                    </h2>
                    <p className="text-base leading-relaxed text-foreground">
                      {workshop.description}
                    </p>
                  </div>
                )}

                {/* Team */}
                {teamMembers.length > 0 && (
                  <div>
                    <h2 className="font-mono text-xs text-muted-foreground mb-4 tracking-widest uppercase">
                      Kursleitung
                    </h2>
                    <div className="space-y-4">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-4">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={48}
                              height={48}
                              className="rounded-full object-cover w-12 h-12 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                              <span className="text-xs font-mono text-muted-foreground">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-sm">{member.name}</p>
                            {member.role && (
                              <p className="text-xs text-muted-foreground">
                                {member.role}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: booking form */}
              <div>
                <div className="sticky top-20">
                  <h2 className="font-mono text-xs text-muted-foreground mb-5 tracking-widest uppercase">
                    Workshop anfragen
                  </h2>
                  <BookingForm
                    workshopId={workshop.id}
                    workshopName={workshop.name}
                  />
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
