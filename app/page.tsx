import { Suspense } from "react";
import BookList from "./components/BookList";

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
