import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, CreditCard, Inbox, Mail, Phone, UserRound } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUserId } from '../api/order';

interface OrderSummary {
  id: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  itemsCount: number;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const statusBadgeClass = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes('pending') || normalized.includes('en cours')) {
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }
  if (normalized.includes('completed') || normalized.includes('livré') || normalized.includes('terminé')) {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  }
  if (normalized.includes('cancel') || normalized.includes('annulé')) {
    return 'border-red-200 bg-red-50 text-red-600';
  }
  return 'border-slate-200 bg-slate-100 text-slate-600';
};

const ProfilePage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
      try {
        const data = await getOrdersByUserId(user.id);
        const summaries = data.map((order) => ({
          id: order.id,
          createdAt: order.createdAt,
          totalPrice: order.totalPrice,
          status: order.status,
          itemsCount: order.items.length,
        }));
        setOrders(summaries);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Impossible de récupérer vos commandes pour le moment.');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const metrics = useMemo(() => {
    if (!orders.length) {
      return {
        totalOrders: 0,
        totalSpent: 0,
        averageBasket: 0,
        lastOrderDate: null as string | null,
      };
    }

    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const averageBasket = totalSpent / totalOrders;
    const lastOrderDate = orders
      .map((order) => new Date(order.createdAt))
      .sort((a, b) => b.getTime() - a.getTime())[0]
      .toISOString();

    return { totalOrders, totalSpent, averageBasket, lastOrderDate };
  }, [orders]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-20">
        <section className="glass-panel mt-10 px-6 py-10 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-semibold text-white shadow-lg shadow-slate-200/70"
                style={{ backgroundImage: 'linear-gradient(135deg, #8b87ee 0%, #f9c97d 100%)' }}
              >
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
              <div>
                <p className="chip text-baseline text-brand">Profil utilisateur</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Retrouvez ici vos informations personnelles et vos commandes récentes.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 text-sm text-slate-600 shadow-lg shadow-slate-200/70">
                <p className="text-xs uppercase tracking-wide text-slate-400">Total commandes</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{metrics.totalOrders}</p>
                <p className="text-xs text-slate-500">Depuis votre inscription</p>
              </div>
              <div className="rounded-2xl bg-white p-5 text-sm text-slate-600 shadow-lg shadow-slate-200/70">
                <p className="text-xs uppercase tracking-wide text-slate-400">Montant total</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{metrics.totalSpent.toFixed(2)} €</p>
                <p className="text-xs text-slate-500">
                  Panier moyen : {metrics.averageBasket.toFixed(2)} €
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[1.1fr,1fr]">
          <div className="glass-panel p-6 md:p-10">
            <h2 className="text-xl font-semibold text-slate-900">Informations personnelles</h2>
            <p className="mt-2 text-sm text-slate-600">
              Ces données proviennent de votre compte ApiShop. Contactez le support si vous souhaitez les
              modifier.
            </p>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-md shadow-slate-200/60">
                <div className="flex items-center gap-3 text-slate-600">
                  <UserRound className="h-4 w-4 text-brand" />
                  <span>Nom complet</span>
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-md shadow-slate-200/60">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="h-4 w-4 text-brand" />
                  <span>Email</span>
                </div>
                <p className="mt-2 font-semibold text-slate-900">{user.email}</p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-md shadow-slate-200/60">
                <div className="flex items-center gap-3 text-slate-600">
                  <CreditCard className="h-4 w-4 text-brand" />
                  <span>Rôle</span>
                </div>
                <p className="mt-2 font-semibold capitalize text-slate-900">{user.role}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 shadow-inner shadow-white">
                <p className="font-medium text-slate-700">Besoin de mettre à jour vos coordonnées ?</p>
                <p className="text-xs text-slate-500">
                  Contactez notre équipe support par email ou via Slack pour toute modification de profil.
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  <a
                    href="mailto:support@apishop.io"
                    className="chip text-brand"
                  >
                    support@apishop.io
                  </a>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-500">
                    <Phone className="h-3.5 w-3.5 text-brand" />
                    +33 1 23 45 67 89
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 md:p-10">
            <h2 className="text-xl font-semibold text-slate-900">Récapitulatif commandes</h2>

            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-brand" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Dernière commande</p>
                  <p className="font-semibold text-slate-900">
                    {metrics.lastOrderDate ? formatDate(metrics.lastOrderDate) : '—'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Inbox className="h-5 w-5 text-brand" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Articles achetés</p>
                  <p className="font-semibold text-slate-900">
                    {orders.reduce((sum, order) => sum + order.itemsCount, 0)}
                  </p>
                </div>
              </div>
            </div>

            <Link to="/orders" className="mt-8 inline-flex items-center text-sm font-semibold text-brand transition hover:opacity-80">
              Voir toutes mes commandes
            </Link>
          </div>
        </section>

        <section className="glass-panel p-6 md:p-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">Commandes récentes</h2>
            <Link to="/orders" className="text-sm font-semibold text-brand transition hover:opacity-80">
              Accéder à l’historique complet
            </Link>
          </div>

          {loading ? (
            <div className="mt-6 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-20 rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-500">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <p className="mt-6 text-sm text-slate-600">
              Vous n’avez pas encore passé de commande. Parcourez notre catalogue pour trouver vos prochains produits.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.slice(0, 4).map((order) => (
                <article
                  key={order.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-md shadow-slate-200/70"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">Commande</p>
                    <p className="font-semibold text-slate-900">
                      #{order.id.substring(0, 10).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">Date</p>
                    <p className="font-semibold text-slate-900">{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">Montant</p>
                    <p className="font-semibold text-slate-900">{order.totalPrice.toFixed(2)} €</p>
                  </div>
                  <div className={`chip text-xs ${statusBadgeClass(order.status)}`}>
                    {order.status}
                  </div>
                  <Link to={`/orders/${order.id}`} className="text-sm font-semibold text-brand transition hover:opacity-80">
                    Détails
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
