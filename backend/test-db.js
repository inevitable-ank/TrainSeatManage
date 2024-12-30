const db = require('./utils/db');

(async () => {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('Database Connected:', result.rows[0]);
  } catch (error) {
    console.error('Database Connection Error:', error.message);
  }
})();
