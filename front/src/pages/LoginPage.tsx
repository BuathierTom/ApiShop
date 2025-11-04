import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { Fingerprint, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const redirectLocation = (location.state as { from?: Location } | undefined)?.from;
  const redirectPath =
    redirectLocation !== undefined
      ? `${redirectLocation.pathname}${redirectLocation.search ?? ''}`
      : '/';

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data);
      toast.success('Connexion réussie.');
      navigate(redirectPath, { replace: true });
    } catch {
      toast.error('Identifiants invalides. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl space-y-8 md:space-y-0 md:space-x-10 md:flex md:items-center md:justify-between">
        <aside className="hidden h-full flex-1 flex-col justify-between rounded-2xl bg-white p-8 text-sm text-slate-600 shadow-xl shadow-slate-200/70 md:flex">
          <div>
            <p className="text-sm font-semibold text-brand">Bienvenue sur ApiShop</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900">
              Administrez votre boutique en toute sérénité.
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Accédez à vos commandes, gérez votre catalogue et suivez vos indicateurs clés depuis une
              interface claire.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <Fingerprint className="mt-1 h-5 w-5 text-brand" />
              <div>
                <h3 className="text-base font-semibold text-slate-900">Connexion sécurisée</h3>
                <p className="text-sm text-slate-600">
                  Les requêtes sont protégées par l’API .NET, vos données restent confidentielles.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 text-brand" />
              <div>
                <h3 className="text-base font-semibold text-slate-900">Support dédié</h3>
                <p className="text-sm text-slate-600">
                  Besoin d’aide ? L’équipe ApiShop est disponible pour vous accompagner.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="glass-panel flex-1 p-8 text-slate-700">
          <h2 className="text-2xl font-semibold text-slate-900">Connexion</h2>
          <p className="mt-2 text-sm text-slate-600">
            Entrez vos identifiants pour retrouver votre espace ApiShop.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                placeholder="vous@apishop.io"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent-soft)]"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent-soft)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`neon-button w-full justify-center ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-500">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-brand underline decoration-dotted underline-offset-4">
              Créez un accès ApiShop
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
