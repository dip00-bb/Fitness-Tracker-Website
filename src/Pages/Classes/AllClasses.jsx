// src/pages/AllClasses.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../../Hooks/useAxiosPublic';
import Loader from '../../Utils/Loader';
import { Link } from 'react-router';
import useTitle from '../../Hooks/useTitle';

const ITEMS_PER_PAGE = 6;

const AllClasses = () => {
  useTitle('All Classes');

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: classes = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['allAdminClasses'],
    queryFn: async () => {
      const res = await axiosPublic.get('/admin-classes');
      return res.data.data || res.data;
    }
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500 p-6">Failed to load classes.</p>;

  const totalPages = Math.ceil(classes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentClasses = classes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="min-h-screen bg-[#0d0d0d] text-white py-12 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center text-lime-500 mb-10">
        All Classes
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentClasses.map((cls) => (
          <div
            key={cls._id}
            className="bg-[#1a1a1a] shadow-md rounded-xl overflow-hidden transition-transform hover:scale-[1.02] flex flex-col h-full"
          >
            {/* Fixed‑height image */}
            <img
              src={cls.image}
              alt={cls.name}
              className="h-50 w-full object-fill"
            />

            {/* Content wrapper */}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-semibold text-lime-400 mb-2">
                {cls.name}
              </h2>

              {/* Details grow/shrink without affecting total height */}
              <p className="text-sm text-gray-300 mb-2 line-clamp-3 flex-1">
                {cls.details}
              </p>

              {cls.extraInfo && (
                <p className="text-xs text-gray-400 mb-3">
                  {cls.extraInfo}
                </p>
              )}

              {/* Total booked badge / footer */}
              <div className=" mb-3">
                Total Booked {cls.totalBooked}
              </div>

              {/* Trainer avatars pinned at bottom */}
              {cls.trainer?.length > 0 && (
                <div className="flex -space-x-3 mt-auto">
                  {cls.trainer.map((tr, idx) => (
                    <Link
                      key={idx}
                      to={`/trainer-details/${tr.trainerID}`}
                      className="block w-10 h-10"
                    >
                      <img
                        src={tr.trainerImage}
                        alt={tr.trainerEmail}
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>


        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-4 py-2 rounded-md border text-sm font-medium ${pageNum === currentPage
                ? 'bg-lime-500 text-black border-lime-500'
                : 'bg-transparent border-gray-600 text-white hover:bg-gray-700'
                }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default AllClasses;
