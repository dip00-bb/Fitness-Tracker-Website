// src/pages/dashboard/ManageTrainer.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosPublic from '../../../Hooks/useAxiosPublic';
import Loader from '../../../Utils/Loader';
import useTitle from '../../../Hooks/useTitle';


const ManageTrainer = () => {

  useTitle("Dashboard | Manage Trainer")
  /* ────────────────── Fetch with TanStack Query ────────────────── */
  const {
    data: trainers = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['approvedTrainersDashboard'],
    queryFn: async () => {
      const res = await axiosPublic.get('/approved-trainers');
      return res.data;
    }
  });

  /* ────────────────── Delete Handler ───────────────── */
  const handleDelete = async (email) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `This will delete the trainer and demote them to member.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#555',
      confirmButtonText: 'Yes, delete!'
    });

    if (!confirm.isConfirmed) return;

    try {
      // 1️⃣ Demote in userCollection
      await axiosPublic.patch('/demote-to-member', { email });
      // 2️⃣ Remove from trainerCollection
      await axiosPublic.delete(`/delete-trainer?email=${email}`);

      await refetch(); // refresh table

      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Trainer demoted and removed.',
        confirmButtonColor: '#d33'
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Something went wrong.',
        confirmButtonColor: '#d33'
      });
    }
  };

  if (isLoading) return <Loader />;
  if (isError)   return <p className="text-red-500 p-6">Failed to load trainers.</p>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Manage Trainers</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#1a1a1a] rounded-lg overflow-hidden text-left">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Photo</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Experience</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((tr, idx) => (
              <tr key={tr._id} className="border-b border-gray-700 hover:bg-[#2a2a2a]">
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">
                  <img src={tr.profileImage} alt={tr.fullName} className="w-12 h-12 rounded-full object-cover" />
                </td>
                <td className="py-3 px-4">{tr.fullName}</td>
                <td className="py-3 px-4">{tr.email}</td>
                <td className="py-3 px-4">{tr.experience}+ yrs</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(tr.email)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTrainer;
