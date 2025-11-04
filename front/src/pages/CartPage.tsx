import { Link } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/order';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { clearCart } from '../api/cart';

const fallbackImage = 'https://placehold.co/240x240?text=ApiShop';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, refreshCart } = useCart();
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      return;
    }

    try {
      await createOrder(user.id, items);
      await clearCart(user.id);
      await refreshCart();
      toast.success('Commande validée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la commande :', error);
      toast.error('La commande a échoué, veuillez réessayer.');
    }
  };

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const hasItems = items.length > 0;

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-20">
        <section className="glass-panel mt-10 px-6 py-10 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="chip text-brand">Votre sélection</span>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">Panier</h1>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Ajustez les quantités ou retirez des éléments avant la validation. Toutes les informations
                sont synchronisées avec votre compte ApiShop.
              </p>
            </div>
            <div className="rounded-2xl bg-white px-6 py-5 text-slate-700 shadow-lg shadow-slate-200/70">
              <p className="text-xs uppercase tracking-wide text-slate-400">Total du panier</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{total.toFixed(2)} €</p>
              <p className="text-xs text-slate-500">{items.length} article(s)</p>
            </div>
          </div>
        </section>

        {!hasItems ? (
          <section className="glass-panel flex flex-col items-center gap-5 px-8 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl shadow-lg shadow-slate-200/80">
              🛒
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">Votre panier est vide</h2>
            <p className="text-sm text-slate-600">
              Parcourez le catalogue pour ajouter vos premiers produits.
            </p>
            <Link to="/products" className="neon-button">
              Explorer les produits
            </Link>
          </section>
        ) : (
          <section className="flex flex-col gap-8 xl:flex-row">
            <div className="flex-1 space-y-5">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-lg shadow-slate-200/70 transition hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <img
                        src={item.product.imageUrl || fallbackImage}
                        alt={item.product.name}
                        className="h-full w-full object-contain"
                        onError={(event) => {
                          (event.target as HTMLImageElement).src = fallbackImage;
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <h3 className="text-lg font-semibold text-slate-900">{item.product.name}</h3>
                      <p className="text-xs uppercase tracking-wide text-slate-400">{item.product.categoryId}</p>
                      <p className="text-sm text-slate-600">
                        {item.product.description || 'Produit sélectionné pour ses performances.'}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="self-start rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:border-red-400/60 hover:text-red-200"
                    >
                      Retirer
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">Quantité</p>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          onClick={async () => await updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 transition hover:border-[color:var(--color-brand-soft)]"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2rem] text-center text-base font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={async () => await updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 transition hover:border-[color:var(--color-brand-soft)]"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Sous-total</p>
                      <p className="mt-1 text-xl font-semibold text-slate-900">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="w-full xl:w-96">
              <div className="glass-panel sticky top-28 flex flex-col gap-5 p-8">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Récapitulatif</h2>
                  <p className="text-sm text-slate-600">
                    Vérifiez les montants avant validation. La livraison est offerte.
                  </p>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Sous-total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Livraison</span>
                    <span className="text-brand">Offerte</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Taxes</span>
                    <span>Incluses</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>

                <button onClick={handleCheckout} className="neon-button w-full justify-center">
                  Valider la commande
                </button>

                <p className="text-center text-xs text-slate-500">
                  La commande apparaîtra dans votre historique dès validation.
                </p>

                <Link
                  to="/products"
                  className="text-center text-xs font-semibold text-slate-500 transition hover:text-brand"
                >
                  Continuer les achats
                </Link>
              </div>
            </aside>
          </section>
        )}
      </main>
    </>
  );
};

export default CartPage;
