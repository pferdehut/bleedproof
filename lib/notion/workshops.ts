import {
  queryDatabase,
  getPage,
  getTitle,
  getRichText,
  getNumber,
  getMultiSelect,
  getStatus,
  getFiles,
  getRelationIds,
} from "./client";
import type { Workshop } from "./types";

const DB_ID = process.env.NOTION_WORKSHOPS_DB_ID!;

function pageToWorkshop(page: Awaited<ReturnType<typeof getPage>>): Workshop {
  const props = page.properties;
  return {
    id: page.id,
    name: getTitle(props["Name"]),
    description: getRichText(props["Description"]),
    audienceLevel: getMultiSelect(props["Audience Level"]),
    duration: getRichText(props["Duration"]),
    maxParticipants: getNumber(props["Max. Participants"]),
    price: getRichText(props["Price"]),
    images: getFiles(props["Image"]),
    status: getStatus(props["Status"]) ?? getTitle(props["Status"] as never),
    teamMemberIds: getRelationIds(props["Team Members"]),
    slug: page.id.replace(/-/g, ""),
  };
}

export async function getWorkshops(): Promise<Workshop[]> {
  const response = await queryDatabase(DB_ID, {
    filter: {
      property: "Status",
      status: { equals: "Published" },
    },
    sorts: [{ property: "Name", direction: "ascending" }],
  });

  return response.results.map(pageToWorkshop);
}

export async function getWorkshop(id: string): Promise<Workshop | null> {
  try {
    // Notion IDs have dashes inserted — handle both formats
    const formattedId =
      id.length === 32
        ? `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`
        : id;
    const page = await getPage(formattedId);
    return pageToWorkshop(page);
  } catch {
    return null;
  }
}
