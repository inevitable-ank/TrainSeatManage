import { z } from 'zod';

// Schema for login validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Schema for signup validation
export const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Schema for seat booking validation
export const seatBookingSchema = z.object({
  seatIds: z.array(z.number()).nonempty('At least one seat must be selected'),
});

// Validate function
export const validateForm = (schema: z.ZodSchema, data: any) => {
  try {
    schema.parse(data);
    return null; // Valid data
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors.map((err) => err.message); // Return validation errors
    }
    return ['Unknown error'];
  }
};
