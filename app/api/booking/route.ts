import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createBookingRequest } from '@/lib/notion/booking-requests'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO_EMAIL = process.env.CONTACT_EMAIL || 'workshop@bleedproof.ch'
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@bleedproof.ch'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { workshopName, name, email, phone, orga, participants, preferredDate, message } = body

    if (!workshopName || !name || !email || !phone) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 })
    }

    // Save to Notion
    await createBookingRequest({ workshopName, name, email, phone, orga, participants, preferredDate, message })

    // Notify team
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Buchungsanfrage: ${workshopName}`,
      html: `
        <h2>Neue Buchungsanfrage</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;width:160px;">Workshop</td><td style="padding:8px;">${workshopName}</td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Organisation</td><td style="padding:8px;">${orga}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">E-Mail</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Telefon</td><td style="padding:8px;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Teilnehmende</td><td style="padding:8px;">${participants}</td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Wunschdatum</td><td style="padding:8px;">${preferredDate}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Nachricht</td><td style="padding:8px;white-space:pre-wrap;">${message || '–'}</td></tr>
        </table>
      `,
    })

    // Confirmation to customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Buchungsanfrage erhalten: ${workshopName}`,
      html: `
        <h2>Hoi ${name}!</h2>
        <p>Danke für deine Buchungsanfrage. Wir haben sie erhalten und melden uns in Kürze mit einer Bestätigung.</p>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;margin-top:16px;">
          <tr><td style="padding:8px;font-weight:bold;width:160px;">Workshop</td><td style="padding:8px;">${workshopName}</td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Wunschdatum</td><td style="padding:8px;">${preferredDate}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Teilnehmende</td><td style="padding:8px;">${participants}</td></tr>
        </table>
        <hr style="margin-top:24px;"/>
        <p style="color:#999;font-size:12px;">Bleedproof – bleedproof.ch</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking email error:', error)
    return NextResponse.json({ error: 'Buchungsanfrage konnte nicht gesendet werden' }, { status: 500 })
  }
}
