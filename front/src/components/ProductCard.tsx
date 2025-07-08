import type { ProductDto } from '../types/Product';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }: { product: ProductDto }) => {
  const { addToCart } = useCart();
  const placeholder = 'https://placehold.co/300x200?text=Image+non+disponible';

  const handleAddToCart = async () => {
    try {
      await addToCart(product);
      toast.success(`${product.name} ajouté au panier`);
    } catch {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-800 flex flex-col">
      <img
        src={product.imageUrl || placeholder}
        alt={product.name}
        className="h-48 w-full object-contain rounded mb-4"
        onError={(e) => {
          (e.target as HTMLImageElement).src = placeholder;
        }}
      />

      <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{product.name}</h2>

      <p className="text-gray-600 dark:text-gray-300 mb-4">{product.price.toFixed(2)} €</p>

      <button
        onClick={handleAddToCart}
        className="mt-auto w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProductCard;
