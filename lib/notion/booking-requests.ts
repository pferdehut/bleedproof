import { createPage } from "./client";

const DB_ID = process.env.NOTION_BOOKING_REQUESTS_DB_ID!;

export interface BookingRequestData {
  workshopId: string;
  workshopName: string;
  name: string;
  email: string;
  phone?: string;
  participantCount: number;
  preferredDate?: string;
  message?: string;
}

export async function createBookingRequest(data: BookingRequestData) {
  const properties: Record<string, unknown> = {
    Workshop: {
      title: [{ text: { content: data.workshopName } }],
    },
    Name: {
      rich_text: [{ text: { content: data.name } }],
    },
    "Contact Email": {
      email: data.email,
    },
    "Participant Count": {
      number: data.participantCount,
    },
    Status: {
      status: { name: "New" },
    },
    "Created At": {
      date: { start: new Date().toISOString() },
    },
  };

  if (data.phone) {
    properties["Phone"] = { phone_number: data.phone };
  }

  if (data.preferredDate) {
    properties["Preferred Workshop Date"] = {
      date: { start: data.preferredDate },
    };
  }

  if (data.message) {
    properties["Message"] = {
      rich_text: [{ text: { content: data.message } }],
    };
  }

  return createPage({
    parent: { database_id: DB_ID },
    properties,
  });
}
