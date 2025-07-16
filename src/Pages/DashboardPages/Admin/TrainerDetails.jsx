import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import Loader from '../../../Utils/Loader';
import axiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useTitle from '../../../Hooks/useTitle';

const TrainerDetails = () => {

    useTitle("Dashboard | Pending Trainer Details")

    const { id } = useParams();
    const navigate = useNavigate()


    // Add state above return
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleApproveTrainer = async () => {
        await axiosPublic.patch(`/approve-trainer/${id}`).then((res) => {
            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Approved!',
                    text: 'Trainer status and role updated successfully.',
                });
                navigate('/dashboard/pending-trainers')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.message || 'Something went wrong.',
                });
            }
        });

    }

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
                        {/* <div className="bg-[#222] p-4 rounded-lg col-span-full">
                            <p className="text-sm text-gray-400 mb-1">Applied At</p>
                            <p className="text-xl font-bold">{moment(trainer.appliedAt).format("MMMM Do YYYY, h:mm A")}</p>
                        </div> */}
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
                <div className="flex md:justify-center py-7 lg:mt-18">
                    <img
                        src={trainer.profileImage}
                        alt={trainer.fullName}
                        className="w-[300px] h-[420px] lg:w-[500px] lg:h-[720px] object-cover rounded-xl border-4 border-green-500 shadow-xl"
                    />
                </div>
            </div>
            <button onClick={handleApproveTrainer} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white cursor-pointer mr-3.5 mt-10">Approve</button>
            <button onClick={() => setIsRejectModalOpen(true)} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white cursor-pointer">Reject</button>

            {/* Reject Modal */}


            {isRejectModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-4">
                    <div className="bg-[#1f1f1f] text-white p-6 rounded-lg w-full max-w-2xl shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-red-400">Reject Trainer Application</h2>

                        <div className="space-y-2 text-gray-300">
                            <p><span className="font-semibold text-white">Name:</span> {trainer.fullName}</p>
                            <p><span className="font-semibold text-white">Email:</span> {trainer.email}</p>
                            <p><span className="font-semibold text-white">Age:</span> {trainer.age}</p>
                            <p><span className="font-semibold text-white">Experience:</span> {trainer.experience} Years</p>
                            <p><span className="font-semibold text-white">Available:</span> {trainer.availableDays.join(', ')} ({trainer.availableTime})</p>
                        </div>

                        <div className="mt-4">
                            <label className="block mb-1 text-white font-semibold">Rejection Feedback</label>
                            <textarea
                                className="w-full p-3 rounded bg-[#2a2a2a] text-white"
                                placeholder="Write your feedback here..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows="4"
                            />
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                onClick={() => setIsRejectModalOpen(false)}
                                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        const res = await axiosPublic.post(`/reject-trainer/${id}`, {
                                            feedback, email: trainer.email
                                        });



                                        if (res.data.success) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Trainer Rejected',
                                                text: 'The trainer has been successfully rejected.',
                                            });
                                            setIsRejectModalOpen(false);
                                            navigate('/dashboard/pending-trainers')

                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Failed',
                                                text: res.data.message || 'Rejection failed',
                                            });
                                        }
                                    } catch (err) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: err.message,
                                        });
                                    }
                                }}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
                            >
                                Submit Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TrainerDetails;
