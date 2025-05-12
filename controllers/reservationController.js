const { Reservation, Table, User } = require('../models');
const { Op } = require('sequelize');
const { findAvailableTables } = require('../utils/helpers');

const getAllReservations = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const reservations = await Reservation.findAll({
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Table, through: { attributes: [] } }
      ]
    });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};

const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Table, through: { attributes: [] } }
      ]
    });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};

const createReservation = async (req, res) => {
  try {
    const { name, phone, numberOfPeople, date, time, note } = req.body;
    
    // Check if tables are available
    const availableTables = await findAvailableTables(date, time, numberOfPeople);
    
    if (!availableTables) {
      return res.status(400).json({ message: 'No available tables for the selected date and time' });
    }

    // Create reservation
    const reservation = await Reservation.create({
      name,
      phone,
      numberOfPeople,
      date,
      time,
      note,
      status: 'pending',
      userId: req.user.id
    });

    // Associate tables with reservation
    await reservation.addTables(availableTables);

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error: error.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, numberOfPeople, date, time, note } = req.body;
    
    const reservation = await Reservation.findOne({
      where: { id, userId: req.user.id, status: 'pending' }
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found or not modifiable' });
    }

    // Update reservation
    await reservation.update({ name, phone, numberOfPeople, date, time, note });

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation', error: error.message });
  }
};

const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const reservation = await Reservation.findOne({
      where: { 
        id,
        [Op.or]: [
          { userId: req.user.id },
          { status: 'pending' }
        ]
      }
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found or not cancellable' });
    }

    // Cancel reservation
    await reservation.update({ status: 'cancelled' });

    res.json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling reservation', error: error.message });
  }
};

const validateReservation = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;
    
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Validate reservation
    await reservation.update({ status: 'confirmed' });

    res.json({ message: 'Reservation confirmed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error validating reservation', error: error.message });
  }
};

module.exports = {
  getAllReservations,
  getUserReservations,
  createReservation,
  updateReservation,
  cancelReservation,
  validateReservation
};