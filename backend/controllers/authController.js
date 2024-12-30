const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');
const { signupSchema, loginSchema, validateInput } = require('../utils/validations');

// Environment variable for JWT secret
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// User signup
exports.signup = async (req, res) => {
  // Validate input
  const errors = validateInput(signupSchema, req.body);
  if (errors) {
    return res.status(400).json({ errors }); // Return validation errors
  }

  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const result = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    const newUser = result.rows[0];
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === '23505') {
      // Unique constraint violation (e.g., duplicate email)
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  }
};

// User login
exports.login = async (req, res) => {
  // Validate input
  const errors = validateInput(loginSchema, req.body);
  if (errors) {
    return res.status(400).json({ errors }); // Return validation errors
  }

  const { email, password } = req.body;

  try {
    // Fetch user by email
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
