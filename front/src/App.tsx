import { useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
