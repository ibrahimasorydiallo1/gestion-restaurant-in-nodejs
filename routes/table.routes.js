const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');
const { Table } = require('../models');

// Get all tables (admin only)
router.get('/', authMiddleware, isAdmin, async (req, res) => {
  try {
    const tables = await Table.findAll({
      order: [['seats', 'ASC']]
    });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tables', error: error.message });
  }
});

// Create table (admin only)
router.post('/', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { seats } = req.body;

    if (seats < 2 || seats > 6) {
      return res.status(400).json({ message: 'La table doit avoir entre 2 et 6 places' });
    }

    const table = await Table.create({ seats });
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la table', error: error.message });
  }
});

// Update table (admin only)
router.put('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    
    if (!table) {
      return res.status(404).json({ message: 'Table non trouvée' });
    }

    const { seats } = req.body;
    if (seats < 2 || seats > 6) {
      return res.status(400).json({ message: 'La table doit avoir entre 2 et 6 places' });
    }

    const updatedTable = await table.update({ seats });
    res.json(updatedTable);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification de la table', error: error.message });
  }
});

// Delete table (admin only)
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    
    if (!table) {
      return res.status(404).json({ message: 'Table non trouvée' });
    }

    await table.destroy();
    res.json({ message: 'Table supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la table', error: error.message });
  }
});

// Toggle table availability (admin only)
router.patch('/:id/toggle', authMiddleware, isAdmin, async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    
    if (!table) {
      return res.status(404).json({ message: 'Table non trouvée' });
    }

    await table.update({ isAvailable: !table.isAvailable });
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du changement de disponibilité de la table', error: error.message });
  }
});

module.exports = router; 