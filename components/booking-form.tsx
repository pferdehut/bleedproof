"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


interface BookingFormProps {
  workshopName: string
  workshopPrice: number
}

export function BookingForm({ workshopName, workshopPrice }: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workshopName,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          orga: formData.get("orga"),
          participants: parseInt(formData.get("participants") as string) || 1,
          preferredDate: formData.get("preferredDate"),
          message: formData.get("message"),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Buchungsanfrage fehlgeschlagen")
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Buchungsanfrage fehlgeschlagen")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="border-4 border-black bg-lime p-8 text-center">
        <div className="text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-display font-black uppercase mb-2">Anfrage gesendet!</h3>
        <p className="text-sm font-bold">
          Wir werden uns in Kürze mit Ihnen in Verbindung setzen, um Ihren Workshop zu planen.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Vollständiger Name</Label>
        <Input id="name" name="name" required placeholder="Max Mustermann" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input id="email" name="email" type="email" required placeholder="max@beispiel.ch" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefonnummer</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+41 79 123 45 67" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="orga">Schule / Organisation</Label>
        <Input id="orga" name="orga" type="text" placeholder="Schule / Organisation" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="participants">Anzahl Teilnehmer*innen</Label>
        <Input id="participants" name="participants" type="number" min="1" defaultValue="1" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredDate">Wunschdatum (Optional)</Label>
        <Input id="preferredDate" name="preferredDate" type="text" placeholder="z.B. 15. März 2026 oder KW 12" />
        <p className="text-xs font-bold opacity-70">Geben Sie Ihr Wunschdatum ein. Wir prüfen die Verfügbarkeit und melden uns bei Ihnen.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Nachricht (Optional)</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Besondere Anforderungen oder Fragen?"
          className="min-h-[100px]"
        />
      </div>

      {error && (
        <div className="border-4 border-black bg-coral p-4 text-sm font-black">
          <p>{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between border-4 border-black bg-yellow p-4">
        <span className="text-sm">Richtpreis:</span>
        <span className="text-2xl font-bold">CHF {workshopPrice}</span>
      </div>

      <Button type="submit" className="w-full font-black uppercase" size="lg" disabled={isLoading}>
        {isLoading ? "Wird gesendet..." : "Workshop anfragen"}
      </Button>

      <p className="text-center text-xs font-bold opacity-70">
        Mit dem Absenden stimmen Sie unseren Geschäftsbedingungen zu. Wir werden uns mit Ihnen in Verbindung setzen, um
        die Verfügbarkeit zu bestätigen.
      </p>
    </form>
  )
}
