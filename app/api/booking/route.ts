import { NextResponse } from "next/server";
import { z } from "zod";
import { createBookingRequest } from "@/lib/notion/booking-requests";
import { Resend } from "resend";

const schema = z.object({
  workshopId: z.string().min(1),
  workshopName: z.string().min(1),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  participantCount: z.number().int().min(1).max(100),
  preferredDate: z.string().optional(),
  message: z.string().max(2000).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    // Save to Notion
    await createBookingRequest(data);

    // Send confirmation email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL ?? "hallo@bleedproof.ch";
    const contactEmail = process.env.CONTACT_EMAIL ?? "hallo@bleedproof.ch";

    if (resendKey) {
      const resend = new Resend(resendKey);

      // Notify the studio
      await resend.emails.send({
        from: fromEmail,
        to: contactEmail,
        subject: `Neue Workshop-Anfrage: ${data.workshopName}`,
        html: `
          <h2>Neue Buchungsanfrage</h2>
          <p><strong>Workshop:</strong> ${data.workshopName}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Telefon:</strong> ${data.phone}</p>` : ""}
          <p><strong>Teilnehmende:</strong> ${data.participantCount}</p>
          ${data.preferredDate ? `<p><strong>Wunschdatum:</strong> ${data.preferredDate}</p>` : ""}
          ${data.message ? `<p><strong>Nachricht:</strong> ${data.message}</p>` : ""}
        `,
      });

      // Confirm to the requester
      await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: `Deine Anfrage für „${data.workshopName}"`,
        html: `
          <p>Hallo ${data.name},</p>
          <p>vielen Dank für deine Anfrage für den Workshop <strong>${data.workshopName}</strong>.</p>
          <p>Wir melden uns innerhalb von 1–2 Werktagen bei dir.</p>
          <br/>
          <p>Herzliche Grüsse<br/>Das bleedproof Team</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Ungültige Eingabe", details: err.errors },
        { status: 400 }
      );
    }

    console.error("[booking] Error:", err);
    return NextResponse.json(
      { error: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
