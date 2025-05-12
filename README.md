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
git clone [URL_DU_REPO]
cd [NOM_DU_DOSSIER]
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
- Copier le fichier `.env.example` en `.env`
- Modifier les variables selon votre configuration

4. Créer la base de données :
```sql
CREATE DATABASE restaurant_db;
```

5. Lancer l'application :
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
  "email": "client@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
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
- Mise en place de la base de données
- Gestion des utilisateurs et authentification
- Documentation technique
- Tests et déploiement

### Ibrahima Sory Diallo
- Gestion des réservations
- Système de validation des réservations
- Gestion des tables
- Tests des fonctionnalités de réservation

### Abdou Latif Niabaly
- Gestion du menu
- Interface de consultation du menu
- Système de catégorisation des plats
- Tests des fonctionnalités du menu

## Messages d'erreur en français

L'API renvoie les messages d'erreur suivants en français :

- Authentification :
  - "Email déjà enregistré"
  - "Identifiants invalides"
  - "Authentification requise"
  - "Token invalide"
  - "Accès administrateur requis"

- Réservations :
  - "Pas assez de tables disponibles"
  - "Créneau déjà réservé"
  - "Réservation non trouvée"
  - "Non autorisé"
  - "Impossible de modifier une réservation confirmée ou annulée"
  - "Réservation annulée avec succès"
  - "Seules les réservations en attente peuvent être validées"

- Tables :
  - "La table doit avoir entre 2 et 6 places"
  - "Table non trouvée"
  - "Table supprimée avec succès"

- Menu :
  - "Plat non trouvé"
  - "Plat supprimé avec succès"

## Tests

Pour exécuter les tests :
```bash
npm test
```

## Déploiement

1. Configurer les variables d'environnement de production
2. Construire l'application :
```bash
npm run build
```
3. Démarrer en production :
```bash
npm start
```

## Licence

Ce projet est sous licence MIT.

# Configuration de la base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=restaurant_db

# Configuration du serveur
PORT=3000

# Clé secrète pour JWT
JWT_SECRET=votre_cle_secrete_super_securisee_pour_jwt 