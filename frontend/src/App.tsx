import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { LoginPage } from './pages/login-page/LoginPage';
import { LibrarianDashboard } from './pages/librarian-dashboard/LibrarianDashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard/librarian" element={<LibrarianDashboard />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
