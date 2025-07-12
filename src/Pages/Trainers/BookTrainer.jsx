// src/pages/BookTrainer.jsx
import React from 'react';
import { useLocation, useParams, } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../../Hooks/useAxiosPublic';
import MembershipTable from '../../Utils/MembershipTable'
import Loader from '../../Utils/Loader'

const BookTrainer = () => {
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const day = searchParams.get('day');
    const available =searchParams.get('available')



    /* fetch trainer info */
    const {
        data: trainer,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['bookTrainer', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainers-details/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <Loader />;
    if (isError) return <p className="text-lime-500 p-6">Failed to load trainer info.</p>;

    return (
        <section className="min-h-screen ">



            <div className="flex items-center gap-6 mb-10 ">
                {/* <img
                    src={trainer.profileImage}
                    alt={trainer.fullName}
                    className="w-20 h-20 rounded-full object-cover border-2 border-lime-600"
                /> */}
                <div className='w-full flex flex-col'>
                    <h2 className="text-3xl font-bold text-lime-500 text-center mb-3">{trainer.fullName.toUpperCase()} <span className='text-white'>WILL BE YOUR TRAINER</span></h2>
                    <p className="text-gray-100 text-2xl text-center mb-3">You have selected the <span className='text-lime-500'>{day.toUpperCase()}</span> Slot</p>
                    <p className="text-gray-100 text-2xl text-center">Training will continue for <span className='text-lime-500'>{available}</span></p>
                </div>

                {/* <div>
                    <p>Selected Slot : {day}</p>
                </div> */}
            </div>


            <MembershipTable />



            
        </section>
    );
};

export default BookTrainer;
