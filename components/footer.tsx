import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-24 bg-background">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          {/* Brand */}
          <div>
            <span className="font-mono font-bold text-xl tracking-tight text-foreground block mb-1">
              bleedproof
            </span>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Workshops für Siebdruck, Risographie, Linolschnitt und 3D-Druck in Zürich.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <Link href="/imprint" className="hover:text-foreground transition-colors">
              Impressum
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              AGB
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookie-Richtlinie
            </Link>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-10">
          &copy; {year} bleedproof. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
