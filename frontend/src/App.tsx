import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { LoginPage } from './pages/login-page/LoginPage';
import { LibrarianDashboard } from './pages/librarian-dashboard/LibrarianDashboard';
import { BooksDashboard } from './pages/books-dashboard/BooksDashboard';
import { ReservationsDashboard } from './pages/reservations-dashboard/ReservationsDashboard';
import { MemberDashboard } from './pages/member-dashboard/MemberDashboard';
import { EditBook } from './pages/edit-book/EditBook';
import { DeleteBook } from './pages/delete-book/DeleteBook';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard */}
      <Route path="/dashboard/librarian" element={<LibrarianDashboard />} />
      <Route path="/dashboard/librarian/books" element={<BooksDashboard />} />
      <Route path="/dashboard/librarian/reservations" element={<ReservationsDashboard />} />
      <Route path="/dashboard/member/dashboard" element={<MemberDashboard />} />

      {/* Book */}
      <Route path="/books/:id/edit" element={<EditBook />} />
      <Route path="/books/:id/delete" element={<DeleteBook />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
