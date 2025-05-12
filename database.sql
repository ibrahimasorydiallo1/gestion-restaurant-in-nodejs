-- Création de la base de données
CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

-- Table des utilisateurs
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  role ENUM('admin', 'client') DEFAULT 'client',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des tables du restaurant
CREATE TABLE tables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seats INT NOT NULL,
  isAvailable BOOLEAN DEFAULT TRUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des réservations
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  numberOfPeople INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  note TEXT,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Table de liaison réservations-tables
CREATE TABLE reservation_tables (
  reservationId INT NOT NULL,
  tableId INT NOT NULL,
  PRIMARY KEY (reservationId, tableId),
  FOREIGN KEY (reservationId) REFERENCES reservations(id) ON DELETE CASCADE,
  FOREIGN KEY (tableId) REFERENCES tables(id) ON DELETE CASCADE
);

-- Table du menu
CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category ENUM('starter', 'main', 'dessert', 'drink') NOT NULL,
  image VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Créneaux d'ouverture (bonus)
CREATE TABLE opening_slots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_time DATETIME NOT NULL,
  duration INT NOT NULL, -- en minutes
  available BOOLEAN DEFAULT TRUE,
  comment TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Données initiales
INSERT INTO tables (seats) VALUES (2), (2), (4), (4), (4), (6), (6);

INSERT INTO menu_items (name, description, price, category) VALUES
('Salade César', 'Salade avec poulet grillé, croûtons et sauce césar', 8.50, 'starter'),
('Bruschetta', 'Pain grillé avec tomates, ail et basilic', 7.00, 'starter'),
('Steak frites', 'Steak de bœuf avec frites maison', 16.50, 'main'),
('Poulet rôti', 'Poulet rôti avec légumes de saison', 14.00, 'main'),
('Tiramisu', 'Dessert italien au café et mascarpone', 6.50, 'dessert'),
('Mousse au chocolat', 'Mousse légère au chocolat noir', 5.50, 'dessert'),
('Eau minérale', 'Bouteille 50cl', 2.50, 'drink'),
('Vin rouge', 'Verre de vin rouge de la maison', 4.00, 'drink');

-- Compte admin de test
INSERT INTO users (email, password, firstName, lastName, phone, role) VALUES
('admin@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.M4q3z3Y7JiOiL3d5XZ3Qr1h7W2QYyO2', 'Admin', 'User', '0123456789', 'admin');
-- Mot de passe: admin123