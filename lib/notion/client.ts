import 'server-only'

const NOTION_API_BASE = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

function notionHeaders() {
  return {
    'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  }
}

export async function notionQuery(databaseId: string, body: object = {}) {
  const res = await fetch(`${NOTION_API_BASE}/databases/${databaseId}/query`, {
    method: 'POST',
    headers: notionHeaders(),
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Notion query failed: ${err}`)
  }
  return res.json()
}

export async function notionGetPage(pageId: string) {
  const res = await fetch(`${NOTION_API_BASE}/pages/${pageId}`, {
    method: 'GET',
    headers: notionHeaders(),
    cache: 'no-store',
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Notion get page failed: ${err}`)
  }
  return res.json()
}

export async function notionCreatePage(body: object) {
  const res = await fetch(`${NOTION_API_BASE}/pages`, {
    method: 'POST',
    headers: notionHeaders(),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Notion create page failed: ${err}`)
  }
  return res.json()
}

export const DATABASES = {
  WORKSHOPS: process.env.NOTION_WORKSHOPS_DB_ID || '',
  TEAM: process.env.NOTION_TEAM_DB_ID || '',
  IMPRESSIONS: process.env.NOTION_IMPRESSIONS_DB_ID || '',
  BOOKING_REQUESTS: process.env.NOTION_BOOKING_REQUESTS_DB_ID || '',
  LOCATIONS: process.env.NOTION_LOCATIONS_DB_ID || '',
}
