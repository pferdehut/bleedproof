import 'server-only'
import { notionQuery, DATABASES } from './client'

function ensureProtocol(url: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `https://${url}`
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  email: string
  website: string
  imageUrl: string
  status: string
  order: number
  workshops: string[]
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const response = await notionQuery(DATABASES.TEAM, {
    filter: {
      property: 'Status',
      status: { equals: 'Active' },
    },
    sorts: [{ property: 'Order', direction: 'ascending' }],
  })

  return response.results.map((page: any) => ({
    id: page.id,
    name: page.properties.Name?.title?.[0]?.plain_text || '',
    role: page.properties.Role?.rich_text?.[0]?.plain_text || '',
    bio: page.properties.Bio?.rich_text?.[0]?.plain_text || '',
    email: page.properties.Mail?.email || '',
    website: ensureProtocol(page.properties.Website?.url || ''),
    imageUrl: page.properties.Image?.files?.[0]?.file?.url || page.properties.Image?.files?.[0]?.external?.url || '',
    status: page.properties.Status?.status?.name || '',
    order: page.properties.Order?.number || 0,
    workshops: page.properties.Workshops?.relation?.map((rel: any) => rel.id) || [],
  }))
}
