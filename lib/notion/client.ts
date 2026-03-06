const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_VERSION = "2022-06-28";
const BASE_URL = "https://api.notion.com/v1";

export class NotionError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "NotionError";
  }
}

async function notionFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (!NOTION_API_KEY) {
    throw new NotionError("NOTION_API_KEY is not set");
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new NotionError(
      `Notion API error ${res.status}: ${body}`,
      res.status
    );
  }

  return res.json() as Promise<T>;
}

export async function queryDatabase(
  databaseId: string,
  body: Record<string, unknown> = {}
) {
  return notionFetch<NotionQueryResponse>(
    `/databases/${databaseId}/query`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );
}

export async function getPage(pageId: string) {
  return notionFetch<NotionPage>(`/pages/${pageId}`);
}

export async function createPage(body: Record<string, unknown>) {
  return notionFetch<NotionPage>("/pages", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface NotionQueryResponse {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string | null;
}

export interface NotionPage {
  id: string;
  properties: Record<string, NotionProperty>;
  cover?: { type: string; external?: { url: string }; file?: { url: string } };
}

export type NotionProperty =
  | { type: "title"; title: RichText[] }
  | { type: "rich_text"; rich_text: RichText[] }
  | { type: "number"; number: number | null }
  | { type: "select"; select: { name: string } | null }
  | { type: "multi_select"; multi_select: { name: string }[] }
  | { type: "checkbox"; checkbox: boolean }
  | { type: "url"; url: string | null }
  | { type: "email"; email: string | null }
  | { type: "phone_number"; phone_number: string | null }
  | { type: "date"; date: { start: string; end?: string | null } | null }
  | { type: "files"; files: NotionFile[] }
  | { type: "relation"; relation: { id: string }[] }
  | { type: "formula"; formula: { type: string; string?: string; number?: number; boolean?: boolean } }
  | { type: "status"; status: { name: string } | null };

export interface RichText {
  type: string;
  text?: { content: string; link?: { url: string } | null };
  plain_text: string;
  href?: string | null;
}

export interface NotionFile {
  type: "external" | "file";
  name?: string;
  external?: { url: string };
  file?: { url: string; expiry_time: string };
}

// ── Helpers ────────────────────────────────────────────────────────────────

export function getTitle(prop: NotionProperty | undefined): string {
  if (!prop || prop.type !== "title") return "";
  return prop.title.map((t) => t.plain_text).join("");
}

export function getRichText(prop: NotionProperty | undefined): string {
  if (!prop || prop.type !== "rich_text") return "";
  return prop.rich_text.map((t) => t.plain_text).join("");
}

export function getNumber(prop: NotionProperty | undefined): number | null {
  if (!prop || prop.type !== "number") return null;
  return prop.number;
}

export function getSelect(prop: NotionProperty | undefined): string | null {
  if (!prop || prop.type !== "select") return null;
  return prop.select?.name ?? null;
}

export function getStatus(prop: NotionProperty | undefined): string | null {
  if (!prop || prop.type !== "status") return null;
  return prop.status?.name ?? null;
}

export function getMultiSelect(prop: NotionProperty | undefined): string[] {
  if (!prop || prop.type !== "multi_select") return [];
  return prop.multi_select.map((s) => s.name);
}

export function getCheckbox(prop: NotionProperty | undefined): boolean {
  if (!prop || prop.type !== "checkbox") return false;
  return prop.checkbox;
}

export function getUrl(prop: NotionProperty | undefined): string | null {
  if (!prop || prop.type !== "url") return null;
  return prop.url;
}

export function getEmail(prop: NotionProperty | undefined): string | null {
  if (!prop || prop.type !== "email") return null;
  return prop.email;
}

export function getFiles(prop: NotionProperty | undefined): string[] {
  if (!prop || prop.type !== "files") return [];
  return prop.files.map((f) => {
    if (f.type === "external") return f.external?.url ?? "";
    return f.file?.url ?? "";
  });
}

export function getRelationIds(prop: NotionProperty | undefined): string[] {
  if (!prop || prop.type !== "relation") return [];
  return prop.relation.map((r) => r.id);
}
