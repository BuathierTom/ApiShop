import type { ProductDto } from '../types/Product';

const ProductCard = ({ product }: { product: ProductDto }) => {
  const placeholder = 'https://placehold.co/300x200?text=Image+non+disponible';

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.imageUrl || placeholder}
        alt={product.name}
        className="w-full h-48 object-cover mb-2 rounded"
        onError={(e) => {
          (e.target as HTMLImageElement).src = placeholder;
        }}
      />
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-500 mb-1">{product.price.toFixed(2)} €</p>
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2">
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProductCard;
