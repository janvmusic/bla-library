import api from './api';
import type { Book } from '../types/book';

interface JsonApiBookAttributes {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  total_copies: number;
}

interface JsonApiBookResource {
  id: string;
  type: 'book';
  attributes: JsonApiBookAttributes;
}

interface JsonApiBooksResponse {
  data: JsonApiBookResource[];
}

interface JsonApiBookResponse {
  data: JsonApiBookResource;
}

const deserializeBook = (resource: JsonApiBookResource): Book => ({
  id: parseInt(resource.id, 10),
  title: resource.attributes.title,
  author: resource.attributes.author,
  genre: resource.attributes.genre,
  isbn: resource.attributes.isbn,
  totalCopies: resource.attributes.total_copies,
});

export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get<JsonApiBooksResponse>('/books');
  return response.data.data.map(deserializeBook);
};

export const getBook = async (id: number): Promise<Book> => {
  const response = await api.get<JsonApiBookResponse>(`/books/${id}`);
  return deserializeBook(response.data.data);
};

export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
};

export const createBook = async (fields: Omit<Book, 'id'>): Promise<Book> => {
  const response = await api.post<JsonApiBookResponse>('/books', {
    book: {
      title: fields.title,
      author: fields.author,
      genre: fields.genre,
      isbn: fields.isbn,
      total_copies: fields.totalCopies,
    },
  });
  return deserializeBook(response.data.data);
};

export const updateBook = async (id: number, fields: Partial<Omit<Book, 'id'>>): Promise<Book> => {
  const response = await api.patch<JsonApiBookResponse>(`/books/${id}`, {
    book: {
      title: fields.title,
      author: fields.author,
      genre: fields.genre,
      isbn: fields.isbn,
      total_copies: fields.totalCopies,
    },
  });
  return deserializeBook(response.data.data);
};
