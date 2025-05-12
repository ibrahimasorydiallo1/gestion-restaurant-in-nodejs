    const express = require('express');
    const router = express.Router();
    const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');
    const { MenuItem } = require('../models');

    // Get all menu items
    router.get('/', async (req, res) => {
      try {
        const menuItems = await MenuItem.findAll({
          order: [['category', 'ASC'], ['name', 'ASC']]
        });
        console.log("Données récupérées : ", menuItems);
        res.json(menuItems);
      } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du menu', error: error.message });
      }
    });

    // Add menu item (admin only)
    router.post('/', authMiddleware, isAdmin, async (req, res) => {
      try {
        const menuItem = await MenuItem.create(req.body);
        res.status(201).json(menuItem);
      } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du plat', error: error.message });
      }
    });

    // Update menu item (admin only)
    router.put('/:id', authMiddleware, isAdmin, async (req, res) => {
      try {
        const menuItem = await MenuItem.findByPk(req.params.id);
        if (!menuItem) {
          return res.status(404).json({ message: 'Plat non trouvé' });
        }
        await menuItem.update(req.body);
        res.json(menuItem);
      } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification du plat', error: error.message });
      }
    });

    // Delete menu item (admin only)
    router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
      try {
        const menuItem = await MenuItem.findByPk(req.params.id);
        if (!menuItem) {
          return res.status(404).json({ message: 'Plat non trouvé' });
        }
        await menuItem.destroy();
        res.json({ message: 'Plat supprimé avec succès' });
      } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du plat', error: error.message });
      }
    });

    module.exports = router; 