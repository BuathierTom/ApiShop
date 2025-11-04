import type { ProductDto } from '../types/Product';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductCard = ({ product }: { product: ProductDto }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const placeholder = 'https://placehold.co/300x200?text=Image+non+disponible';
  const isAvailable = product.stock > 0;

  const handleAddToCart = async () => {
    if (!user) {
      toast.info('Connectez-vous pour ajouter des produits au panier.');
      navigate('/login', { state: { from: location } });
      return;
    }

    try {
      await addToCart(product);
      toast.success(`${product.name} ajouté au panier`);
    } catch {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <article className="group flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:border-[color:var(--color-brand-soft)]">
      <div className="flex items-center justify-between text-sm">
        <span className="chip">
          {isAvailable ? `${product.stock} en stock` : 'Bientôt'}
        </span>
        <span
          className="rounded-full px-3 py-1 font-semibold text-brand"
          style={{ border: '1px solid var(--color-brand-soft)', backgroundColor: 'var(--color-brand-tint)' }}
        >
          {product.price.toFixed(2)} €
        </span>
      </div>

      <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
        <img
          src={product.imageUrl || placeholder}
          alt={product.name}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholder;
          }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          {product.description || 'Un produit sélectionné pour ses performances et sa fiabilité.'}
        </p>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!isAvailable}
        className={`neon-button w-full justify-center ${!isAvailable ? 'cursor-not-allowed opacity-40' : ''}`}
      >
        {isAvailable ? 'Ajouter au panier' : 'En rupture'}
      </button>
    </article>
  );
};

export default ProductCard;
