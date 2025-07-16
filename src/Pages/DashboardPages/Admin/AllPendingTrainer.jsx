import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Utils/Loader';
import { Link } from 'react-router';
import useTitle from '../../../Hooks/useTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllPendingTrainer = () => {


    useTitle("Dashboard | Applied Trainer");

    const axiosSecure=useAxiosSecure()

    const { data: trainers = [], isLoading, isError } = useQuery({
        queryKey: ['pendingTrainers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/pending-trainers');
            return res.data;
        },
    });

    if (isLoading) return <Loader/>;
    if (isError) return <div className="text-red-500 text-center py-10">Error loading data</div>;

    return (
        <div className="overflow-x-auto p-6 text-white">
            <h2 className="text-3xl font-bold mb-6">All Pending Trainers</h2>
            <table className="min-w-full bg-[#1e1e1e] text-white rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-800 text-left">
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trainers.map((trainer, index) => (
                        <tr key={index} className="border-b border-gray-700 hover:bg-[#2a2a2a]">
                            <td className="py-3 px-4">{trainer.fullName}</td>
                            <td className="py-3 px-4">{trainer.email}</td>
                            <td className="py-3 px-4 capitalize">{trainer.status}</td>
                            <td className="py-3 px-4 flex gap-2">
                                <Link to={`trainers-details/${trainer._id}`} className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded text-white cursor-pointer">Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>  
    );
};

export default AllPendingTrainer;

