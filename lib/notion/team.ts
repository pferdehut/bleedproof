import {
  queryDatabase,
  getPage,
  getTitle,
  getRichText,
  getNumber,
  getUrl,
  getEmail,
  getStatus,
  getFiles,
  getRelationIds,
} from "./client";
import type { TeamMember } from "./types";

const DB_ID = process.env.NOTION_TEAM_DB_ID!;

function pageToTeamMember(
  page: Awaited<ReturnType<typeof getPage>>
): TeamMember {
  const props = page.properties;
  const images = getFiles(props["Image"]);
  return {
    id: page.id,
    name: getTitle(props["Name"]),
    role: getRichText(props["Role"]),
    bio: getRichText(props["Bio"]),
    email: getEmail(props["Mail"]),
    website: getUrl(props["Website"]),
    image: images[0] ?? null,
    status: getStatus(props["Status"]),
    order: getNumber(props["Order"]),
    workshopIds: getRelationIds(props["Workshops"]),
  };
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const response = await queryDatabase(DB_ID, {
    filter: {
      property: "Status",
      status: { equals: "Published" },
    },
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return response.results.map(pageToTeamMember);
}

export async function getTeamMembersByIds(
  ids: string[]
): Promise<TeamMember[]> {
  if (ids.length === 0) return [];
  const members = await Promise.allSettled(
    ids.map(async (id) => {
      const page = await getPage(id);
      return pageToTeamMember(page);
    })
  );
  return members
    .filter((r): r is PromiseFulfilledResult<TeamMember> => r.status === "fulfilled")
    .map((r) => r.value);
}
