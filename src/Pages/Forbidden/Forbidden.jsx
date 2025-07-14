// src/pages/Forbidden.jsx
import React from 'react';
import { Link } from 'react-router';
import useTitle from '../../Hooks/useTitle';


const Forbidden = () => {
  useTitle('403 Forbidden');

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center text-center text-white px-6">
      {/* Big 403 */}
      <h1 className="text-[120px] leading-none font-extrabold text-lime-500 drop-shadow-lg">
        403
      </h1>

      {/* Message */}
      <p className="text-xl md:text-2xl mb-6">
        Oops! You don’t have permission to access this page.
      </p>

      {/* Back / Login actions */}
      <div className="space-x-3">
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded bg-lime-600 hover:bg-lime-700 transition"
        >
          ⬅︎ Back Home
        </Link>

        <Link
          to="/login"
          className="inline-block px-6 py-3 rounded border border-lime-600 text-lime-400 hover:bg-lime-700/30 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
