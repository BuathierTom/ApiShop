import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
      <span className="font-bold text-lg">ApiShop</span>
      <button
        onClick={handleLogout}
        className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
      >
        Déconnexion
      </button>
    </header>
  );
};

export default Header;
