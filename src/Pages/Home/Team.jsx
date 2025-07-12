// src/components/TeamSection.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import axiosPublic from '../../Hooks/useAxiosPublic';

const TeamSection = () => {
    /* ─ Fetch approved trainers ─ */
    const { data: trainers = [], isLoading, isError } = useQuery({
        queryKey: ['teamSection'],
        queryFn: async () => {
            const res = await axiosPublic.get('/approved-trainers');
            return res.data;                // full list; we’ll slice in UI
        }
    });

    /* ─ Limit to 3 profiles ─ */
    const profiles = trainers.slice(0, 4);

    return (
        <section className="py-16 px-4 md:px-16 bg-[#0d0d0d] text-white">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
                Meet <span className="text-lime-500">Our Trainers</span>
            </h2>

            {/* Loading & error states */}
            {isLoading && (
                <div className="flex justify-center">
                    <div className="animate-spin h-10 w-10 border-4 border-lime-600 border-t-transparent rounded-full" />
                </div>
            )}
            {isError && <p className="text-red-500 text-center">Failed to load team.</p>}

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {profiles.map(tr => (
                    <div
                        key={tr._id}
                        className="bg-[#1a1a1a] px-4 py-4 rounded-xl shadow-lg hover:scale-110 transition-all duration-300 flex flex-col"
                    >
                        {/* Photo */}
                        <div className='h-56'>
                            <img
                                src={tr.profileImage}
                                alt={tr.fullName}
                                className="w-full h-full rounded-lg mb-6"
                            />
                        </div>

                        {/* Name */}
                        <h3 className="text-2xl font-bold mb-2">{tr.fullName}</h3>

                        {/* Bio */}
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                            {tr.otherInfo || 'Certified trainer passionate about fitness and wellness.'}
                        </p>

                        {/* Expertise chips */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tr.skills.slice(0, 4).map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-lime-700 text-xs px-3 py-1 rounded-full font-medium hover:bg-lime-600 transition"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* Social icons (if provided) */}
                        {(tr.socialLinks?.facebook ||
                            tr.socialLinks?.instagram ||
                            tr.socialLinks?.x) && (
                                <div className="flex gap-4 mt-2 text-lg w-fit ">
                                    {tr.socialLinks?.facebook && (
                                        <a
                                            href={tr.socialLinks.facebook}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:text-blue-500 transition"
                                        >
                                            <FaFacebookF />
                                        </a>
                                    )}
                                    {tr.socialLinks?.instagram && (
                                        <a
                                            href={tr.socialLinks.instagram}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:text-pink-400 transition"
                                        >
                                            <FaInstagram />
                                        </a>
                                    )}
                                    {tr.socialLinks?.x && (
                                        <a
                                            href={tr.socialLinks.x}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:text-gray-300 transition"
                                        >
                                            <FaXTwitter />
                                        </a>
                                    )}
                                </div>
                            )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;
