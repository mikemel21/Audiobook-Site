import { Author } from './types';

export function normalizeGenre(name: string) {
  return name.replaceAll("*Non-fiction", "Non-fiction");
}

export function formatAuthor(a: Author) {
  return [a.first_name, a.last_name].filter(Boolean).join(" ");
}

export function truncateWords(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

export function stripTags(html: string) {
  return html.replace(/<[^>]*>/g,"").trim();
}