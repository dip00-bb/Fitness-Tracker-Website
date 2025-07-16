import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import Loader from '../../Utils/Loader';
import axiosPublic from '../../Hooks/useAxiosPublic';
import useTitle from '../../Hooks/useTitle';


const TrainerSection = () => {

    useTitle("All Trainers")

    const { data: trainers = [], isLoading, isError } = useQuery({
        queryKey: ['approvedTrainers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/approved-trainers');
            return res.data;
        }
    });

    if (isLoading) return <Loader />;
    if (isError) return <p className="text-red-500 p-6">Error loading trainer profiles.</p>;

    return (
        <div className="py-12 px-4 md:px-20 bg-[#0e0e0e] text-white">
            <h2 className="text-4xl font-bold text-center mb-10">Our Trainers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {trainers.map((trainer) => (
                    <div key={trainer._id} className="bg-[#1a1a1a] rounded-xl p-6 shadow-xl hover:shadow-red-500/20 transition flex flex-col">
                        <div className='h-64 mb-3'>
                            <img
                                src={trainer.profileImage}
                                alt={trainer.fullName}
                                className="w-full h-full rounded-lg mb-5"
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-green-400 mb-2">{trainer.fullName}</h3>
                        {/* <p className="text-gray-300 mb-1"><span className="text-white font-semibold">Experience:</span> {trainer.experience}+ Years</p> */}
                        <p className="text-gray-300 mb-3"><span className="text-white font-semibold">Available:</span> {trainer.availableDays?.join(', ')}</p>
                        {/* <p className="text-gray-300 mb-3">{trainer.otherInfo}</p> */}

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 text-xl mb-6 ">
                            {trainer.socialLinks?.facebook && (
                                <a href={trainer.socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-blue-500">
                                    <FaFacebookF />
                                </a>
                            )}
                            {trainer.socialLinks?.instagram && (
                                <a href={trainer.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-pink-400">
                                    <FaInstagram />
                                </a>
                            )}
                            {trainer.socialLinks?.x && (
                                <a href={trainer.socialLinks.x} target="_blank" rel="noreferrer" className="hover:text-gray-300">
                                    <FaXTwitter />
                                </a>
                            )}
                        </div>

                        {/* Know More */}
                        <Link
                            to={`/trainer-details/${trainer._id}`}
                            className="inline-block mt-auto bg-green-600 hover:bg-green-700 px-5 py-2 rounded text-white font-semibold transition justify-self-end items-end w-fit"
                        >
                            Know More
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainerSection;
