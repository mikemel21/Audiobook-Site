import type { Book } from "../lib/types";
import { formatAuthor, stripTags, truncateWords } from "../lib/format";

export default function BookCard({ book }: {book: Book}) { 
    return (
        <li className="bg-gray-600 rounded-sm m-2 p-1" key={book.id}>
            <h3 className="text-lg">{book.title}</h3>
            <p className="text-sm indent-2">
            Author(s): {(book.authors ?? []).map(formatAuthor).join(", ")}
            </p>
            <p className="text-sm indent-2">Description: {truncateWords(stripTags(book.description), 100)}</p>
        </li>
    );
}