import {
  queryDatabase,
  getTitle,
  getRichText,
  getNumber,
  getUrl,
  getStatus,
} from "./client";
import type { Location } from "./types";
import type { NotionPage } from "./client";

const DB_ID = process.env.NOTION_LOCATIONS_DB_ID!;

function pageToLocation(page: NotionPage): Location {
  const props = page.properties;
  return {
    id: page.id,
    name: getTitle(props["Name"]),
    address: getRichText(props["Address"]),
    website: getUrl(props["Website"]),
    status: getStatus(props["Status"]),
    order: getNumber(props["Order"]),
  };
}

export async function getLocations(): Promise<Location[]> {
  const response = await queryDatabase(DB_ID, {
    filter: {
      property: "Status",
      status: { equals: "Published" },
    },
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return response.results.map(pageToLocation);
}
