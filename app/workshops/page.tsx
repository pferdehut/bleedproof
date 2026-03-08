import { getWorkshops } from "@/lib/notion/workshops"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { LogoSvg } from "@/components/logo-svg"
import Image from "next/image"

export const revalidate = 60

export default async function WorkshopsPage() {
  let workshops = null
  let error = null

  try {
    workshops = await getWorkshops()
  } catch (e: any) {
    error = { message: e.message || 'Failed to fetch workshops' }
  }

  if (error) {
    // Check if it's a connection error (521, 502, 503, etc.)
    const isConnectionError =
      error.message.includes("fetch") ||
      error.message.includes("FetchError") ||
      error.message.includes("521") ||
      error.message.includes("502") ||
      error.message.includes("503")

    return (
      <div className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Alert variant="destructive">
            <AlertTitle>{isConnectionError ? "Datenbankverbindung nicht verfügbar" : "Datenbankfehler"}</AlertTitle>
            <AlertDescription className="mt-2 space-y-4">
              {isConnectionError ? (
                <>
                  <p>Die Datenbank ist momentan nicht erreichbar.</p>
                </>
              ) : (
                <p>
                  {error.message.includes("relation") || error.message.includes("does not exist")
                    ? "Die Datenbanktabellen wurden noch nicht eingerichtet."
                    : `Fehler beim Laden der Workshops: ${error.message}`}
                </p>
              )}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-0">
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-6 md:col-span-3 box box-coral h-full min-h-[250px] md:min-h-[350px] flex items-center justify-center overflow-hidden">
          <LogoSvg />
        </div>

        {/* Description block - neon yellow */}
        <div className="col-span-6 md:col-span-4 px-2 py-6 md:p-6 box box-coral min-h-[250px] md:min-h-[350px] flex flex-col items-left justify-between">
          <div className="text-xs mb-3">workshops</div>
          <h1 className="text-5xl md:text-7xl font-display leading-none">
            Unser
            <br />
            Angebot
          </h1>
        </div>

        <div className="col-span-12 md:col-span-6 absolute justify-end flex md:justify-center top-[150px] right-0 md:top-[275px] box min-h-[300px] md:min-h-[300px] p-0 bg-transparent z-40 mix-blend-hard-light">
          <Image src="/illus/illu.png" alt="smiley t-shirt" className="w-2/3 md:w-full object-center object-contain opacity-80" />
        </div>

        {/* Goals block - hot pink */}
        <div className="col-span-12 md:col-span-5 px-2 py-6 md:p-6 md:pl-18 md:-ml-12 box box-yellow min-h-[250px] md:min-h-[350px] flex flex-wrap flex-col items-left md:items-center justify-center bg-linear-to-t md:bg-linear-to-l from-yellow from-90% to-coral to-100%">
          <h2 className="text-3xl md:text-5xl font-display leading-none mb-6">Ziele</h2>
          <ul className="space-y-3 text-sm leading-relaxed">
            <li>→ Technik verstehen (Abläufe, Material, Sicherheit)</li>
            <li>→ eigenständig ein kleines Projekt realisieren</li>
            <li>→ Experimente zulassen und Ergebnisse mitnehmen</li>
          </ul>
        </div>

        {/* Formats block - mint green */}
        <div className="col-span-12 box box-sky px-2 py-6 md:p-6 min-h-[250px]">
          <h2 className="text-3xl md:text-5xl font-display leading-none mb-4">Formate</h2>
          <p className="text-xs leading-relaxed mb-8 md:max-w-1/3 pr-6">
            Unsere Workshops vermitteln solide Grundlagen und lassen bewusst Raum für eigene Ideen. Inhalte, Dauer und Tiefe passen wir an Niveau und Gruppengrösse an; Schulklassen sowie Personen mit Kulturlegi erhalten einen Rabatt.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm mb-2 font-bold uppercase">Schulklassen</p>
              <p className="text-xs leading-relaxed">
                (Sek I/Primar): 1 – 1.5 Tage (6 – 8 Lektionen); Fokus auf Prozess & gemeinsames Produkt
              </p>
            </div>
            <div>
              <p className="text-sm mb-2 font-bold uppercase">Gruppen/Teams</p>
              <p className="text-xs leading-relaxed">4–8 Stunden; von Einführung bis Mini-Edition</p>
            </div>
            <div>
              <p className="text-sm mb-2 font-bold uppercase">Einzelpersonen</p>
              <p className="text-xs leading-relaxed">nach Absprache; projektorientiert</p>
            </div>
          </div>
        </div>

        {/* Workshop cards section - white background */}
        <div className="col-span-12 box box-white min-h-[400px]">
          {workshops && workshops.length > 0 ? (
            <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
              {workshops.map((workshop, index) => {
                const colors = ["box-coral", "box-purple", "box-teal", "box-peach", "box-lime", "box-sky"]
                const colorClass = colors[index % colors.length]
                return (
                  <Link
                    key={workshop.id}
                    href={`/workshops/${workshop.id}`}
                    className={`box ${colorClass} min-h-[300px] hover:scale-[1.02] transition-transform px-2 py-6 md:p-6`}
                  >
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <div className="text-xs mb-2 opacity-70 lowercase">
                          {String(index + 1).padStart(2, "0")}
                          {workshop.audienceLevel?.length > 0 && ` • für ${workshop.audienceLevel.join(', ')}`}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-display leading-none mb-4">
                          {workshop.name}
                        </h3>
                        <p className="text-sm leading-relaxed line-clamp-3">{workshop.description}</p>
                      </div>
                      <div className="mt-6 space-y-2">
                        <p className="text-xs uppercase">
                          {workshop.duration} Stunden • Max. {workshop.maxParticipants} Pers.
                        </p>
                        <p className="text-lg font-bold">CHF {workshop.price}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-display uppercase">Momentan keine Workshops verfügbar</p>
                <p className="mt-2 text-sm">Komme bald wieder zurück!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
