import 'server-only'
import { notionQuery, notionGetPage, DATABASES } from './client'

export interface Workshop {
  id: string
  name: string
  description: string
  audienceLevel: string[]
  duration: number
  maxParticipants: number
  price: number
  imageUrl: string
  imageUrls: string[]
  status: string
  teamMembers: string[]
}

function extractFileUrl(file: any): string {
  return file?.file?.url || file?.external?.url || ''
}

function mapWorkshop(page: any): Workshop {
  const files: any[] = page.properties.Image?.files || []
  const imageUrls = files.map(extractFileUrl).filter(Boolean)
  return {
    id: page.id,
    name: page.properties.Name?.title?.[0]?.plain_text || '',
    description: page.properties.Description?.rich_text?.[0]?.plain_text || '',
    audienceLevel: page.properties['Audience Level']?.multi_select?.map((s: any) => s.name) || [],
    duration: page.properties.Duration?.number || 0,
    maxParticipants: page.properties['Max Participants']?.number || 0,
    price: page.properties.Price?.number || 0,
    imageUrl: imageUrls[0] || '',
    imageUrls,
    status: page.properties.Status?.status?.name || '',
    teamMembers: page.properties['Team Members']?.relation?.map((rel: any) => rel.id) || [],
  }
}

export async function getWorkshops(): Promise<Workshop[]> {
  const response = await notionQuery(DATABASES.WORKSHOPS, {
    filter: {
      property: 'Status',
      status: { equals: 'Published' },
    },
    sorts: [{ property: 'Name', direction: 'ascending' }],
  })
  return response.results.map(mapWorkshop)
}

export async function getWorkshopById(id: string): Promise<Workshop | null> {
  try {
    const page = await notionGetPage(id)
    return mapWorkshop(page)
  } catch (error) {
    console.error('Error fetching workshop:', error)
    return null
  }
}
