import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, FolderClosed } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUserId } from '../api/order';

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: string;
  userId: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  items: OrderItem[];
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const getStatusChipClass = (status: string) => {
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

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const data = await getOrdersByUserId(user.id);
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Impossible de récupérer vos commandes pour le moment.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const { totalSpent, lastOrderDate } = useMemo(() => {
    if (!orders.length) {
      return { totalSpent: 0, lastOrderDate: null as string | null };
    }
    const sorted = [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const total = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    return { totalSpent: total, lastOrderDate: sorted[0].createdAt };
  }, [orders]);

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-20">
        <section className="glass-panel mt-10 px-6 py-10 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="chip text-brand">Historique de commandes</span>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">Vos commandes ApiShop</h1>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Retrouvez ici toutes vos commandes au même endroit. Accédez aux détails, suivez les statuts
                et consultez rapidement votre historique.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 text-slate-700 shadow-lg shadow-slate-200/70">
                <p className="text-xs uppercase tracking-wide text-slate-400">Commandes</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{orders.length}</p>
                <p className="text-xs text-slate-500">Total enregistré dans ApiShop</p>
              </div>
              <div className="rounded-2xl bg-white p-5 text-slate-700 shadow-lg shadow-slate-200/70">
                <p className="text-xs uppercase tracking-wide text-slate-400">Montant cumulé</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{totalSpent.toFixed(2)} €</p>
                <p className="text-xs text-slate-500">
                  Dernière commande : {lastOrderDate ? formatDate(lastOrderDate) : '—'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel p-6 md:p-10">
          {loading && (
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-28 rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="glass-panel flex flex-col items-center gap-4 px-8 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500 shadow-lg shadow-slate-200/70">
                <FolderClosed className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">Aucune commande pour le moment</h2>
              <p className="text-sm text-slate-600">
                Passez une commande depuis le catalogue pour la voir apparaître ici.
              </p>
              <Link to="/products" className="neon-button">
                Explorer le catalogue
              </Link>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="space-y-5">
              {orders
                .slice()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((order) => (
                  <article
                    key={order.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-lg shadow-slate-200/70 transition hover:-translate-y-1"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="chip text-xs font-semibold text-slate-600">
                        #{order.id.substring(0, 8).toUpperCase()}
                      </span>
                      <span className={`chip text-xs ${getStatusChipClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">Date</p>
                        <p className="text-base font-semibold text-slate-900">{formatDate(order.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">Total</p>
                        <p className="text-base font-semibold text-slate-900">{order.totalPrice.toFixed(2)} €</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
                        <Clock className="h-4 w-4 text-brand" />
                        {order.items.length} article(s)
                      </div>
                    </div>
                    <Link to={`/orders/${order.id}`} className="neon-button w-max">
                      Consulter les détails
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

export default OrdersPage;
