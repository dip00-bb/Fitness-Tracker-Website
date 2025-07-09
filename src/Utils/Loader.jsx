import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh] text-white">
            {/* Spinner */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-opacity-70"></div>

            {/* Loading Text */}
            <p className="mt-4 text-xl font-semibold tracking-wide text-gray-300">Loading...</p>
        </div>
    );
};

export default Loader;
