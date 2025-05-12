const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Table = sequelize.define('Table', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 2,
      max: 10
    }
  },
  status: {
    type: DataTypes.ENUM('disponible', 'occupée', 'réservée', 'maintenance'),
    defaultValue: 'disponible'
  }
});

module.exports = Table;