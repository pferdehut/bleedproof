"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto border-4 border-foreground bg-background p-6 relative">
        <button
          onClick={declineCookies}
          className="absolute top-4 right-4 p-2 hover:bg-primary transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="pr-12">
          <h3 className="text-xl font-black uppercase mb-3">Cookie-Hinweis</h3>
          <p className="text-sm font-bold mb-4">
            Wir verwenden Cookies, um die Nutzung unserer Website zu analysieren und zu verbessern. 
            Weitere Informationen finden Sie in unserer{" "}
            <Link href="/privacy" className="underline hover:no-underline">
              Datenschutzerklärung
            </Link>
            {" "}und{" "}
            <Link href="/cookies" className="underline hover:no-underline">
              Cookie-Richtlinie
            </Link>
            .
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={acceptCookies}
              className="bg-foreground text-background hover:bg-foreground/90 font-black uppercase"
            >
              Alle akzeptieren
            </Button>
            <Button
              onClick={declineCookies}
              variant="outline"
              className="border-2 border-foreground font-black uppercase hover:bg-primary"
            >
              Nur notwendige
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
