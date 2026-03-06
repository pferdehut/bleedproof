import 'server-only'
import { notionCreatePage, DATABASES } from './client'

export interface BookingRequest {
  workshopName: string
  name: string
  email: string
  phone: string
  orga: string
  participants: number
  preferredDate: string
  message: string
}

export async function createBookingRequest(data: BookingRequest) {
  try {
    await notionCreatePage({
      parent: { database_id: DATABASES.BOOKING_REQUESTS },
      properties: {
        Workshop: {
          title: [{ text: { content: data.workshopName } }],
        },
        Name: {
          rich_text: [{ text: { content: data.name } }],
        },
        Organisation: {
          rich_text: [{ text: { content: data.orga }}],
        },
        'Contact Email': {
          email: data.email,
        },
        Phone: {
          phone_number: data.phone,
        },
        'Participant Count': {
          number: data.participants,
        },
        'Preferred Workshop Date': {
          rich_text: [{ text: { content: data.preferredDate } }],
        },
        Message: {
          rich_text: [{ text: { content: data.message || '' } }],
        },
        Status: {
          status: { name: 'Pending' },
        },
        'Created At': {
          date: { start: new Date().toISOString() },
        },
      },
    })
    return { success: true }
  } catch (error) {
    console.error('Error creating booking request:', error)
    return { success: false, error: 'Failed to submit booking request' }
  }
}
