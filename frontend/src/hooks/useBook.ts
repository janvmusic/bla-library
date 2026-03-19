import { useState, useEffect } from 'react';
import { getBook } from '../services/books-service';
import type { Book } from '../types/book';

export const useBook = (id: number): Book | null => {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    getBook(id).then(setBook).catch(console.error);
  }, [id]);

  return book;
};
