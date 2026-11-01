export type Author = {
  id: string,
  first_name: string,
  last_name: string,
  dob: string,
  dod: string;
};

export type Genre = {
  id: string,
  name: string
};

export type Book = {
  id: string,
  title: string,
  description: string,
  authors: Author[],
  genres: Genre[]
};