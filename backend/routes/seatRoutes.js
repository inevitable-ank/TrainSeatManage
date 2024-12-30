const express = require('express');
const { getSeats, bookSeats, resetSeats} = require('../controllers/seatController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to fetch all seats (public)
router.get('/', getSeats);

// Route to book seats (protected)
router.post('/', authMiddleware, bookSeats);

router.post('/reset', resetSeats);

module.exports = router;
