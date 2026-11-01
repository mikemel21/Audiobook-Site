import { Suspense } from "react";

type Author = {
  id: string,
  first_name: string,
  last_name: string,
  dob: string,
  dod: string;
};

type Genre = {
  id: string,
  name: string
};

type Book = {
  id: string,
  title: string,
  description: string,
  authors: Author[],
  genres: Genre[]
};

function normalizeGenre(name: string) {
  return name.replaceAll("*Non-fiction", "Non-fiction");
}

function formatAuthor(a: Author) {
  return [a.first_name, a.last_name].filter(Boolean).join(" ");
}

function truncateWords(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

async function getBooks(): Promise<Book[]> {
  const res = await fetch("https://librivox.org/api/feed/audiobooks?limit=50&extended=1&format=json", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await res.json();
  return data.books;
}

function groupByGenre(books: Book[]): Record<string, Book[]> {
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

async function BookList() {
  const books = await getBooks();
  const byGenre = groupByGenre(books);
  const stripDescTags = (html: string) => html.replace(/<[^>]*>/g,"").trim();

  return (
    <div>
      {Object.entries(byGenre)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([genre, genreBooks]) => (
          <section key={genre}>
            <h2 className="text-2xl font-semibold py-2">{genre}</h2>
            <ul>
              {genreBooks.map((book) => (
                <li className="bg-gray-600 rounded-sm m-2 p-1" key={book.id}>
                  <h3 className="text-lg">{book.title}</h3>
                  <p className="text-sm indent-2">
                    Author(s): {(book.authors ?? []).map(formatAuthor).join(", ")}
                  </p>
                  <p className="text-sm indent-2">Description: {truncateWords(stripDescTags(book.description), 100)}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 px-30 pt-10">
      <main className="flex flex-1 max-w-3xl flex-col">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">Audiobooks</h1>
        <Suspense fallback={<p>Loading Audiobooks...</p>}>
          <BookList />
        </Suspense>
      </main>
    </div>
  );
}
