import { useEffect, useState } from 'react';
import type { ProductDto } from '../types/Product';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

const ProductListPage = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Header />
      <section className="py-8 antialiased dark:bg-gray-900 md:py-12 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Produits disponibles</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListPage;
