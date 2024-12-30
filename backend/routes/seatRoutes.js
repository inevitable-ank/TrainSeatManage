const express = require('express');
const { getSeats, bookSeats } = require('../controllers/seatController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to fetch all seats (public)
router.get('/', getSeats);

// Route to book seats (protected)
router.post('/', authMiddleware, bookSeats);

module.exports = router;
