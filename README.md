# API de Réservation de Restaurant

Cette API REST permet de gérer les réservations d'un restaurant, son menu, et ses tables. Elle est construite avec Node.js, Express et MySQL.

## Fonctionnalités

- Authentification des utilisateurs (clients et administrateurs)
- Gestion des réservations
- Consultation du menu
- Gestion des tables
- Système de rôles (client/admin)

## Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v8 ou supérieur)
- npm ou yarn

## Installation

1. Cloner le repository :
```bash
git clone "https://github.com/ibrahimasorydiallo1/gestion-restaurant-in-nodejs.git"
cd "gestion-restaurant-in-nodejs"
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer l'application :
```bash
npm run dev
```

## Routes de l'API

### Authentification

- `POST /api/auth/signup` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/me` - Obtenir les informations de l'utilisateur connecté

### Réservations

- `GET /api/reservations` - Liste des réservations (admin)
- `GET /api/reservations/my-reservations` - Mes réservations (client)
- `POST /api/reservations` - Créer une réservation
- `PUT /api/reservations/:id` - Modifier une réservation
- `DELETE /api/reservations/:id` - Annuler une réservation
- `PATCH /api/reservations/:id/validate` - Valider une réservation (admin)

### Menu

- `GET /api/menu` - Consulter le menu
- `POST /api/menu` - Ajouter un plat (admin)
- `PUT /api/menu/:id` - Modifier un plat (admin)
- `DELETE /api/menu/:id` - Supprimer un plat (admin)

### Tables

- `GET /api/tables` - Liste des tables (admin)
- `POST /api/tables` - Ajouter une table (admin)
- `PUT /api/tables/:id` - Modifier une table (admin)
- `DELETE /api/tables/:id` - Supprimer une table (admin)
- `PATCH /api/tables/:id/toggle` - Basculer la disponibilité d'une table (admin)

## Exemples de requêtes

### Création d'un compte
```json
POST /api/auth/signup
{
  "email": "test@example.com",
  "password": "test123",
  "firstName": "test",
  "lastName": "test",
  "phone": "0123456789"
}
```

### Création d'une réservation
```json
POST /api/reservations
{
  "numberOfPeople": 4,
  "date": "2024-03-20",
  "time": "19:30",
  "note": "Table près de la fenêtre si possible"
}
```

### Ajout d'un plat au menu
```json
POST /api/menu
{
  "name": "Salade César",
  "description": "Laitue romaine, poulet grillé, parmesan, croûtons",
  "price": 12.50,
  "category": "entree"
}
```

## Structure de la base de données

### Users
- id (INT, PK)
- email (VARCHAR)
- password (VARCHAR)
- firstName (VARCHAR)
- lastName (VARCHAR)
- phone (VARCHAR)
- role (ENUM: 'client', 'admin')

### Reservations
- id (INT, PK)
- userId (INT, FK)
- numberOfPeople (INT)
- date (DATE)
- time (TIME)
- status (ENUM: 'pending', 'confirmed', 'cancelled')
- note (TEXT)

### Tables
- id (INT, PK)
- seats (INT)
- isAvailable (BOOLEAN)

### MenuItems
- id (INT, PK)
- name (VARCHAR)
- description (TEXT)
- price (DECIMAL)
- category (ENUM: 'entree', 'plat', 'dessert', 'boisson')
- image (VARCHAR)

## Répartition des tâches

### El Hadji Amadou Gaye
- Configuration initiale du projet
- Gestion des utilisateurs et authentification
- Système de catégorisation des plats
- Gestion des tables

### Ibrahima Sory Diallo
- Configuration initiale du projet
- Gestion des réservations
- Système de validation des réservations
- Gestion des tables
- Tests des fonctionnalités de réservation

### Abdou Latif Niabaly
- Gestion du menu
- Mise en place de la base de données
- Documentation technique et fonctionnel
- Tests des fonctionnalités du menu

## Tests

Pour exécuter les tests :
```bash
npm test
```


# Configuration de la base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=restaurant_db

# Configuration du serveur
PORT=3000
