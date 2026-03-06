import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { getTeamMembers } from "@/lib/notion/team";
import { ExternalLink, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Team",
  description: "Lerne das Team hinter bleedproof kennen.",
};

export const revalidate = 60;

export default async function TeamPage() {
  let members: Awaited<ReturnType<typeof getTeamMembers>> = [];
  try {
    members = await getTeamMembers();
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
              Menschen
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Team
            </h1>
          </div>
        </div>

        <section className="px-5 md:px-8 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            {members.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-muted-foreground font-mono text-sm">
                  Keine Teammitglieder gefunden.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {members.map((member) => (
                  <article key={member.id} className="group">
                    {/* Photo */}
                    {member.image ? (
                      <div className="relative aspect-square mb-6 overflow-hidden bg-muted">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square mb-6 bg-muted flex items-center justify-center">
                        <span className="font-mono text-4xl font-bold text-muted-foreground">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Info */}
                    <div>
                      <h2 className="text-2xl font-bold mb-0.5">
                        {member.name}
                      </h2>
                      {member.role && (
                        <p className="font-mono text-sm text-muted-foreground mb-3">
                          {member.role}
                        </p>
                      )}
                      {member.bio && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {member.bio}
                        </p>
                      )}
                      <div className="flex items-center gap-4">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Mail size={12} />
                            {member.email}
                          </a>
                        )}
                        {member.website && (
                          <a
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink size={12} />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
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
