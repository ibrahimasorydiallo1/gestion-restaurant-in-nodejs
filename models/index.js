const { Sequelize } = require('sequelize');


// Configuration simple de la base de données
const sequelize = new Sequelize('restaurant_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

// Import models
const User = require('./user.model')(sequelize);
const Reservation = require('./reservation.model')(sequelize);
const Table = require('./table.model')(sequelize);
const MenuItem = require('./menuItem.model')(sequelize);

// Define associations
User.hasMany(Reservation);
Reservation.belongsTo(User);

Table.hasMany(Reservation);
Reservation.belongsTo(Table);

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Reservation,
  Table,
  MenuItem
};