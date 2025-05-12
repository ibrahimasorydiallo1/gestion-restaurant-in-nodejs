const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/auth.routes');
const reservationRoutes = require('./routes/reservation.routes');
const menuRoutes = require('./routes/menu.routes');
const tableRoutes = require('./routes/table.routes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/tables', tableRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

// Database connection and server start
// Test de connexion à la base de données
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');

    // Test pour récupérer des éléments du menu
    const [results] = await sequelize.query('SELECT * FROM menu_items');
    console.log('Menu Items:', results);
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
    process.exit(1); // Arrêter le serveur en cas d'erreur critique
  }
})();

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}); 