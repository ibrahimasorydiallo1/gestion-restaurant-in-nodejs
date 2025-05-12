const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Importer les modèles
const User = require('./User');
const Table = require('./Table');
const Reservation = require('./Reservation');
const MenuItem = require('./MenuItem');

// Définir les associations entre les modèles
// Exemple : Une réservation appartient à un utilisateur et une table
Reservation.belongsTo(User);
Reservation.belongsTo(Table);
User.hasMany(Reservation);
Table.hasMany(Reservation);

// Exporter les modèles
module.exports = {
  sequelize,
  User,
  Table,
  Reservation,
  MenuItem
}; 