import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Utils/Loader';
import useTitle from '../../../Hooks/useTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const NewsLetterSubscriber = () => {


    useTitle("Dashboard | Newsletters");

    const axiosSecure=useAxiosSecure()

    const { data: subscribers = [], isLoading, isError } = useQuery({
        queryKey: ['newsletter-subscribers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/newsletter-subscribers');
            return res.data;
        }
    });

    if (isLoading) return <Loader/>;
    if (isError) return <p className="text-red-500 p-4">Failed to fetch subscribers</p>;

    return (
        <div className="overflow-x-auto px-6 py-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Newsletter Subscribers</h2>
            <table className="min-w-full bg-[#1e1e1e] border border-gray-700 text-left text-white">
                <thead>
                    <tr className="bg-[#2a2a2a] text-gray-300">
                        <th className="py-3 px-6 border-b border-gray-700">#</th>
                        <th className="py-3 px-6 border-b border-gray-700">Name</th>
                        <th className="py-3 px-6 border-b border-gray-700">Email</th>
                        <th className="py-3 px-6 border-b border-gray-700">Subscribed At</th>
                    </tr>
                </thead>
                <tbody>
                    {subscribers.map((subscriber, index) => (
                        <tr key={subscriber._id || index} className="hover:bg-[#333333]">
                            <td className="py-3 px-6 border-b border-gray-700">{index + 1}</td>
                            <td className="py-3 px-6 border-b border-gray-700">{subscriber.name}</td>
                            <td className="py-3 px-6 border-b border-gray-700">{subscriber.email}</td>
                            <td className="py-3 px-6 border-b border-gray-700">
                                {new Date(subscriber.subscribedAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewsLetterSubscriber;
