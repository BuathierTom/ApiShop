# ApiShop

`ApiShop` est une application e-commerce complète composée d’une API REST back-end en ASP.NET Core (C#) et d’un front-end React/TypeScript.

## 📂 Structure du projet

```
ApiShop.sln
├── back/
│   ├── ApiShop.Business/        ← Logique métier (services)
│   ├── ApiShop.Common/          ← Objets partagés (DTO, DAO, Requests)
│   ├── ApiShop.DataAccess/      ← Accès base de données (repositories, migrations)
│   └── ApiShop.WebApi/          ← API principale (controllers, Program.cs)
├── front/
│   ├── public/                 
│   └── src/
│       ├── api/                
│       ├── components/        
│       ├── context/            
│       ├── hooks/              
│       ├── pages/              
│       ├── types/              
│       ├── App.tsx             
│       ├── index.css           
│       ├── main.tsx            
│       └── vite.config.ts      
```

## 🚀 Fonctionnalités Back-End

### 👤 Utilisateurs

* Inscription
* Connexion sécurisée
* Rôle par défaut : `Client`
* Promotion d’utilisateur

### 🛍️ Produits

* CRUD complet (`GET`, `POST`, `PUT`, `DELETE`)
* Filtrage par catégorie

### 📂 Catégories

* CRUD catégories
* Gestion de catégories parent/enfant

### 🛒 Panier

* Ajout, modification quantité, suppression

### 📦 Commandes

* Création commande avec articles
* Historique commandes par utilisateur
* Modification statut commande (`Pending`, `Paid`, etc.)

## 🛠️ Démarrage du Back-End

### Prérequis

* [.NET 9 SDK](https://dotnet.microsoft.com/download)
* PostgreSQL
* [EF Core CLI](https://learn.microsoft.com/ef/core/cli/dotnet)

```bash
dotnet tool install --global dotnet-ef
```

### Configuration connexion BDD

```bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:ApiShop" "Host=localhost;Port=5432;Database=ApiShop;Username=postgres;Password=yourPassword"
```

### Migration et lancement

```bash
dotnet ef database update -s ApiShop.WebApi
dotnet run --project ApiShop.WebApi
```

## ⚛️ Fonctionnalités Front-End (React + TypeScript)

* Pages produits, panier, commandes, authentification
* Gestion du panier en contexte React
* Composants UI avec TailwindCSS

## 🛠️ Démarrage du Front-End

### Prérequis

* [Node.js 20+](https://nodejs.org/en/download/)
* npm ou yarn

### Installer dépendances

```bash
cd front
npm install
```

### Lancer en mode dev

```bash
npm run dev
```

L’app est accessible sur `http://localhost:5173`.

## 🧩 Liens importants

* API (Swagger non déployé) : `https://api.apishop.buathier-tom.fr`
* Front-End React : `https://buathier-apishop.vercel.app/`

## 📦 Déploiement

* **Back-End**
  Déployé sur **Render** avec la base de données PostgreSQL hébergée sur **NeonDB**.

* **Front-End**
  Déployé sur **Vercel**, optimisé pour les performances et la distribution rapide.

## 📝 Notes

* Sécurité : Swagger désactivé en production (via `if (app.Environment.IsDevelopment())` dans `Program.cs`)
* Gestion des rôles pour admin back-office en développement (non intégré en prod)
* Base de données PostgreSQL avec migrations EF Core
