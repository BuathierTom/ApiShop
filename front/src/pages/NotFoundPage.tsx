import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="glass-panel flex w-full max-w-lg flex-col items-center gap-4 px-8 py-12 text-center">
        <span className="text-sm font-semibold text-brand">Erreur 404</span>
        <h1 className="text-3xl font-semibold text-slate-900">Page introuvable</h1>
        <p className="text-sm text-slate-600">
          La page que vous recherchez n’existe plus ou a été déplacée. Revenez à la page précédente ou
          retrouvez l’accueil ApiShop.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[color:var(--color-brand-soft)] hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>
          <Link to="/" className="neon-button justify-center">
            Revenir à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
