import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO_EMAIL = process.env.CONTACT_EMAIL || 'hallo@bleedproof.ch'
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@bleedproof.ch'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message } = body

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 })
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Kontaktanfrage: ${subject}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;width:160px;">Name</td><td style="padding:8px;">${firstName} ${lastName}</td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">E-Mail</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Telefon</td><td style="padding:8px;">${phone || '–'}</td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Thema</td><td style="padding:8px;">${subject}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Nachricht</td><td style="padding:8px;white-space:pre-wrap;">${message}</td></tr>
        </table>
      `,
    })

    // Send confirmation to sender
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Wir haben deine Nachricht erhalten',
      html: `
        <h2>Danke, ${firstName}!</h2>
        <p>Wir haben deine Nachricht erhalten und melden uns baldmöglichst bei dir.</p>
        <p style="color:#666;font-size:14px;">Deine Anfrage: <em>${subject}</em></p>
        <hr/>
        <p style="color:#999;font-size:12px;">Bleedproof – bleedproof.ch</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact email error:', error)
    return NextResponse.json({ error: 'E-Mail konnte nicht gesendet werden' }, { status: 500 })
  }
}
