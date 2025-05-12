const { Table } = require('../models');

// Récupérer toutes les tables
const getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tables', error: error.message });
  }
};

// Récupérer une table par son ID
const getTableById = async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Table non trouvée' });
    }
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la table', error: error.message });
  }
};

// Créer une nouvelle table
const createTable = async (req, res) => {
  try {
    const { number, capacity, status } = req.body;
    const table = await Table.create({
      number,
      capacity,
      status: status || 'disponible'
    });
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la table', error: error.message });
  }
};

// Mettre à jour une table
const updateTable = async (req, res) => {
  try {
    const { number, capacity, status } = req.body;
    const table = await Table.findByPk(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Table non trouvée' });
    }
    await table.update({
      number,
      capacity,
      status
    });
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la table', error: error.message });
  }
};

// Supprimer une table
const deleteTable = async (req, res) => {
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
};

// Récupérer les tables disponibles
const getAvailableTables = async (req, res) => {
  try {
    const tables = await Table.findAll({
      where: { status: 'disponible' }
    });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tables disponibles', error: error.message });
  }
};

// Récupérer les tables par capacité
const getTablesByCapacity = async (req, res) => {
  try {
    const tables = await Table.findAll({
      where: { capacity: req.params.capacity }
    });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tables par capacité', error: error.message });
  }
};

// Mettre à jour le statut d'une table
const updateTableStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const table = await Table.findByPk(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Table non trouvée' });
    }
    await table.update({ status });
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la table', error: error.message });
  }
};

module.exports = {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  getAvailableTables,
  getTablesByCapacity,
  updateTableStatus
};
