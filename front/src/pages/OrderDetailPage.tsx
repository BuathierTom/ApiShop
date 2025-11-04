import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, CircleDollarSign, Package, ShoppingBasket } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import api from '../api/axios';
import type { OrderDto } from '../types/Order';

interface ProductMap {
  [productId: string]: string;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
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

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [productNames, setProductNames] = useState<ProductMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        const orderData: OrderDto = res.data;
        setOrder(orderData);

        const productMap: ProductMap = {};
        await Promise.all(
          orderData.items.map(async (item) => {
            try {
              const productRes = await api.get(`/products/${item.productId}`);
              productMap[item.productId] = productRes.data.name;
            } catch {
              productMap[item.productId] = 'Produit inconnu';
            }
          })
        );
        setProductNames(productMap);
      } catch (err) {
        console.error('Erreur de chargement de la commande', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const itemsTotal = useMemo(
    () => order?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
    [order]
  );

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-20">
        {loading ? (
          <section className="glass-panel h-72 animate-pulse" />
        ) : !order ? (
          <section className="glass-panel flex flex-col items-center gap-4 px-8 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500 shadow-lg shadow-slate-200/70">
              <Package className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">Commande introuvable</h1>
            <p className="text-sm text-slate-600">
              Nous n’avons pas pu retrouver cette commande. Elle a peut-être été archivée ou supprimée.
            </p>
            <Link to="/orders" className="neon-button">
              Retour aux commandes
            </Link>
          </section>
        ) : (
          <>
            <section className="glass-panel mt-10 px-6 py-10 md:px-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="chip text-xs font-semibold text-slate-600">
                    #{order.id.substring(0, 8).toUpperCase()}
                  </span>
                  <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">Détails de la commande</h1>
                  <p className="mt-2 max-w-xl text-sm text-slate-600">
                    Retrouvez le statut, le montant et la liste des produits associés à cette commande.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end">
                  <span className={`chip text-sm ${getStatusChipClass(order.status)}`}>{order.status}</span>
                  <div className="rounded-2xl bg-white px-5 py-4 text-slate-600 shadow-lg shadow-slate-200/70">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Créée le</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-8 md:grid-cols-[1.6fr,1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-lg shadow-slate-200/70">
                <header className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Produits commandés</h2>
                  <span className="chip text-xs font-semibold text-brand">{itemsTotal} article(s)</span>
                </header>

                <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full border-collapse text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                      <tr>
                        <th className="px-5 py-3">Produit</th>
                        <th className="px-5 py-3">Quantité</th>
                        <th className="px-5 py-3 text-right">Prix unitaire</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="px-5 py-3 font-medium text-slate-900">
                            {productNames[item.productId] || 'Produit en cours de chargement'}
                          </td>
                          <td className="px-5 py-3 text-slate-600">{item.quantity}</td>
                          <td className="px-5 py-3 text-right text-slate-600">
                            {item.unitPrice.toFixed(2)} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <aside className="glass-panel flex flex-col gap-5 p-6">
                <div className="flex items-center gap-3 text-slate-900">
                  <ShoppingBasket className="h-6 w-6 text-brand" />
                  <h2 className="text-lg font-semibold">Récapitulatif</h2>
                </div>

                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2">
                      <CircleDollarSign className="h-4 w-4 text-brand" />
                      Total
                    </span>
                    <span className="text-base font-semibold text-slate-900">
                      {order.totalPrice.toFixed(2)} €
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-brand" />
                      Date
                    </span>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2">
                      <Package className="h-4 w-4 text-brand" />
                      Articles
                    </span>
                    <span>{itemsTotal}</span>
                  </div>
                </div>

                <Link
                  to="/orders"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-brand"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour aux commandes
                </Link>
              </aside>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default OrderDetailPage;
