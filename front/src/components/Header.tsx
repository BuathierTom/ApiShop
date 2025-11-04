import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, ShoppingCart, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  const navItems = [
    { to: '/', label: 'Accueil', exact: true },
    { to: '/products', label: 'Produits' },
    { to: '/orders', label: 'Commandes' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <div className="mx-auto mt-6 w-full max-w-6xl px-4">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-lg shadow-slate-200/60 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-slate-600 transition hover:text-slate-900 sm:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Ouvrir le menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <NavLink
              to="/"
              className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
              onClick={() => setMobileOpen(false)}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundImage: 'linear-gradient(135deg, #8b87ee 0%, #a79df4 55%, #f9c97d 100%)' }}
              >
                <img src="/logo.svg" alt="ApiShop" className="h-5 w-5" />
              </span>
              <span>ApiShop</span>
            </NavLink>
          </div>

          <nav className="hidden items-center gap-3 sm:flex">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `nav-pill text-sm ${
                    isActive ? 'nav-active' : 'text-slate-500 hover:text-brand hover:bg-brand-tint'
                  }`
                }
                onClick={() => setMobileOpen(false)}
                end={to === '/'}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <NavLink
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-[color:var(--color-brand-soft)] hover:text-brand"
              onClick={() => setMobileOpen(false)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-full bg-brand px-1 text-xs font-semibold text-white">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Voir le panier</span>
            </NavLink>

            {user && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-[color:var(--color-brand-soft)] hover:text-brand"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Ouvrir le menu utilisateur</span>
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 top-12 w-56 rounded-xl border border-slate-200 bg-white/95 p-4 text-slate-700 shadow-xl shadow-slate-300/40 backdrop-blur-sm"
                    role="menu"
                  >
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-slate-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <span className="chip mt-1 text-[11px]">{user.role}</span>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => {
                        setProfileOpen(false);
                      }}
                      className="mb-3 inline-flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-[color:var(--color-brand-soft)] hover:text-brand"
                    >
                      Mon profil
                      <User className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="neon-button w-full justify-center text-xs"
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
      </div>

      {mobileOpen && (
        <div className="mx-auto mt-3 w-full max-w-6xl space-y-2 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-200/70 backdrop-blur-sm sm:hidden">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => {
                setMobileOpen(false);
              }}
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-brand-tint text-brand' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span
                    className={`nav-pill ${isActive ? 'nav-active' : ''}`}
                    style={{ padding: '0.35rem 0.95rem' }}
                  >
                    {label}
                  </span>
                  <span className={`text-xs ${isActive ? 'text-brand' : 'text-slate-400'}`}>›</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
