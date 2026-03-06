"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unbekannter Fehler");

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
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
        <p className="text-2xl font-bold mb-2">Nachricht gesendet!</p>
        <p className="text-muted-foreground text-sm">
          Wir melden uns so bald wie möglich bei dir.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full h-12 px-3 bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors font-mono";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="sr-only">
          Name
        </label>
        <input
          id="contact-name"
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
        <label htmlFor="contact-email" className="sr-only">
          E-Mail
        </label>
        <input
          id="contact-email"
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
        <label htmlFor="contact-message" className="sr-only">
          Nachricht
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Nachricht *"
          rows={6}
          required
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
        {status === "loading" ? "Wird gesendet…" : "Nachricht senden"}
      </button>

      <p className="text-xs text-muted-foreground">
        * Pflichtfelder.
      </p>
    </form>
  );
}
