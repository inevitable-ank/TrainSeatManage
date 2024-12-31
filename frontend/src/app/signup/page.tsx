'use client';

import { useRouter } from 'next/navigation';
import SignupForm from '@/components/SignupForm';
import { SignupRequest } from '@/types/auth';
import axios from 'axios';

const SignupPage = () => {
  const router = useRouter();

  const handleSignup = async (data: SignupRequest) => {
    const { username, email, password } = data;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`, { username, email, password });
      alert('Signup successful!');
      router.push('/login'); // Redirect to login page
    } catch (error) {
      console.error('Login failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg animate-fadeIn">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="block text-green-500 ">Create Account</span>
          </h2>
          <p className="text-gray-600 text-sm italic">Join us and start your journey today.</p>
          <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <SignupForm onSubmit={handleSignup} />
      </div>
    </div>
  );
};

export default SignupPage;
