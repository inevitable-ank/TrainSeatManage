import { useState } from 'react';
import { LoginRequest } from '@/types/auth';
import { loginSchema, validateForm } from '@/utils/validations';

interface LoginFormProps {
  onSubmit: (data: LoginRequest) => void; // Accepts LoginRequest object
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(loginSchema, { email, password });
    if (errors) {
      alert(errors.join('\n')); // Show validation errors
      return;
    }

    onSubmit({ email, password }); // Pass LoginRequest object
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 hover:shadow-md transition-all duration-300"
      >
        Login
      </button>
      <p className="text-center text-gray-600 text-sm mt-4">
        Don’t have an account?{' '}
        <a
          href="/signup"
          className="text-blue-500 hover:text-blue-700 font-medium transition-all duration-300"
        >
          Sign Up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
