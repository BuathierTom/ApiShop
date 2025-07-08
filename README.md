# ApiShop

`ApiShop` est une API REST en ASP.NET Core (C#), conçue pour gérer les fonctionnalités d’un site e-commerce : gestion des utilisateurs, des produits, des catégories, des paniers et des commandes.

## 📂 Structure du projet

```
ApiShop.sln
├── ApiShop.WebApi/           ← Entrée principale de l’API (controllers)
├── ApiShop.Business/         ← Logique métier (services)
├── ApiShop.DataAccess/       ← Requêtes base de données (repositories, EF Core)
├── ApiShop.Common/           ← Objets partagés (DTO, DAO, Requests)
└── ApiShop.WebApi.Tests/     ← Tests unitaires
```

## 🚀 Fonctionnalités disponibles

### 👤 Utilisateurs

* Inscription (`POST /api/auth/register`)
* Connexion sécurisée (`POST /api/auth/login`)
* Rôle par défaut : `Client`
* Promotion d’un utilisateur (`PATCH /api/users/{id}/promote`)

### 🛍️ Produits

* CRUD produits (`GET`, `POST`, `PUT`, `DELETE`)
* Filtrage par catégorie

### 📂 Catégories

* CRUD catégories
* Catégories parentes/enfants possibles

### 🛒 Panier

* Ajout d’article au panier
* Modification de quantité
* Suppression et vidage du panier

### 📦 Commandes

* Création d’une commande avec articles
* Historique par utilisateur
* Mise à jour du statut (`Pending`, `Paid`, etc.)

## ⚙️ Démarrage du projet Back-End

### ✅ Prérequis

* [.NET 9 SDK](https://dotnet.microsoft.com/download)
* PostgreSQL
* [EF Core CLI](https://learn.microsoft.com/ef/core/cli/dotnet) :

  ```bash
  dotnet tool install --global dotnet-ef
  ```

### 🔐 Configuration (connexion BDD)

Stockée dans les **secrets utilisateur** :

```bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:ApiShop" "Host=localhost;Port=5432;Database=ApiShop;Username=postgres;Password=yourPassword"
```

### 🧱 Appliquer la migration DB

```bash
dotnet ef database update -s ApiShop.WebApi
```

### ▶️ Lancer l’API

Depuis la racine :

```bash
dotnet run --project ApiShop.WebApi
```
