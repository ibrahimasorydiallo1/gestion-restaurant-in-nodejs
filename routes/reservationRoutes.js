const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const {
  getAllReservations,
  getUserReservations,
  createReservation,
  updateReservation,
  cancelReservation,
  validateReservation
} = require('../controllers/reservationController');

router.get('/', authMiddleware, adminMiddleware, getAllReservations);
router.get('/my-reservations', authMiddleware, getUserReservations);
router.post('/', authMiddleware, createReservation);
router.put('/:id', authMiddleware, updateReservation);
router.delete('/:id', authMiddleware, cancelReservation);
router.patch('/:id/validate', authMiddleware, adminMiddleware, validateReservation);

module.exports = router;