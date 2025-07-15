import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
// import moment from 'moment';
import axiosPublic from '../../Hooks/useAxiosPublic';
import Loader from '../../Utils/Loader';
import useTitle from '../../Hooks/useTitle';

const ApprovedTrainerDetails = () => {

  useTitle("Trainer Details")

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: trainer, isLoading, isError } = useQuery({
    queryKey: ['approvedTrainer', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainers-details/${id}`);
      return res.data;
    },
  });


  

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-500 p-6">Failed to load trainer info.</div>;

  return (
    <div className="min-h-screen bg-[#111] text-white py-12 px-4 md:px-16">
      {/* Header with CTA */}
      <div className="flex justify-between items-center mb-10 flex-col md:flex-row gap-6">
        <h1 className="text-4xl font-bold text-lime-500 uppercase">Trainer Details</h1>
        <button
          onClick={() => navigate('/beATrainer')}
          className="bg-lime-600 hover:bg-lime-700 px-6 py-3 rounded-md text-lg font-semibold shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          Become a Trainer
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Trainer Info */}
        <div className="bg-[#1a1a1a] p-8 rounded-md transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
            <img
              src={trainer.profileImage}
              alt={trainer.fullName}
              className="w-40 h-40 rounded-md object-cover border-1 border-lime-500 hover:scale-105 transition duration-300"
            />
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold">{trainer.fullName}</h2>
              <p className="text-gray-400 text-sm">{trainer.email}</p>
              <p className="mt-2 text-lime-400 font-semibold">{trainer.experience}+ Years Experience</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Age</p>
              <p className="font-semibold">{trainer.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Available Time</p>
              <p className="font-semibold">{trainer.availableTime}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-400 mb-1">Available Days</p>
              <p className="font-semibold">{trainer?.availableDays?.join(', ')}</p>
            </div>

            {/* <div className="sm:col-span-2">
              <p className="text-sm text-gray-400 mb-1">Available Days</p>
              <p className="font-semibold">{trainer?.availableDays?.join(', ')}</p>
            </div> */}

          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {trainer.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-lime-600 hover:bg-lime-700 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Social Links</h3>
            <div className="flex gap-4 flex-wrap">
              {trainer.socialLinks?.facebook && (
                <a
                  href={trainer.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline hover:scale-105 transition"
                >
                  Facebook
                </a>
              )}
              {trainer.socialLinks?.instagram && (
                <a
                  href={trainer.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-400 hover:underline hover:scale-105 transition"
                >
                  Instagram
                </a>
              )}
              {trainer.socialLinks?.x && (
                <a
                  href={trainer.socialLinks.x}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:underline hover:scale-105 transition"
                >
                  X
                </a>
              )}
            </div>
          </div>

          {/* Other Info */}
          {trainer.otherInfo && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Trainer Bio</h3>
              <p className="text-gray-300">{trainer.otherInfo}</p>
            </div>
          )}
        </div>

        {/* Available Slots Section */}
        <div className="bg-[#1f1f1f] p-8 rounded-md shadow-lg transition-all duration-300 hover:shadow-lime-500/20 h-fit">
          <h2 className="text-3xl font-bold mb-6 text-lime-500">Available Slots</h2>


          {trainer?.slots ?
            <div>
              <p className="text-gray-400 mb-4">
                Select any of the following available days to book a session with {trainer.fullName}.
              </p>
              <div className="flex flex-wrap gap-4">
                {trainer?.slots.map((slot, i) => (


                  <button
                    key={i}
                    onClick={() => navigate(`/book-trainer/${id}?slotId=${slot._id}`)}
                    className=" border-1 hover:bg-lime-700 px-4 py-2 rounded-md font-semibold transition hover:scale-105 cursor-pointer"
                  >
                    {slot.slotName} :  {slot.className}
                  </button>
                ))}
              </div>
            </div> : <p>This trainer not added any slots</p>
          }


        </div>
      </div>
    </div>
  );
};

export default ApprovedTrainerDetails;
