import api from './api';
import type { Reservation } from '../types/reservation';

interface JsonApiReservationAttributes {
  book_title: string;
  user_first_name: string;
  user_last_name: string;
  borrowed_at: string;
  due_date: string;
  returned_at: string | null;
}

interface JsonApiReservationResource {
  id: string;
  type: 'book_reservation';
  attributes: JsonApiReservationAttributes;
}

interface JsonApiReservationsResponse {
  data: JsonApiReservationResource[];
}

const deserializeReservation = (resource: JsonApiReservationResource): Reservation => ({
  id: parseInt(resource.id, 10),
  bookTitle: resource.attributes.book_title,
  userFirstName: resource.attributes.user_first_name,
  userLastName: resource.attributes.user_last_name,
  borrowDate: resource.attributes.borrowed_at,
  dueDate: resource.attributes.due_date,
  returnedAt: resource.attributes.returned_at,
});

export const getReservations = async (): Promise<Reservation[]> => {
  const response = await api.get<JsonApiReservationsResponse>('/book_reservations');
  return response.data.data.map(deserializeReservation);
};

export const returnReservation = async (id: number): Promise<void> => {
  await api.delete(`/book_reservations/${id}`);
};

export const createReservation = async (bookId: number, userId: number): Promise<Reservation> => {
  const response = await api.post<{ data: JsonApiReservationResource }>('/book_reservations', {
    book_reservation: { book_id: bookId, user_id: userId },
  });
  return deserializeReservation(response.data.data);
};
