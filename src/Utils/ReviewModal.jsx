// src/components/ReviewModal.jsx
import React, { use, useState } from 'react';
import axiosPublic from '../Hooks/useAxiosPublic';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const ReviewModal = ({ open, onClose, trainerId, slotId, className}) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const {user}=use(AuthContext)

    const reviewerEmail=user?.email
    const reviewer=user?.displayName;
    const reviewerImage=user?.photoURL;


    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosPublic.post('/add-review', {
                trainerId,
                className,
                slotId,
                rating,
                reviewer,
                reviewerEmail,
                comment,
                reviewerImage
            });
            onClose(true);
            e.target.reset()
        } catch (err) {
            console.error(err);
            onClose(false);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999]">
            <div className="bg-[#1a1a1a] w-full max-w-md rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold text-lime-500 mb-4">
                    Leave a Review
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <button
                                type="button"
                                key={n}
                                onClick={() => setRating(n)}
                                className={`text-2xl ${n <= rating ? 'text-lime-400' : 'text-gray-600'
                                    } transition`}
                            >
                                ★
                            </button>
                        ))}
                    </div>


                    <textarea
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience…"
                        className="w-full p-3 rounded bg-[#262626] focus:outline-none text-sm"
                        requilime
                    />


                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => onClose(false)}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                        >
                            Cancel
                        </button>
                        <button

                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-lime-600 hover:bg-lime-700 rounded"
                            
                        >
                            {loading ? 'Saving…' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
