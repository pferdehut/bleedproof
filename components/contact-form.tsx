"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Senden fehlgeschlagen')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Senden fehlgeschlagen')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="border-4 border-black bg-lime p-8 text-center">
        <div className="text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-display font-black uppercase mb-2">Nachricht verschickt!</h3>
        <p className="text-sm font-bold">Danke für deine Nachricht. Wir melden uns baldmöglichst.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Vorname</Label>
          <Input id="firstName" name="firstName" required placeholder="Vorname" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nachname</Label>
          <Input id="lastName" name="lastName" required placeholder="Nachname" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="mail@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefonnummer (Optional)</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+41 00 000 00 00" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Thema</Label>
        <Input id="subject" name="subject" required placeholder="Workshop Anfrage" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Nachricht</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Was möchtest du von uns wissen oder uns erzählen?"
          className="min-h-[150px]"
        />
      </div>

      {error && (
        <div className="border-4 border-black bg-coral p-4 text-sm font-black">
          <p>{error}</p>
        </div>
      )}

      <Button type="submit" className="w-full font-black uppercase" size="lg" disabled={isLoading}>
        {isLoading ? "Senden..." : "Nachricht senden"}
      </Button>
    </form>
  )
}
