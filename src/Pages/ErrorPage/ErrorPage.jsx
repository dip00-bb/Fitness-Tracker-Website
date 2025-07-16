import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl md:text-8xl font-bold text-lime-400 mb-4">Oops! 😓</h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6">Something Went Wrong 🏋️‍♂️</h2>
      <p className="text-lg text-gray-300 mb-8 max-w-md">
        Looks like our equipment needs a quick reset! Try refreshing the page or head back to the gym. 🏋️‍♀️
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleRefresh}
          className="bg-lime-500 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-lime-400 transition duration-300"
        >
          Refresh Page 🔄
        </button>
        <Link
          to="/"
          className="bg-gray-700 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-600 transition duration-300"
        >
          Back to Home 🏠
        </Link>
      </div>
      <div className="mt-12 text-4xl animate-pulse">⚡</div>
    </div>
  );
};

export default ErrorPage;