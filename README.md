
# bleedproof

Workshop booking website for bleedproof — screen printing, risography, linocut, and 3D printing workshops in Zürich.

Built with Next.js 16 (App Router), Tailwind CSS v4, and Notion as a headless CMS. All content is managed directly in Notion. Booking requests are saved to Notion and confirmed via email using Resend.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **CMS**: Notion (via REST API — no SDK)
- **Email**: Resend
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## Project Structure

```
app/
  page.tsx                  # Homepage
  workshops/
    page.tsx                # Workshop listing
    [id]/page.tsx           # Workshop detail + booking form
  team/page.tsx             # Team members
  impressions/page.tsx      # Photo gallery
  contact/page.tsx          # Contact form
  imprint/page.tsx          # Impressum
  terms/page.tsx            # AGB
  cookies/page.tsx          # Cookie policy
  api/
    booking/route.ts        # Booking request handler (Notion + email)
    contact/route.ts        # Contact form handler (email)

components/
  navigation.tsx            # Fixed top-right nav
  footer.tsx                # Footer with legal links
  booking-form.tsx          # Workshop booking form
  contact-form.tsx          # Contact form
  workshop-slideshow.tsx    # Multi-image slideshow
  cookie-consent.tsx        # GDPR cookie banner

lib/
  notion/
    client.ts               # Fetch-based Notion REST client
    workshops.ts            # Workshops queries
    team.ts                 # Team members queries
    impressions.ts          # Impressions/gallery queries
    locations.ts            # Locations queries
    booking-requests.ts     # Create booking request
```

## Notion Database Setup

You need 5 databases in Notion. See [`NOTION_SETUP.md`](./NOTION_SETUP.md) for full instructions.

| Database | Key Properties |
|---|---|
| Workshops | Name, Description, Audience Level (multi-select), Duration, Max. Participants, Price, Image (files), Status, Team Members (relation) |
| Team Members | Name, Role, Bio, Mail, Website, Image, Status, Order, Workshops (relation) |
| Impressions | Title, Image, Date, Published (checkbox) |
| Booking Requests | Workshop, Name, Contact Email, Phone, Participant Count, Preferred Workshop Date, Message, Status, Created At |
| Locations | Name, Address, Website, Status, Order |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NOTION_API_KEY` | Notion internal integration token |
| `NOTION_WORKSHOPS_DB_ID` | Workshops database ID |
| `NOTION_TEAM_DB_ID` | Team Members database ID |
| `NOTION_IMPRESSIONS_DB_ID` | Impressions database ID |
| `NOTION_BOOKING_REQUESTS_DB_ID` | Booking Requests database ID |
| `NOTION_LOCATIONS_DB_ID` | Locations database ID |
| `RESEND_API_KEY` | Resend API key for sending emails |
| `FROM_EMAIL` | Verified sender address (e.g. `hallo@bleedproof.ch`) |
| `CONTACT_EMAIL` | Recipient address for contact/booking notifications |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (e.g. `https://bleedproof.ch`) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deploy to Vercel. Add all environment variables in the Vercel project settings.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
