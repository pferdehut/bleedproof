import { getWorkshopById } from "@/lib/notion/workshops"
import { getTeamMembers } from "@/lib/notion/team"
import { notFound } from "next/navigation"
import { BookingForm } from "@/components/booking-form"
import { WorkshopSlideshow } from "@/components/workshop-slideshow"

export const revalidate = 60

interface WorkshopDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function WorkshopDetailPage({ params }: WorkshopDetailPageProps) {
  const { id } = await params

  const workshop = await getWorkshopById(id)

  if (!workshop) {
    notFound()
  }

  const teamMembers = await getTeamMembers()

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-12 gap-0">
        {/* Workshop title block - hot pink */}
        <div className="col-span-12 md:col-span-7 box box-pink px-2 py-6 md:p-6 min-h-[300px] md:min-h-[400px] flex flex-col justify-between">
          <div>
            <div className="text-xs mb-3 lowercase">
              für {workshop.audienceLevel?.join(', ')}
            </div>
            <h1 className="text-5xl md:text-7xl font-display leading-none uppercase">{workshop.name}</h1>
          </div>
          <p className="text-lg md:text-xl leading-tight max-w-2xl mt-8">{workshop.description}</p>
        </div>

        {/* Details grid - multiple colors */}
        <div className="col-span-4 md:col-span-2 box box-yellow px-2 py-6 md:p-6 min-h-[200px] md:min-h-[400px] flex flex-col justify-center">
          <div className="text-xs font-bold mb-2 lowercase opacity-70">Dauer</div>
          <p className="text-xl md:text-2xl font-bold leading-tight">
            {workshop.duration}
            <br />
            Stunden
          </p>
        </div>

        <div className="col-span-4 md:col-span-1 box box-mint px-2 py-6 md:p-6 min-h-[200px] md:min-h-[400px] flex flex-col justify-center">
          <div className="text-xs font-bold mb-2 lowercase opacity-70">bis</div>
          <p className="text-xl md:text-2xl font-bold leading-tight">
            {workshop.maxParticipants}
            <br />
            Pers.
          </p>
        </div>

        <div className="col-span-4 md:col-span-2 box box-orange px-2 py-6 md:p-6 min-h-[200px] md:min-h-[400px] flex flex-col justify-center">
          <div className="text-xs font-bold mb-2 lowercase opacity-70">ab CHF</div>
          <p className="text-3xl md:text-4xl font-bold">{workshop.price}</p>
        </div>

        {/* Workshop image slideshow */}
        <WorkshopSlideshow images={workshop.imageUrls} name={workshop.name} />

        {/* For teachers block - teal */}
        <div className="col-span-12 md:col-span-5 box box-teal px-2 py-6 md:p-6 min-h-[350px]">
          <div className="text-xs mb-3 opacity-70">für lehrpersonen</div>
          <h2 className="text-3xl md:text-4xl font-display mb-6">Infos</h2>
          <p className="text-sm mb-6 leading-relaxed">
            Schreibe uns mit gewünschtem Format, Gruppengrössen, Datum und allfälligen Vorkentnissen. Wir melden uns mit
            einem Vorschlag
          </p>
          <ul className="space-y-2 text-xs">
            <li>→ Wir bieten klare Vorabinfos (Ablauf, Ziele, Vorbereitung).</li>
            <li>→ Lehrplanbezüge auf Wunsch (Gestalten, Prozesskompetenzen, Teamarbeit).</li>
            <li>→ Begleitunterlagen: kurze Checkliste und Materialliste auf Anfrage.</li>
          </ul>
        </div>

        {/* Team members block - purple */}
        {teamMembers && teamMembers.length > 0 && (
          <div className="col-span-12 md:col-span-7 box box-purple px-2 py-6 md:p-6 min-h-[350px]">
            <div className="text-xs mb-3 opacity-70">die zwei kursleiter*innen</div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {teamMembers
                ?.filter((member) => workshop.teamMembers?.includes(member.id) || !workshop.teamMembers?.length)
                .slice(0, 2)
                .map((member) => (
                  <div key={member.id} className="border-4 border-white bg-black text-white p-4 space-y-1">
                    <p className="text-lg font-bold uppercase mb-1">{member.name}</p>
                    <p className="text-xs">{member.role}</p>
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="block text-xs underline hover:no-underline">
                        {member.email}
                      </a>
                    )}
                    {member.website && (
                      <a href={member.website} target="_blank" rel="noopener noreferrer" className="block text-xs underline hover:no-underline">
                        Website →
                      </a>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Booking form block - sky */}
        <div className="col-span-12 box box-sky px-2 py-6 md:p-6 min-h-[500px]">
          <div className="text-xs mb-3 opacity-70">anfragen</div>
          <h2 className="text-4xl md:text-5xl font-display mb-6">Workshop für <br />deine Gruppe planen</h2>
          <div className="max-w-2xl">
            <BookingForm workshopName={workshop.name} workshopPrice={workshop.price} />
          </div>
        </div>
      </div>
    </div>
  )
}
