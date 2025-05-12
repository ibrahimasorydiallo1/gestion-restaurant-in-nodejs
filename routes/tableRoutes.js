const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Récupérer les tables disponibles
router.get('/available', authMiddleware, tableController.getAvailableTables);

// Récupérer les tables par capacité
router.get('/capacity/:capacity', authMiddleware, tableController.getTablesByCapacity);

// Récupérer toutes les tables
router.get('/', authMiddleware, tableController.getAllTables);

// Récupérer une table par son ID
router.get('/:id', authMiddleware, tableController.getTableById);

// Créer une nouvelle table
router.post('/', authMiddleware, tableController.createTable);

// Mettre à jour une table
router.put('/:id', authMiddleware, tableController.updateTable);

// Supprimer une table
router.delete('/:id', authMiddleware, tableController.deleteTable);

// Mettre à jour le statut d'une table
router.patch('/:id/status', authMiddleware, tableController.updateTableStatus);

module.exports = router;
