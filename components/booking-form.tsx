"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  workshopId: string;
  workshopName: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  participantCount: string;
  preferredDate: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function BookingForm({
  workshopId,
  workshopName,
}: BookingFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    participantCount: "1",
    preferredDate: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshopId,
          workshopName,
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          participantCount: parseInt(form.participantCount, 10),
          preferredDate: form.preferredDate || undefined,
          message: form.message || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unbekannter Fehler");

      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        participantCount: "1",
        preferredDate: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Bitte versuche es erneut."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border p-8 bg-muted text-center">
        <p className="text-2xl font-bold mb-2">Anfrage gesendet!</p>
        <p className="text-muted-foreground text-sm">
          Wir melden uns innerhalb von 1–2 Werktagen bei dir.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full h-12 px-3 bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors font-mono";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name *"
            required
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-Mail *"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Telefon (optional)"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="participantCount" className="sr-only">
            Anzahl Teilnehmende
          </label>
          <input
            id="participantCount"
            name="participantCount"
            type="number"
            min="1"
            max="50"
            placeholder="Anzahl Teilnehmende *"
            required
            value={form.participantCount}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="preferredDate" className="sr-only">
            Wunschdatum
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            placeholder="Wunschdatum (optional)"
            value={form.preferredDate}
            onChange={handleChange}
            className={cn(inputClass, "cursor-pointer")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Nachricht / Fragen (optional)"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className={cn(inputClass, "h-auto py-3 resize-none")}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-accent text-sm font-mono">
          Fehler: {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "w-full h-12 bg-foreground text-background text-sm font-bold tracking-wide hover:bg-accent hover:text-background transition-colors",
          status === "loading" && "opacity-60 cursor-not-allowed"
        )}
      >
        {status === "loading" ? "Wird gesendet…" : "Workshop anfragen"}
      </button>

      <p className="text-xs text-muted-foreground">
        * Pflichtfelder. Deine Daten werden vertraulich behandelt.
      </p>
    </form>
  );
}
