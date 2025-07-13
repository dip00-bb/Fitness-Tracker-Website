// src/pages/dashboard/ManageSlot.jsx
import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import axiosPublic from '../../../Hooks/useAxiosPublic';
import Loader from '../../../Utils/Loader';
import useTitle from '../../../Hooks/useTitle';

const ManageSlot = () => {
    useTitle('Dashboard | Manage Slot');
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const queryClient = useQueryClient();

    /* ─────────── GET slots for this trainer ─────────── */
    const {
        data: slotData,
        isLoading,
        isError
    } = useQuery({
        enabled: !!email,
        queryKey: ['trainerSlots', email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainer-slot/${email}`);
            return res.data; // { fullName, slots: [...] }
        }
    });

    /* ─────────── DELETE slot mutation ─────────── */
    const deleteMutation = useMutation({
        mutationFn: (slotId) =>
            axiosPublic.delete(`/delete-slot/${slotId}`, {
                data: { email } // body payload
            }),
        onSuccess: () => {
            Swal.fire('Deleted', 'Slot removed.', 'success');
            queryClient.invalidateQueries(['trainerSlots', email]);
        },
        onError: (err) => {
            const msg = err.response?.data?.message || 'Failed to delete';
            Swal.fire('Error', msg, 'error');
        }
    });

    /* confirm + call mutation */
    const handleDelete = (slotId) => {
        Swal.fire({
            title: 'Delete this slot?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((res) => {
            if (res.isConfirmed) deleteMutation.mutate(slotId);
        });
    };

    /* ─────────── UI states ─────────── */
    if (!email || isLoading) return <Loader />;
    if (isError) return <Loader />;

    const { fullName, slots } = slotData;

    return (
        <div className="p-6 text-white">
            <h2 className="text-3xl font-bold mb-6">Manage Slots for {fullName}</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-[#1a1a1a] rounded-lg overflow-hidden text-left">
                    <thead>
                        <tr className="bg-lime-600 text-white">
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Slot Name</th>
                            <th className="py-3 px-4">Time</th>
                            <th className="py-3 px-4">Class ID</th>
                            <th className="py-3 px-4">Extra Info</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slots.map((slot, idx) => (
                            <tr key={slot._id} className="border-b border-gray-700 hover:bg-[#2a2a2a]">
                                <td className="py-3 px-4">{idx + 1}</td>
                                <td className="py-3 px-4">{slot.slotName}</td>
                                <td className="py-3 px-4">{slot.slotTime}</td>
                                <td className="py-3 px-4">{slot.classId}</td>
                                <td className="py-3 px-4">{slot.extraInfo || '-'}</td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleDelete(slot._id)}
                                        className="bg-lime-600 hover:bg-lime-700 px-4 py-2 rounded text-sm cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {slots.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-400">
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
