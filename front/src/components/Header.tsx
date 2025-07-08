import { NavLink, useNavigate } from 'react-router-dom';
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

  const activeClass =
    'text-primary-700 font-semibold bg-gray-100 dark:text-white';
  const inactiveClass =
    'text-gray-700 hover:text-primary-700 dark:text-gray-400 dark:hover:text-white';

  return (
    <header className="bg-white shadow-sm mb-6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 text-lg font-bold ${
              isActive ? 'text-blue-600' : 'text-blue-600'
            }`
          }
        >
          <img src="/logo.svg" alt="logo" className="h-8 w-8" />
          ApiShop
        </NavLink>

        {/* Nav */}
        <nav className="hidden sm:flex gap-6 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? activeClass : inactiveClass}`
            }
            aria-current="page"
          >
            Accueil
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? activeClass : inactiveClass}`
            }
          >
            Produits
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? activeClass : inactiveClass}`
            }
          >
            Mes commandes
          </NavLink>
        </nav>

        {/* Icons à droite */}
        <div className="flex items-center gap-4 relative">
          {/* Panier */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? 'text-blue-600' : ''}`
            }
          >
            <ShoppingCart className="w-6 h-6" />
          </NavLink>

          {/* Utilisateur */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="text-gray-700 hover:text-blue-600"
                aria-haspopup="true"
                aria-expanded={open}
              >
                <User className="w-6 h-6" />
              </button>

              {open && (
                <div
                  className="absolute right-0 top-9 bg-white border shadow rounded p-3 w-48 z-10"
                  role="menu"
                >
                  <p className="text-sm font-medium mb-1">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">{user.role}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                    role="menuitem"
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
