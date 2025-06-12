const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');
const { Reservation, Table } = require('../models');
const { Op } = require('sequelize');

// Get all reservations (admin only)
router.get('/', authMiddleware, isAdmin, async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: ['User'],
      order: [['date', 'ASC'], ['time', 'ASC']]
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: error.message });
  }
});

// Get user's reservations
router.get('/my-reservations', authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userId: req.user.id },
      order: [['date', 'ASC'], ['time', 'ASC']]
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de vos réservations', error: error.message });
  }
});

// Create reservation
router.post('/', async (req, res) => {
  try {
    const { numberOfPeople, date, time, note } = req.body;

    // Check if tables are available
    const availableTables = await Table.findAll({
      where: { isAvailable: true }
    });

    const totalSeats = availableTables.reduce((sum, table) => sum + table.seats, 0);
    if (totalSeats < numberOfPeople) {
      return res.status(400).json({ message: 'Pas assez de tables disponibles' });
    }

    // Check for existing reservations at the same time
    const existingReservation = await Reservation.findOne({
      where: {
        date,
        time,
        status: {
          [Op.notIn]: ['cancelled']
        }
      }
    });

    if (existingReservation) {
      return res.status(400).json({ message: 'Créneau déjà réservé' });
    }

    const reservation = await Reservation.create({
      userId: req.user.id,
      numberOfPeople,
      date,
      time,
      note,
      status: 'pending'
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la réservation', error: error.message });
  }
});

// Update reservation
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    if (reservation.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    if (reservation.status !== 'pending') {
      return res.status(400).json({ message: 'Impossible de modifier une réservation confirmée ou annulée' });
    }

    const updatedReservation = await reservation.update(req.body);
    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification de la réservation', error: error.message });
  }
});

// Cancel reservation
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    if (reservation.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    await reservation.update({ status: 'cancelled' });
    res.json({ message: 'Réservation annulée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'annulation de la réservation', error: error.message });
  }
});

// Validate reservation (admin only)
router.patch('/:id/validate', authMiddleware, isAdmin, async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    if (reservation.status !== 'pending') {
      return res.status(400).json({ message: 'Seules les réservations en attente peuvent être validées' });
    }

    await reservation.update({ status: 'confirmed' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la validation de la réservation', error: error.message });
  }
});

module.exports = router; 