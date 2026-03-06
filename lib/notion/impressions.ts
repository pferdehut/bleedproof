import {
  queryDatabase,
  getTitle,
  getCheckbox,
  getFiles,
} from "./client";
import type { Impression } from "./types";
import type { NotionPage } from "./client";

const DB_ID = process.env.NOTION_IMPRESSIONS_DB_ID!;

function pageToImpression(page: NotionPage): Impression {
  const props = page.properties;
  const images = getFiles(props["Image"]);
  const dateProp = props["Date"];
  let date: string | null = null;
  if (dateProp && dateProp.type === "date" && dateProp.date) {
    date = dateProp.date.start;
  }
  return {
    id: page.id,
    title: getTitle(props["Title"]),
    image: images[0] ?? null,
    date,
    published: getCheckbox(props["Published"]),
  };
}

export async function getImpressions(): Promise<Impression[]> {
  const response = await queryDatabase(DB_ID, {
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return response.results.map(pageToImpression);
}
