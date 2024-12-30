'use client';

import Link from 'next/link';
import Image from 'next/image';
import img from '../../public/img/cartoon-steam-locomotive-with-carriage-on-white-background-children-s-toy-train-in-flat-style-children-s-illustration-of-railway-transport-for-fabric-design-wallpaper-greeting-cards-etc-vector.jpg';

const HomePage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      {/* Main Content */}
      <div className="text-center animate-fadeIn">
        <h1 className="text-5xl font-extrabold mb-6 tracking-wider">
          Welcome to <span className="text-yellow-300">Train Reservation System</span>
        </h1>
        <p className="text-lg font-light mb-10">
          Experience a simple and efficient way to reserve train seats online.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            href="/login"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Train Animation */}
      {/* <div className="absolute bottom-0 w-full h-32 overflow-hidden">
        <div className="relative train-animation">
          <Image
            src={img}
            alt="Train Animation"
            className="w-full h-auto"
          />
        </div>
      </div> */}

      {/* Decorative Animation */}
      <div className="absolute bottom-40 w-full flex justify-center space-x-4">
        <div className="w-4 h-4 bg-yellow-300 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-yellow-300 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default HomePage;
