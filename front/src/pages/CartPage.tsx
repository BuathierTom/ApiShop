import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import { Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { items, removeFromCart } = useCart();

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Votre panier
          </h2>

          {items.length === 0 ? (
            <p className="mt-6 text-gray-600 dark:text-gray-300">
              Votre panier est vide.
            </p>
          ) : (
            <div className="mt-6 flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-8">
              {/* Liste des articles */}
              <div className="w-full space-y-6 xl:max-w-4xl">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="md:flex md:items-center md:justify-between md:gap-6 space-y-4 md:space-y-0">
                      {/* Image */}
                      <div className="shrink-0">
                        <img
                          src={
                            item.product.imageUrl ||
                            'https://placehold.co/100x100?text=Image'
                          }
                          alt={item.product.name}
                          className="h-20 w-20 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://placehold.co/100x100?text=Image';
                          }}
                        />
                      </div>

                      {/* Infos produit */}
                      <div className="flex-1 min-w-0 space-y-2 md:max-w-md">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.product.description || 'Aucune description'}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Prix unitaire : {item.product.price.toFixed(2)} €
                        </p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Quantité : {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          Total : {(item.product.price * item.quantity).toFixed(2)} €
                        </p>
                      </div>

                      {/* Bouton suppression */}
                      <div className="md:w-32 text-end">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          <Trash size={18} className="mr-1.5" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Résumé de commande */}
              <div className="w-full space-y-6 xl:w-96">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Récapitulatif
                  </h3>

                  <div className="flex justify-between text-base mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Sous-total</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {total.toFixed(2)} €
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 border-b pb-4 mb-4">
                    <span>Frais de livraison</span>
                    <span>Offerts</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>

                <button className="mt-6 w-full rounded-lg bg-green-600 hover:bg-green-700 px-5 py-2.5 text-sm font-medium text-white">
                Valider la commande
                </button>

                  <div className="mt-4 flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    ou
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-1 text-primary-700 underline hover:no-underline dark:text-primary-500"
                    >
                      Continuer vos achats
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l7-7-7-7M2 12h20"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CartPage;
