import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Layers, MessageSquare, Radar, ShieldCheck, ShoppingCart, Truck } from 'lucide-react';
import Header from '../components/Header';

const highlights = [
  {
    title: 'Livraison maîtrisée',
    description: 'Expédition garantie sous 24/48 h avec suivi clair pour vos clients.',
    Icon: Truck,
  },
  {
    title: 'Paiement sécurisé',
    description: 'Intégration Stripe planifiée, SSO et chiffrement pour vos données.',
    Icon: ShieldCheck,
  },
  {
    title: 'Panier intelligent',
    description: 'Sauvegarde automatique, rappels de disponibilité et commandes rapides.',
    Icon: ShoppingCart,
  },
];

const modules = [
  {
    title: 'Catalogue modulable',
    description: 'Structure headless pour gérer produits, catégories et stocks depuis votre API .NET.',
    Icon: Layers,
  },
  {
    title: 'Pilotage en direct',
    description: 'Suivez les performances, paniers et commandes dans un tableau de bord réactif.',
    Icon: Radar,
  },
  {
    title: 'Base moderne',
    description: 'React 19, Vite et Tailwind 4 pour un front léger, maintenable et rapide.',
    Icon: Cpu,
  },
];

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-20">
        <section className="glass-panel mt-10 px-6 py-12 md:px-10 md:py-14">
          <div className="grid gap-12 md:grid-cols-[1.4fr,1fr] md:items-center">
            <div>
              <span className="chip text-brand">Une plateforme fiable</span>
              <h1 className="mt-6 text-4xl font-semibold text-slate-900 md:text-5xl">
                ApiShop, votre boutique en ligne prête à l’emploi
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
                Nous combinons le meilleur de .NET et de React pour offrir une expérience fluide aux
                équipes comme aux clients. Interface claire, parcours d’achat optimisé et outils de
                pilotage intégrés.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/products" className="neon-button">
                  Découvrir le catalogue
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/orders"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[color:var(--color-brand-soft)] hover:text-brand"
                >
                  Voir mes commandes
                </Link>
              </div>
            </div>

            <aside className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-6 text-sm text-slate-600 shadow-lg shadow-slate-200/70">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Disponibilité</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">99,9%</p>
                <p className="text-xs text-slate-500">Monitoring continu & mises à jour automatisées</p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">API unifiée</p>
                <p className="mt-1 text-base font-semibold text-slate-900">Gestion produits & commandes</p>
                <p className="text-xs text-slate-500">Endpoints documentés et prêts à intégrer</p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Support</p>
                <p className="mt-1 text-base font-semibold text-slate-900">Equipe dev à l’écoute</p>
                <p className="text-xs text-slate-500">Slack, email et retours produit rapides</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map(({ title, description, Icon }) => (
            <article key={title} className="glass-panel p-6">
              <div className="mb-4 inline-flex rounded-full bg-brand-tint p-3 text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </section>

        <section className="glass-panel px-6 py-10 md:px-10">
          <div className="md:flex md:items-start md:justify-between md:gap-12">
            <div className="max-w-xl">
              <span className="chip text-brand">Architecture ApiShop</span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
                Une base technique prête à faire grandir votre offre
              </h2>
              <p className="mt-4 text-sm text-slate-600 md:text-base">
                ApiShop vous donne une structure claire pour orchestrer vos produits, suivre vos ventes
                et offrir un parcours client sans friction. Exploitez notre front React ou branchez vos
                propres interfaces grâce à l’API.
              </p>
            </div>
            <div className="mt-10 grid flex-1 gap-6 md:mt-0">
              {modules.map(({ title, description, Icon }) => (
                <div key={title} className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600 shadow-lg shadow-slate-200/70">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-tint text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[1.2fr,1fr]">
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Un parcours simple de bout en bout</h2>
            <p className="mt-3 text-sm text-slate-600">
              Chaque écran a été pensé pour guider vos clients : identification rapide, catalogue clair,
              panier détaillé et suivi de commande accessible. Vous pouvez personnaliser le tout sans
              repartir de zéro.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-dot" />
                Connexion et inscription rapides pour vos utilisateurs.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-dot" />
                Fiches produits lisibles, prix clairs et stocks visibles.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-dot" />
                Panier récapitulatif, ajustements immédiats et validation sereine.
              </li>
            </ul>
          </div>

          <div className="glass-panel p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand">
              <MessageSquare className="h-5 w-5" />
              Contactez-nous
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900">Des questions sur ApiShop ?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Laissez votre message et notre équipe vous répondra rapidement pour vous accompagner dans
              vos intégrations ou vos idées d’évolution.
            </p>
            <form
              action="https://formspree.io/f/xldnybyw"
              method="POST"
              autoComplete="off"
              className="mt-6 space-y-4 text-sm"
            >
              <div>
                <label htmlFor="email" className="font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="vous@entreprise.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent-soft)]"
                />
              </div>
              <div>
                <label htmlFor="subject" className="font-medium text-slate-700">
                  Sujet
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Parlez-nous de votre projet"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent-soft)]"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Décrivez-nous vos besoins..."
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent-soft)]"
                />
              </div>
              <button type="submit" className="neon-button w-full justify-center">
                Envoyer
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
