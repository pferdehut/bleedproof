import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL ?? "hallo@bleedproof.ch";
    const contactEmail = process.env.CONTACT_EMAIL ?? "hallo@bleedproof.ch";

    if (resendKey) {
      const resend = new Resend(resendKey);

      // Notify the studio
      await resend.emails.send({
        from: fromEmail,
        to: contactEmail,
        subject: `Neue Kontaktanfrage von ${data.name}`,
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          <p><strong>Nachricht:</strong></p>
          <p>${data.message.replace(/\n/g, "<br/>")}</p>
        `,
        replyTo: data.email,
      });

      // Auto-reply
      await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: "Deine Nachricht an bleedproof",
        html: `
          <p>Hallo ${data.name},</p>
          <p>vielen Dank für deine Nachricht. Wir melden uns so bald wie möglich bei dir.</p>
          <br/>
          <p>Herzliche Grüsse<br/>Das bleedproof Team</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Ungültige Eingabe" },
        { status: 400 }
      );
    }

    console.error("[contact] Error:", err);
    return NextResponse.json(
      { error: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
