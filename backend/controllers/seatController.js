// const db = require('../utils/db');

// // Fetch all seats
// exports.getSeats = async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM seats ORDER BY row_number, seat_number');
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch seats' });
//   }
// };

// // Book selected seats
// exports.bookSeats = async (req, res) => {
//   const { seatIds } = req.body;

//   try {
//     // Mark seats as reserved
//     const query = `
//       UPDATE seats
//       SET is_reserved = TRUE
//       WHERE id = ANY($1::int[])
//       RETURNING *;
//     `;
//     const result = await db.query(query, [seatIds]);

//     if (result.rowCount === 0) {
//       return res.status(400).json({ error: 'No seats were updated' });
//     }

//     res.json({ message: 'Seats booked successfully', seats: result.rows });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to book seats' });
//   }
// };


const db = require('../utils/db');

// Fetch all seats
exports.getSeats = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM seats ORDER BY row_number, seat_number');
    console.log('Fetched seats:', result.rows);
    res.json(result.rows || []);
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).json({ error: 'Failed to fetch seats' });
  }
};

// Book seats
exports.bookSeats = async (req, res) => {
  const { seatCount } = req.body;

  console.log('Requested seat count:', seatCount);

  if (seatCount < 1 || seatCount > 7) {
    return res.status(400).json({ error: 'Invalid seat count. Must be between 1 and 7.' });
  }

  try {
    const result = await db.query('SELECT * FROM seats WHERE is_reserved = FALSE ORDER BY row_number, seat_number');
    const availableSeats = result.rows;

    console.log('Available seats:', availableSeats);

    if (availableSeats.length < seatCount) {
      return res.status(400).json({ error: 'Not enough seats available.' });
    }

    // Logic to find the best seats to book
    let seatsToBook = [];
    let rowGroup = [];
    let closestSeats = [];

    for (const seat of availableSeats) {
      if (!rowGroup.length || rowGroup[0].row_number === seat.row_number) {
        rowGroup.push(seat);
      } else {
        if (rowGroup.length >= seatCount) {
          closestSeats = rowGroup.slice(0, seatCount);
          break;
        }
        rowGroup = [seat];
      }
    }

    if (!closestSeats.length) {
      closestSeats = availableSeats.slice(0, seatCount);
    }

    seatsToBook = closestSeats.map(seat => seat.id);

    console.log('Seats to book:', seatsToBook);

    const query = `
      UPDATE seats
      SET is_reserved = TRUE
      WHERE id = ANY($1::int[])
      RETURNING *;
    `;
    const bookedSeats = await db.query(query, [seatsToBook]);

    console.log('Booked seats:', bookedSeats.rows);

    if (!bookedSeats.rowCount) {
      throw new Error('Database update failed');
    }

    // Return all seats to reflect the updated state
    const updatedSeats = await db.query('SELECT * FROM seats ORDER BY row_number, seat_number');
    res.json(updatedSeats.rows);
  } catch (error) {
    console.error('Error booking seats:', error);
    res.status(500).json({ error: 'Failed to book seats' });
  }
};
