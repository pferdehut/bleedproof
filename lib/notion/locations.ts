import 'server-only'
import { notionQuery, DATABASES } from './client'

export interface Location {
  id: string
  name: string
  address: string
  website: string
  status: string
  order: number
}

export async function getLocations(): Promise<Location[]> {
  const response = await notionQuery(DATABASES.LOCATIONS, {
    filter: {
      property: 'Status',
      status: { equals: 'Active' },
    },
    sorts: [{ property: 'Order', direction: 'ascending' }],
  })

  return response.results.map((page: any) => ({
    id: page.id,
    name: page.properties.Name?.title?.[0]?.plain_text || '',
    address: page.properties.Address?.rich_text?.[0]?.plain_text || '',
    website: page.properties.Website?.url || '',
    status: page.properties.Status?.status?.name || '',
    order: page.properties.Order?.number || 0,
  }))
}
