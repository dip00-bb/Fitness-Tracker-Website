// src/pages/AllClasses.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../../Hooks/useAxiosPublic';
import Loader from '../../Utils/Loader';

const AllClasses = () => {
  /* fetch classes */
  const {
    data: classes = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['allAdminClasses'],
    queryFn: async () => {
      const res = await axiosPublic.get('/admin-classes');
      return res.data.data || res.data; // adjust if API wraps payload
    }
  });

  if (isLoading) return <Loader />;
  if (isError)   return <p className="text-red-500 p-6">Failed to load classes.</p>;

  return (
    <section className="min-h-screen bg-[#0d0d0d] text-white py-12 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center text-lime-500 mb-10">
        All Classes
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="card bg-base-100 shadow-sm transition hover:shadow-lime-500/40"
          >
            <figure>
              <img
                src={cls.image}
                alt={cls.name}
                className="h-40 w-full"
              />
            </figure>

            <div className="card-body bg-[#1a1a1a] rounded-b-xl">
              <h2 className="card-title text-lime-400">{cls.name}</h2>

              <p className="text-sm text-gray-300 line-clamp-3">{cls.details}</p>

              {cls.extraInfo && (
                <p className="text-xs text-gray-400">{cls.extraInfo}</p>
              )}

              <div className="card-actions justify-end">
                <button className="btn btn-sm bg-lime-600 hover:bg-lime-700 text-white border-none">
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllClasses;
