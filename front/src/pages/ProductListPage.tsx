import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';
import type { ProductDto } from '../types/Product';

const ProductListPage = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => setError('Impossible de récupérer les produits pour le moment.'))
      .finally(() => setLoading(false));
  }, []);

  const { totalStock, availableProducts } = useMemo(() => {
    if (!products.length) {
      return { totalStock: 0, availableProducts: 0 };
    }
    const stock = products.reduce((sum, product) => sum + product.stock, 0);
    const available = products.filter((product) => product.stock > 0).length;
    return { totalStock: stock, availableProducts: available };
  }, [products]);

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-20">
        <section className="glass-panel mt-10 px-6 py-12 md:px-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1.5fr,1fr] md:items-center">
            <div>
              <span className="chip mb-4 text-brand">Catalogue ApiShop</span>
              <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                Découvrez nos produits disponibles
              </h1>
              <p className="mt-4 text-sm text-slate-600 md:text-base">
                Produits pilotés depuis l’API .NET, stocks à jour et fiches claires. Ajoutez les articles
                à votre panier et finalisez votre commande en quelques clics.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 text-slate-700 shadow-lg shadow-slate-200/70">
                <p className="text-xs uppercase tracking-wide text-slate-400">Produits listés</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{products.length}</p>
                <p className="text-xs text-slate-500">Synchronisé avec l’API</p>
              </div>
              <div className="rounded-2xl bg-white p-5 text-slate-700 shadow-lg shadow-slate-200/70">
                <p className="text-xs uppercase tracking-wide text-slate-400">Disponibilités</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">
                  {availableProducts} / {products.length} en stock
                </p>
                <p className="text-xs text-slate-500 mt-1">Stocks cumulés : {totalStock}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel p-6 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Sélection ApiShop</h2>
              <p className="text-sm text-slate-600">
                Ajoutez les produits à votre panier intelligent et retrouvez-les instantanément dans vos
                commandes.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading && (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-80 rounded-2xl bg-slate-100 animate-pulse"
                  />
                ))}
              </>
            )}

            {!loading && error && (
              <div className="col-span-full rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-500">
                {error}
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="col-span-full rounded-2xl bg-slate-50 p-10 text-center text-sm text-slate-600">
                Aucun produit n’est disponible pour le moment. Revenez bientôt pour de nouvelles sorties.
              </div>
            )}

            {!loading &&
              !error &&
              products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductListPage;
