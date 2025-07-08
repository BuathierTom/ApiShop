import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { ShieldCheck, Truck, ShoppingCart } from 'lucide-react';

const HomePage = () => {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Bienvenue sur <span className="text-blue-600">ApiShop</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Votre boutique en ligne simple, rapide et sécurisée.
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg transition"
        >
          Voir les produits
        </Link>
      </section>

      {/* Avantages */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <Truck className="mx-auto mb-2 text-blue-600" size={32} />
            <h3 className="font-semibold text-lg">Livraison rapide</h3>
            <p className="text-sm text-gray-500">Expédié sous 24/48h partout en France</p>
          </div>
          <div>
            <ShieldCheck className="mx-auto mb-2 text-blue-600" size={32} />
            <h3 className="font-semibold text-lg">Paiement sécurisé</h3>
            <p className="text-sm text-gray-500">Cryptage SSL & support Stripe à venir</p>
          </div>
          <div>
            <ShoppingCart className="mx-auto mb-2 text-blue-600" size={32} />
            <h3 className="font-semibold text-lg">Panier intelligent</h3>
            <p className="text-sm text-gray-500">Sauvegarde automatique et commandes rapides</p>
          </div>
        </div>
      </section>
      {/* Pourquoi ApiShop */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Pourquoi choisir ApiShop ?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            <div className="bg-white rounded shadow p-6 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Expérience fluide</h3>
              <p className="text-gray-600 text-sm">
                Grâce à une interface claire et rapide, achetez en toute simplicité depuis votre mobile ou PC.
              </p>
            </div>

            <div className="bg-white rounded shadow p-6 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Performances optimisées</h3>
              <p className="text-gray-600 text-sm">
                ApiShop repose sur une API .NET performante et un front React moderne.
              </p>
            </div>

            <div className="bg-white rounded shadow p-6 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Support développeur</h3>
              <p className="text-gray-600 text-sm">
                Pensé par et pour les développeurs : transparent, simple à maintenir, prêt à évoluer.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-12 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contactez-nous
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Une question ? Un bug ? Une idée ? Laissez-nous un message, nous vous répondrons rapidement.
          </p>

          <form
            action="https://formspree.io/f/xldnybyw"
            method="POST"
            className="space-y-8"
            autoComplete="off"
          >
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Votre email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="nom@exemple.com"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="Parlez-nous de votre besoin"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Votre message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Laissez votre message ici..."
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </section>

    </>
  );
};

export default HomePage;
