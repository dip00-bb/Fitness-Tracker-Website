import React from 'react';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import axiosPublic from '../../../Hooks/useAxiosPublic';
import Loader from '../../../Utils/Loader';

const ManageSlot = () => {
    const { user } = use(AuthContext);
    const email = user?.email;


    const {
        data: slotInfo,
        isLoading,
        isError
    } = useQuery({
        enabled: !!email,                     // wait for email to exist
        queryKey: ['trainerSlots', email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainer-slot/${email}`);
            return res.data;                    // expects same schema you posted
        }
    });


    if (isLoading) return <Loader />;
    if (!email) return <Loader />;
    if (isError) return <p className="text-red-500 p-6">Failed to load slots.</p>;

    /* slotInfo example fields:
         availableDays: ["Sunday", "Monday"]
         availableTime: "8pm-6pm"
    */
    const { availableDays = [], availableTime } = slotInfo;

    return (
        <div className="p-6 text-white">
            <h2 className="text-3xl font-bold mb-6">Manage Slots</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-[#1a1a1a] rounded-lg overflow-hidden text-left">
                    <thead>
                        <tr className="bg-gray-600 text-white">
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Day</th>
                            <th className="py-3 px-4">Time</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableDays.map((day, idx) => (
                            <tr key={idx} className="border-b border-gray-700 hover:bg-[#2a2a2a]">
                                <td className="py-3 px-4">{idx + 1}</td>
                                <td className="py-3 px-4">{day}</td>
                                <td className="py-3 px-4">{availableTime}</td>
                                <td className="py-3 px-4">
                                    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm cursor-pointer">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* In case there are no slots */}
                        {availableDays.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-gray-400">
                                    No slots configured.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageSlot;
