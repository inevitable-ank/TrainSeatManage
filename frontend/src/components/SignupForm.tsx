import { useState } from 'react';
import { SignupRequest } from '@/types/auth';
import { signupSchema, validateForm } from '@/utils/validations';

interface SignupFormProps {
  onSubmit: (data: SignupRequest) => void; // Accepts SignupRequest object
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(signupSchema, { username, email, password });
    if (errors) {
      alert(errors.join('\n')); // Show validation errors
      return;
    }

    onSubmit({ username, email, password }); // Passing SignupRequest object
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Username</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
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
          className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 hover:shadow-md transition-all duration-300"
      >
        Sign Up
      </button>
      <p className="text-center text-gray-600 text-sm mt-4">
        Already have an account?{' '}
        <a
          href="/login"
          className="text-green-500 hover:text-green-700 font-medium transition-all duration-300"
        >
          Log In
        </a>
      </p>
    </form>
  );
};

export default SignupForm;
