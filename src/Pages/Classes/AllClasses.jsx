
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
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMostBooed,setMood]=useState(true)

  const {
    data: classes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['allAdminClasses', searchQuery],
    queryFn: async () => {
      const res = await axiosPublic.get(`/admin-classes?search=${searchQuery}`);
      return res.data.data || res.data;
    },
  });

  const handleFindClick = () => {
    setSearchQuery(searchInput.trim());
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(classes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentClasses = classes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500 p-6">Failed to load classes.</p>;

  return (
    <section className="min-h-screen bg-[#0d0d0d] text-white py-12 px-4 mx-w-auto">
      <h2 className="text-4xl font-bold text-center text-lime-500 mb-10">
        All Classes
      </h2>

      {/* Search bar with button */}
      <div className="mb-10 text-center flex flex-col sm:flex-row justify-center items-center gap-3">

        <button
          className="px-6 py-2 rounded-lg border-2 font-semibold bg-lime-500 text-black transition-all duration-300 cursor-pointer"
          onClick={()=>setMood(!isMostBooed)}
        >
          {isMostBooed? "Most Booked":"Less Booked"}
        </button>

        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search classes..."
          className="px-4 py-2 w-full sm:w-80 rounded-md bg-[#1a1a1a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500"
        />
        <button
          onClick={handleFindClick}
          className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-6 py-2 rounded-md transition-all duration-300"
        >
          Find
        </button>
      </div>

      {/* Class cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {currentClasses.map((cls) => (
          <div
            key={cls._id}
            className="bg-[#1a1a1a] shadow-md rounded-xl overflow-hidden transition-transform hover:scale-[1.02] flex flex-col h-full"
          >
            <img src={cls.image} alt={cls.name} className="h-50 w-full object-fill" />
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-semibold text-lime-400 mb-2">{cls.name}</h2>
              <p className="text-sm text-gray-300 mb-2 line-clamp-3 flex-1">{cls.details}</p>
              {cls.extraInfo && (
                <p className="text-xs text-gray-400 mb-3">{cls.extraInfo}</p>
              )}
              <div className="mb-3">Total Booked {cls.totalBooked}</div>
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
