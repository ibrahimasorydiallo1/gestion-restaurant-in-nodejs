const { Table, Reservation } = require('../models');
const { Op } = require('sequelize');

const findAvailableTables = async (date, time, numberOfPeople) => {
  // Find all reservations at the same date and time
  const reservations = await Reservation.findAll({
    where: {
      date,
      time,
      status: { [Op.not]: 'cancelled' }
    },
    include: [Table]
  });

  // Get all tables that are already reserved
  const reservedTableIds = reservations.flatMap(res => 
    res.Tables.map(table => table.id)
  );

  // Find all tables not in reservedTableIds
  const availableTables = await Table.findAll({
    where: {
      id: { [Op.notIn]: reservedTableIds }
    },
    order: [['seats', 'DESC']] // Prefer larger tables first
  });

  // Find combination of tables that can accommodate the number of people
  return findTableCombination(availableTables, numberOfPeople);
};

const findTableCombination = (tables, requiredSeats) => {
  let remainingSeats = requiredSeats;
  const selectedTables = [];
  
  for (const table of tables) {
    if (remainingSeats <= 0) break;
    
    selectedTables.push(table);
    remainingSeats -= table.seats;
  }

  return remainingSeats <= 0 ? selectedTables : null;
};

module.exports = { findAvailableTables, findTableCombination };