const { z } = require('zod');

// Validation schema for user signup
const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Validation schema for user login
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Validation schema for seat booking
const seatBookingSchema = z.object({
  seatIds: z.array(z.number()).nonempty('At least one seat must be selected'),
});

// Validation helper function
const validateInput = (schema, data) => {
  try {
    schema.parse(data); // Validate data against schema
    return null; // No errors
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.errors.map((e) => e.message); // Return validation error messages
    }
    return ['Unknown error'];
  }
};

module.exports = {
  signupSchema,
  loginSchema,
  seatBookingSchema,
  validateInput,
};
