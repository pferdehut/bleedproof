import { getTeamMembers } from "@/lib/notion/team"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogoSvg } from "@/components/logo-svg"
import Image from "next/image"

export const revalidate = 60

export default async function TeamPage() {
  let teamMembers = null
  let error = null

  try {
    teamMembers = await getTeamMembers()
  } catch (e: any) {
    error = { message: e.message || 'Failed to fetch team members' }
  }

  if (error) {
    return (
      <div className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Alert variant="destructive">
            <AlertTitle>Datenbankfehler</AlertTitle>
            <AlertDescription className="mt-2">
              <p className="mb-4">
                {error.message.includes("relation") || error.message.includes("does not exist")
                  ? "Die Datenbanktabellen wurden noch nicht eingerichtet. Bitte führen Sie die SQL-Skripte aus, um die Datenbank zu initialisieren."
                  : `Fehler beim Laden der Teammitglieder: ${error.message}`}
              </p>
              <Button asChild variant="outline">
                <Link href="/setup">Zu den Setup-Anweisungen</Link>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-0">
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-6 md:col-span-3 box box-coral h-full min-h-[250px] md:min-h-[350px] flex items-center justify-center overflow-hidden">
          <LogoSvg />
        </div>

        {/* Hero block - coral */}
        <div className="col-span-6 md:col-span-4 px-2 py-6 md:p-6 box box-coral min-h-[250px] md:min-h-[350px] flex flex-col justify-between">
          <div className="text-xs mb-3">team</div>
          <h1 className="text-4xl md:text-7xl font-display leading-none">
            bleed
            <br />
            proof
            <br />
            Team
          </h1>
        </div>

        <div className="col-span-6 md:col-span-5 absolute flex justify-end md:justify-center top-[175px] md:top-[325px] right-6 box min-h-[250px] md:min-h-[300px] p-0 bg-transparent z-40">
          <Image src="/illus/color.png" alt="smiley t-shirt" className="w-1/2 md:w-2/3 object-center pt-16 md:-mb-16 object-contain opacity-80" />
        </div>


        {/* Description block - lime */}
        <div className="col-span-12 md:col-span-5 px-2 py-6 md:px-18 md:-ml-12 box box-lime min-h-[400px] flex items-center justify-center bg-linear-to-t md:bg-linear-to-l from-lime from-90% to-coral to-100%">
          <p className="text-xl md:text-2xl leading-tight">
            Wir sind ein Team aus kreativen FLINTAQ-Personen mit unterschiedlichen gestalterischen Hintergründen. Uns
            verbindet die Freude am Experimentieren und Wissen weiterzugeben.
          </p>
        </div>

        {/* Team members - different colors for each */}
        {teamMembers && teamMembers.length > 0 ? (
          teamMembers.map((member, index) => {
            const colors = ["box-yellow", "box-mint", "box-blue", "box-pink", "box-orange", "box-teal"]
            const colorClass = colors[index % colors.length]
            return (
              <div
                key={member.id}
                className={`col-span-6 md:col-span-4 box ${colorClass} min-h-[250px] md:min-h-[350px] hover:scale-[1.02] transition-transform flex flex-col`}
              >
                {/* Member image */}
                {member.imageUrl && member.imageUrl !== '/placeholder-user.jpg' && (
                  <div className="relative w-full h-48 shrink-0">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between flex-1 px-2 py-6 md:p-6">
                  <div>
                    <div className="text-xs mb-3 opacity-70 uppercase">
                      {String(member.order || index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-3xl md:text-5xl font-display leading-none mb-3">{member.name}</h3>
                    <p className="text-sm font-bold uppercase mb-4">{member.role}</p>
                    {member.bio && <p className="text-sm leading-relaxed mb-4">{member.bio}</p>}
                    <div className="space-y-1 text-xs">
                      {member.email && (
                        <p>
                          <a href={`mailto:${member.email}`} className="underline hover:no-underline">
                            {member.email}
                          </a>
                        </p>
                      )}
                      {member.website && (
                        <p>
                          <a
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:no-underline"
                          >
                            Website →
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-12 box box-white min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-display font-bold uppercase">Keine Teammitglieder gefunden</p>
              <p className="mt-2 text-sm">Schauen Sie bald wieder vorbei!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
