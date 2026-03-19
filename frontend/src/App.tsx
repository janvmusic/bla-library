import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { LoginPage } from './pages/login-page/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
