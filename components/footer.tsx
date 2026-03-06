import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="grid-collage grid-cols-12 mt-0">
      <div className="col-span-12 md:col-span-6 md:pr-18 md:-mr-18 box box-black px-2 py-6 md:p-6 min-h-[200px] flex flex-col justify-between mask-alpha md:mask-r-from-black md:mask-r-from-90% md:mask-r-to-transparent">
        <div>
          <h3 className="text-2xl md:text-3xl font-display text-white mb-4">Bleedproof</h3>
          <p className="text-sm text-white/80">
            Druckworkshops in Zürich
          </p>
        </div>
        <p className="text-xs text-white/60 mt-4">
          © {currentYear} bleedproof. Alle Rechte vorbehalten.
        </p>
      </div>

      <div className="col-span-12 md:col-span-6 md:-ml-18 flex flex-wrap flex-col justify-end content-start md:content-end md:justify-center md:text-right box px-2 py-6  md:p-6 min-h-[200px] bg-linear-to-t md:bg-linear-to-l from-mint-green from-80% to-black to-95%">
        <h4 className="text-sm uppercase mb-4 font-display">Rechtliches</h4>
        <ul className="space-y-2">
          <li>
            <Link href="/imprint" className="text-sm hover:underline">
              Impressum
            </Link>
          </li>
          <li>
            <Link href="/terms" className="text-sm hover:underline">
              AGB
            </Link>
          </li>
          <li>
            <Link href="/cookies" className="text-sm hover:underline">
              Cookie-Richtlinie
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
