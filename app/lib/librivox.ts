import type {Book} from "./types";
import { normalizeGenre } from "./format";

export async function getBooks(): Promise<Book[]> {
  const res = await fetch("https://librivox.org/api/feed/audiobooks?limit=50&extended=1&format=json", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await res.json();
  return data.books;
}

export function groupByGenre(books: Book[]): Record<string, Book[]> {
  const groups: Record<string, Book[]> = {};

  for (const book of books) {
    const names = book.genres?.length
      ? book.genres.map(g => normalizeGenre(g.name))
      : ["Uncategorized"];

    // Set removes duplicate names within a single book
    for (const name of new Set(names)) {
      (groups[name] ??= []).push(book);
    }
  }

  return groups;
}