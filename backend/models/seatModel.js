const db = require('../utils/db');

exports.getAllSeats = async () => {
  const query = `
    SELECT * FROM seats
    ORDER BY row_number, seat_number;
  `;
  const result = await db.query(query);
  return result.rows;
};

exports.bookSeats = async (seatIds) => {
  const query = `
    UPDATE seats
    SET is_reserved = TRUE
    WHERE id = ANY($1::int[])
    RETURNING *;
  `;
  const result = await db.query(query, [seatIds]);
  return result.rows;
};
