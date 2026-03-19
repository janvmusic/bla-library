export interface Reservation {
  id: number;
  bookTitle: string;
  userFirstName: string;
  userLastName: string;
  borrowDate: string;
  dueDate: string;
  returnedAt: string | null;
}
