import type { Book } from '../types/book';

export const filterBooks = (books: Book[], query: string): Book[] => {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return books;
  }

  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(normalized) ||
      book.author.toLowerCase().includes(normalized) ||
      book.genre.toLowerCase().includes(normalized) ||
      book.isbn.toLowerCase().includes(normalized),
  );
};
