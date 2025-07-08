import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import type { OrderDto } from '../types/Order';
import Header from '../components/Header';

interface ProductMap {
  [productId: string]: string;
}

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

        // Fetch product names
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

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (!order) return <p className="text-center mt-10 text-red-500">Commande introuvable</p>;

  return (
    <>
      <Header />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6">Résumé de la commande</h1>

          <div className="mb-8 border-b border-t border-gray-200 py-6 dark:border-gray-700">
            <dl className="space-y-2">
              <div><strong className="text-gray-700 dark:text-gray-300">ID :</strong> <span className="text-gray-900 dark:text-white">{order.id}</span></div>
              <div><strong className="text-gray-700 dark:text-gray-300">Date :</strong> <span className="text-gray-900 dark:text-white">{new Date(order.createdAt).toLocaleDateString()}</span></div>
              <div><strong className="text-gray-700 dark:text-gray-300">Statut :</strong> <span className="text-gray-900 dark:text-white">{order.status}</span></div>
              <div><strong className="text-gray-700 dark:text-gray-300">Total :</strong> <span className="text-gray-900 dark:text-white">{order.totalPrice.toFixed(2)} €</span></div>
            </dl>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Produits commandés</h2>

          <div className="relative overflow-x-auto">
            <table className="w-full text-left font-medium text-gray-900 dark:text-white">
              <thead className="text-sm text-gray-700 uppercase dark:text-gray-400 border-b dark:border-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3">Produit</th>
                  <th scope="col" className="px-4 py-3">Quantité</th>
                  <th scope="col" className="px-4 py-3 text-right">Prix unitaire</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">{productNames[item.productId] || '...'}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">{item.unitPrice.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetailPage;
