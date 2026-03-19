import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { LoginPage } from './pages/login-page/LoginPage';
import { LibrarianDashboard } from './pages/librarian-dashboard/LibrarianDashboard';
import { BooksDashboard } from './pages/books-dashboard/BooksDashboard';
import { ReservationsDashboard } from './pages/reservations-dashboard/ReservationsDashboard';
import { MemberDashboard } from './pages/member-dashboard/MemberDashboard';
import { BookList } from './pages/book-list/BookList';
import { MemberReservations } from './pages/member-reservations/MemberReservations';
import { EditBook } from './pages/edit-book/EditBook';
import { DeleteBook } from './pages/delete-book/DeleteBook';
import { ProtectedRoute } from './components/protected-route/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        {/* Librarian */}
        <Route path="/dashboard/librarian" element={<LibrarianDashboard />} />
        <Route path="/dashboard/librarian/books" element={<BooksDashboard />} />
        <Route path="/dashboard/librarian/reservations" element={<ReservationsDashboard />} />

        {/* Member */}
        <Route path="/dashboard/member" element={<MemberDashboard />} />
        <Route path="/dashboard/member/books" element={<BookList />} />
        <Route path="/dashboard/member/reservations" element={<MemberReservations />} />

        {/* Book */}
        <Route path="/books/:id/edit" element={<EditBook />} />
        <Route path="/books/:id/delete" element={<DeleteBook />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
