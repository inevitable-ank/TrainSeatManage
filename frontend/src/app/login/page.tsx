'use client';

import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import { LoginRequest } from '@/types/auth';
import axios from 'axios';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (data: LoginRequest) => {
    const { email, password } = data;

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      alert('Login successful!');
      localStorage.setItem('token', response.data.token); // Store JWT token
      router.push('/booking'); // Redirect to booking page
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg animate-fadeIn">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="block animate-pulse text-blue-500">Log In</span>
            
          </h2>
          <p className="text-gray-600 text-sm italic">Access your account and start your journey.</p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
