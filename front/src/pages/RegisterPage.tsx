import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IdCard, Rocket } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      await api.post('/auth/register', form);
      toast.success('Votre compte ApiShop est prêt. Connectez-vous dès maintenant.');
      navigate('/login');
    } catch {
      toast.error("Impossible de créer le compte pour l'instant. Réessayez plus tard.");
    } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl space-y-8 md:space-y-0 md:space-x-10 md:flex md:items-center md:justify-between">
        <aside className="hidden h-full flex-1 flex-col justify-between rounded-2xl bg-white p-8 text-sm text-slate-600 shadow-xl shadow-slate-200/70 md:flex">
          <div>
            <p className="text-sm font-semibold text-brand">Rejoignez ApiShop</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900">
              Lancez votre boutique avec un socle moderne.
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Créez un compte pour configurer votre catalogue, inviter des collaborateurs et suivre vos
              commandes en temps réel.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <IdCard className="mt-1 h-5 w-5 text-brand" />
              <div>
                <h3 className="text-base font-semibold text-slate-900">Profil marchand clair</h3>
                <p className="text-sm text-slate-600">
                  Centralisez vos informations et gérez vos accès rapidement.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Rocket className="mt-1 h-5 w-5 text-brand" />
              <div>
                <h3 className="text-base font-semibold text-slate-900">Une base prête à évoluer</h3>
                <p className="text-sm text-slate-600">
                  Connectez vos intégrations ou personnalisez le front selon vos besoins.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="glass-panel flex-1 p-8 text-slate-700">
          <h2 className="text-2xl font-semibold text-slate-900">Créer un compte</h2>
          <p className="mt-2 text-sm text-slate-600">
            Renseignez vos informations pour activer votre espace ApiShop.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                  Prénom
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Ada"
                  value={form.firstName}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent-soft)]"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                  Nom
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Lovelace"
                  value={form.lastName}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent-soft)]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email professionnel
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="vous@apishop.io"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent-soft)]"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent-soft)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`neon-button w-full justify-center ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              {loading ? 'Création en cours...' : 'Créer le compte'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-500">
            Déjà inscrit ?{' '}
            <Link to="/login" className="text-brand underline decoration-dotted underline-offset-4">
              Se connecter
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
