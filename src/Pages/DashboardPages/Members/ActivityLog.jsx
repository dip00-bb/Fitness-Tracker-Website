// src/pages/dashboard/ActivityLog.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaRegEye } from 'react-icons/fa6';
import axiosPublic from '../../../Hooks/useAxiosPublic';
import Loader from '../../../Utils/Loader';

const ActivityLog = () => {
  const [modalData, setModalData] = useState(null);

  /* fetch all pending/rejected users */
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['trainerStatusList'],
    queryFn: async () => {
      const res = await axiosPublic.get('/trainer-status-list');
      return res.data.users;
    }
  });

  /* when clicking the eye icon fetch feedback then open modal */
  const openFeedback = async (email) => {
    try {
      const res = await axiosPublic.get(`/rejection-feedback/${email}`);
      setModalData({
        email,
        feedback: res.data.feedback,
        rejectedAt: res.data.rejectedAt
      });
    } catch {
      setModalData({
        email,
        feedback: 'Could not load feedback.',
        rejectedAt: ''
      });
    }
  };

  if (isLoading) return <Loader />;
  if (isError)   return <p className="text-red-500 p-6">Could not load data.</p>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Trainer Application Activity</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#1a1a1a] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-lime-600">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u, idx) => (
              <tr key={u.email} className="border-b border-gray-700">
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{u.name}</td>
                <td className="py-3 px-4">{u.email}</td>
                <td className="py-3 px-4 capitalize">{u.trainerStatus}</td>
                <td className="py-3 px-4">
                  {u.trainerStatus === 'rejected' && (
                    <button
                      onClick={() => openFeedback(u.email)}
                      className="text-lime-500 hover:text-lime-400 cursor-pointer"
                      title="View feedback"
                    >
                      <FaRegEye size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
                  No pending or rejected applications.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Feedback modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-lime-500">
              Feedback for {modalData.email}
            </h3>
            <p className="text-gray-300 whitespace-pre-line">{modalData.feedback}</p>
            {modalData.rejectedAt && (
              <p className="mt-4 text-xs text-gray-400">
                Rejected at: {new Date(modalData.rejectedAt).toLocaleString()}
              </p>
            )}

            <button
              onClick={() => setModalData(null)}
              className="mt-6 bg-lime-600 hover:bg-lime-700 px-4 py-2 rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
