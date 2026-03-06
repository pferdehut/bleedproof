import 'server-only'
import { notionQuery, DATABASES } from './client'

export interface Impression {
  id: string
  title: string
  imageUrl: string
  date: string
}

export async function getImpressions(): Promise<Impression[]> {
  const response = await notionQuery(DATABASES.IMPRESSIONS, {
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [{ property: 'Date', direction: 'descending' }],
  })

  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Title?.title?.[0]?.plain_text || '',
    imageUrl: page.properties.Image?.files?.[0]?.file?.url || page.properties.Image?.files?.[0]?.external?.url || '',
    date: page.properties.Date?.date?.start || '',
  }))
}
