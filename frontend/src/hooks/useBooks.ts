import { useState, useEffect } from 'react';
import { getBooks } from '../services/books-service';
import type { Book } from '../types/book';

export const useBooks = (): Book[] => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then(setBooks).catch(console.error);
  }, []);

  return books;
};
