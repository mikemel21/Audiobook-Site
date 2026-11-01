import { getBooks, groupByGenre } from "../lib/librivox";
import BookCard from "./BookCard";

export default async function BookList() {
  const books = await getBooks();
  const byGenre = groupByGenre(books);

  return (
    <div>
      {Object.entries(byGenre)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([genre, genreBooks]) => (
          <section key={genre}>
            <h2 className="text-2xl font-semibold py-2">{genre}</h2>
            <ul>
              {genreBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}