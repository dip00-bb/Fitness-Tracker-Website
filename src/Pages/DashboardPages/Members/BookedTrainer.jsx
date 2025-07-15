// src/pages/dashboard/BookedTrainer.jsx
import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../../../Hooks/useAxiosPublic';
import Loader from '../../../Utils/Loader';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import useTitle from '../../../Hooks/useTitle';
import ReviewModal from '../../../Utils/ReviewModal';
import Swal from 'sweetalert2';

const fetchEnrichedHistory = async (email) => {
    /* 1️⃣  base payment history */
    const payRes = await axiosPublic.get(`/payment-history/${email}`);
    const payments = payRes.data.data || [];

    /* 2️⃣  enrich each record in parallel */
    return Promise.all(
        payments.map(async (p) => {
            // fetch trainer
            const trainerRes = await axiosPublic.get(`/trainers-details/${p.trainerId}`);
            const trainer = trainerRes.data;


            // locate slot inside trainer
            const slot = trainer.slots.find((s) => s._id === p.slotId || s._id.$oid === p.slotId);
            // fetch class
            let className = '—';
            if (slot && slot.classId) {
                try {
                    const classRes = await axiosPublic.get(`/admin-classes`);
                    const allClasses = classRes?.data?.data
                    const myClass = allClasses.find((cls) => cls._id === slot.classId);
                    className = myClass?.name || '—';
                } catch {
                    className = 'Not found';
                }
            }

            return { payment: p, trainer, slot, className };
        })
    );
};

const BookedTrainer = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [target, setTarget] = useState({ trainerId: '', slotId: '', className: '' });


    useTitle('Dashboard | Booked Trainer');
    const { user } = useContext(AuthContext);

    const email = user?.email;


    const {
        data: history = [],
        isLoading,
        isError,
    } = useQuery({
        enabled: !!email,
        queryKey: ['enrichedPayments', email],
        queryFn: () => fetchEnrichedHistory(email),
    });


    console.log("my history")

    if (!email || isLoading) return <Loader />;
    if (isError) return <p className="text-red-500 p-6">Failed to load bookings.</p>;

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white py-10 px-4 md:px-16">
            <h2 className="text-3xl font-bold text-lime-500 mb-8">My Trainer Bookings</h2>

            {history.length === 0 ? (
                <p className="text-gray-400">No bookings yet.</p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {history.map(({ payment, trainer, slot, className }) => (
                        <div key={payment._id} className="border border-gray-700 bg-[#1a1a1a] rounded-xl p-6 space-y-4">
                            {/* Trainer */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={trainer.profileImage}
                                    alt={trainer.fullName}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-lime-600"
                                />
                                <div>
                                    <p className="font-semibold text-lg">{trainer.fullName}</p>
                                    <p className="text-xs text-gray-400">{trainer.email}</p>
                                </div>
                            </div>

                            {/* Slot */}
                            {slot ? (
                                <div className="text-sm text-gray-200 space-y-1">
                                    <p><span className="text-lime-400">Slot:</span> {slot.slotName}</p>
                                    <p><span className="text-lime-400">Time:</span> {slot.slotTime}</p>
                                    <p><span className="text-lime-400">Class:</span> {className}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-red-400">Slot info missing</p>
                            )}

                            {/* Amount & date */}
                            <div className="text-xs text-gray-400">
                                Paid {new Date(payment.paidAt).toLocaleString()} • $
                                {(payment.amount)}
                            </div>

                            {/* Review button */}
                            <button
                                // onClick={() => openReviewModal(trainer._id, slot?._id)}

                                onClick={() => {
                                    setTarget({ trainerId: trainer._id, slotId: slot?._id, className: className });
                                    setModalOpen(true);
                                }}

                                className="w-full bg-lime-600 hover:bg-lime-700 py-2 rounded text-sm font-semibold"
                            >
                                Leave a Review
                            </button>
                        </div>
                    ))}
                </div>
            )
            }

            <ReviewModal open={modalOpen}
                trainerId={target.trainerId}
                slotId={target.slotId}
                className={target.className}
                onClose={(success) => {
                    setModalOpen(false);
                    if (success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Review Submitted!',
                            text: 'Thanks for sharing your feedback.',
                            confirmButtonColor: '#16a34a', // green
                        });
                    }
                }} />
        </div >
    );
};

export default BookedTrainer;

