-- Création de la base de données
CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role ENUM('client', 'admin') DEFAULT 'client',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des tables
CREATE TABLE IF NOT EXISTS tables (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seats INT NOT NULL CHECK (seats BETWEEN 2 AND 6),
    isAvailable BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des réservations
CREATE TABLE IF NOT EXISTS reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    numberOfPeople INT NOT NULL CHECK (numberOfPeople > 0),
    date DATE NOT NULL,
    time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    note TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Table des éléments du menu
CREATE TABLE IF NOT EXISTS menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    category ENUM('entree', 'plat', 'dessert', 'boisson') NOT NULL,
    image VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table de liaison entre réservations et tables
CREATE TABLE IF NOT EXISTS reservation_tables (
    reservationId INT NOT NULL,
    tableId INT NOT NULL,
    PRIMARY KEY (reservationId, tableId),
    FOREIGN KEY (reservationId) REFERENCES reservations(id),
    FOREIGN KEY (tableId) REFERENCES tables(id)
);

-- Insertion d'un administrateur par défaut
INSERT INTO users (email, password, firstName, lastName, phone, role)
VALUES ('admin@restaurant.com', '$2a$10$X7UrH5QxX5QxX5QxX5QxX.5QxX5QxX5QxX5QxX5QxX5QxX5QxX5Qx', 'Admin', 'User', '0123456789', 'admin');

-- Insertion de quelques tables par défaut
INSERT INTO tables (seats) VALUES 
(2), (2), (2), -- 3 tables de 2 places
(4), (4), (4), -- 3 tables de 4 places
(6), (6);      -- 2 tables de 6 places

-- Insertion de quelques éléments de menu par défaut
INSERT INTO menu_items (name, description, price, category) VALUES
('Salade César', 'Laitue romaine, poulet grillé, parmesan, croûtons', 12.50, 'entree'),
('Soupe à l''oignon', 'Soupe traditionnelle gratinée au fromage', 8.50, 'entree'),
('Steak Frites', 'Steak de bœuf, frites maison, sauce au poivre', 24.50, 'plat'),
('Poisson du jour', 'Poisson frais du marché, légumes de saison', 22.50, 'plat'),
('Crème brûlée', 'Crème vanille caramélisée', 7.50, 'dessert'),
('Mousse au chocolat', 'Mousse légère au chocolat noir', 7.50, 'dessert'),
('Vin rouge', 'Bouteille de vin rouge de la maison', 25.00, 'boisson'),
('Eau minérale', 'Bouteille d''eau minérale', 3.50, 'boisson'); 