import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl md:text-8xl font-bold text-lime-400 mb-4">404 💪</h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6">Oops! Page Not Found 🏋️‍♂️</h2>
      <p className="text-lg text-gray-300 mb-8 max-w-md">
        Looks like this page is out lifting heavier weights elsewhere! Let's get you back to the gym. 🏋️‍♀️
      </p>
      <Link
        to="/"
        className="bg-lime-500 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-lime-400 transition duration-300"
      >
        Back to Home 🏠
      </Link>
      <div className="mt-12 text-4xl animate-bounce">🏋️</div>
    </div>
  );
};

export default NotFoundPage;