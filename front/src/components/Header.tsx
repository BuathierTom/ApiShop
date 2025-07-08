import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-white shadow-sm mb-6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-blue-600">
          <img src="/logo.svg" alt="logo" className="h-8 w-8" />
          ApiShop
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex gap-6 text-sm text-gray-700">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <Link to="/products" className="hover:text-blue-600">Produits</Link>
          <Link to="/orders" className="hover:text-blue-600">Mes commandes</Link>
          {user?.role === 'Admin' && (
            <Link to="/admin/products" className="hover:text-blue-600">Admin</Link>
          )}
        </nav>

        {/* Icons à droite */}
        <div className="flex items-center gap-4 relative">
          {/* Panier */}
          <Link to="/cart" className="text-gray-600 hover:text-blue-600">
            <ShoppingCart className="w-6 h-6" />
          </Link>

          {/* Utilisateur */}
          {user && (
            <div className="relative">
              <button onClick={() => setOpen(!open)} className="text-gray-700 hover:text-blue-600">
                <User className="w-6 h-6" />
              </button>

              {open && (
                <div className="absolute right-0 top-9 bg-white border shadow rounded p-3 w-48 z-10">
                  <p className="text-sm font-medium mb-1">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500 mb-3">{user.role}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
