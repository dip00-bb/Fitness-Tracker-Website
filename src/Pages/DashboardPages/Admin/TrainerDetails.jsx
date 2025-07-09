import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Loader from '../../../Utils/Loader';
import axiosPublic from '../../../Hooks/useAxiosPublic';

const TrainerDetails = () => {
    const { id } = useParams();

    const { data: trainer, isLoading, isError } = useQuery({
        queryKey: ['trainerDetails', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainers-details/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <Loader />;
    if (isError) return <div className="text-red-500 p-6">Error loading trainer details.</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#141414] via-[#1f1f1f] to-[#181818] text-white py-10 px-4 md:px-20">
            <div className="grid md:grid-cols-2 items-center gap-10">
                {/* Left Text */}
                <div className="space-y-6">
                    <div className="text-sm text-gray-400">
                        <p>📧 {trainer.email}</p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold uppercase">
                        Meet Trainer <span className="text-green-500">{trainer.fullName}</span>
                    </h1>
                    <p className="text-lg text-gray-300">
                        {trainer.otherInfo || "This trainer is here to guide and support you on your fitness journey."}
                    </p>

                    {/* Experience & Availability */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        <div className="bg-[#222] p-4 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Age</p>
                            <p className="text-xl font-bold">{trainer.age}</p>
                        </div>
                        <div className="bg-[#222] p-4 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Years of Experience</p>
                            <p className="text-xl font-bold">{trainer.experience}+</p>
                        </div>
                        <div className="bg-[#222] p-4 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Available Days</p>
                            <p className="text-xl font-bold">{trainer.availableDays.join(', ')}</p>
                        </div>
                        <div className="bg-[#222] p-4 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Available Time</p>
                            <p className="text-xl font-bold">{trainer.availableTime}</p>
                        </div>
                        <div className="bg-[#222] p-4 rounded-lg col-span-full">
                            <p className="text-sm text-gray-400 mb-1">Applied At</p>
                            <p className="text-xl font-bold">{moment(trainer.appliedAt).format("MMMM Do YYYY, h:mm A")}</p>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-3">Trainer Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {trainer.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="bg-green-700 text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-green-600 transition"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    {(trainer.socialLinks?.facebook || trainer.socialLinks?.instagram || trainer.socialLinks?.x) && (
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-3">Social Profiles</h2>
                            <div className="flex flex-wrap gap-4">
                                {trainer.socialLinks?.facebook && (
                                    <a
                                        href={trainer.socialLinks.facebook}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        Facebook
                                    </a>
                                )}
                                {trainer.socialLinks?.instagram && (
                                    <a
                                        href={trainer.socialLinks.instagram}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-pink-400 hover:underline"
                                    >
                                        Instagram
                                    </a>
                                )}
                                {trainer.socialLinks?.x && (
                                    <a
                                        href={trainer.socialLinks.x}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-gray-400 hover:underline"
                                    >
                                        X
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Image */}
                <div className="flex md:justify-center py-7">
                    <img
                        src={trainer.profileImage}
                        alt={trainer.fullName}
                        className="w-[300px] h-[420px] lg:w-[500px] lg:h-[720px] object-cover rounded-xl border-4 border-green-500 shadow-xl"
                    />
                </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white cursor-pointer mr-3.5">Approve</button>
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white cursor-pointer">Reject</button>
        </div>
    );
};

export default TrainerDetails;
