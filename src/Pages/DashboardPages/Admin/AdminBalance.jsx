// src/pages/dashboard/AdminBalance.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useTitle from '../../../Hooks/useTitle';
import axiosPublic from '../../../Hooks/useAxiosPublic';
import Loader from '../../../Utils/Loader';

const COLORS = ['#84cc16', '#0ea5e9']; 

const AdminBalance = () => {
    useTitle('Dashboard | Balance');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['financialSummary'],
        queryFn: async () => {
            const res = await axiosPublic.get('/admin/financial-summary');
            return res.data;
        }
    });

    if (isLoading) return <Loader />;
    if (isError || !data?.success)
        return <p className="text-red-500 p-6">Failed to load summary.</p>;

    const {
        totalBalance,
        recentPayments,
        subscriberCount,
        paidMemberCount
    } = data;


    const chartData = [
        { name: 'Newsletter Subs', value: subscriberCount },
        { name: 'Paid Members', value: paidMemberCount }
    ];

    return (
        <section className="min-h-screen bg-[#0d0d0d] text-white p-8">
            <h1 className="text-3xl font-bold text-lime-500 mb-8">Financial Overview</h1>


            <div className="bg-[#1a1a1a] p-6 rounded-lg mb-8 flex items-center justify-between">
                <span className="text-xl">Total Balance</span>
                <span className="text-3xl font-bold text-lime-400">
                    ${totalBalance.toLocaleString()}
                </span>
            </div>



            <div className="bg-[#1a1a1a] p-6 rounded-lg mb-8">
                <h2 className="text-lg font-semibold mb-4">Subscribers vs Paid Members</h2>

                <div className="w-full h-72">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}         
                                paddingAngle={2}
                                label={({ percent }) => `${(percent * 100).toFixed(0)}%`} 
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index === 0 ? '#ef4444' : '#3b82f6'}  
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                wrapperStyle={{ background: '#1a1a1a', border: 'none' }}
                                contentStyle={{ background: '#1a1a1a', border: 'none' }}
                                labelStyle={{ color: '#fff' }}
                                formatter={(value, name) => [`${value}`, name]}
                            />

                            <Legend
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                                iconType="circle"
                                wrapperStyle={{ color: '#d4d4d4', fontSize: '0.9rem' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>



            <div className="bg-[#1a1a1a] p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Last 6 Transactions</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm border border-gray-700">
                        <thead className="bg-lime-600 text-white">
                            <tr>
                                <th className="py-2 px-4">Date</th>
                                <th className="py-2 px-4">Student</th>
                                <th className="py-2 px-4">Amount</th>
                                <th className="py-2 px-4">Txn ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPayments.map((p) => (
                                <tr key={p._id} className="border-b border-gray-700 hover:bg-[#262626]">
                                    <td className="py-2 px-4">
                                        {new Date(p.paidAt).toLocaleString()}
                                    </td>
                                    <td className="py-2 px-4">{p.studentEmail}</td>
                                    <td className="py-2 px-4">${p.amount}</td>
                                    <td className="py-2 px-4 text-xs">{p.transactionId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AdminBalance;
