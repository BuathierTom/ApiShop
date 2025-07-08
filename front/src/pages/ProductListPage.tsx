import { useEffect, useState } from 'react';
import type { ProductDto } from '../types/Product';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header.tsx';


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
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Produits disponibles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductListPage;