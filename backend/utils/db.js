const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.DATABASE_URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
  max: 10, // Adjust pool size as needed
  idleTimeoutMillis: 30000, 
}); 

module.exports = {
  query: (text, params) => pool.query(text, params),
};