// src/pages/BookTrainer.jsx
import React from 'react';
import { useLocation, useParams, } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../../Hooks/useAxiosPublic';
import MembershipTable from '../../Utils/MembershipTable'
import Loader from '../../Utils/Loader'

const BookTrainer = () => {

    // trainer id
    const { id } = useParams();

    const { search } = useLocation();
    const slotId = new URLSearchParams(search).get('slotId');


    const {
        data: trainer,
        isLoading: trainerLoading,
        isError: trainerError
    } = useQuery({
        queryKey: ['bookTrainer', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainers-details/${id}`);
            return res.data;
        }
    });


    const {
        data: slot,
        isLoading: slotLoading,
        isError: slotError
    } = useQuery({
        enabled: !!slotId,
        queryKey: ['slotDetails', slotId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/slot-details/${slotId}`, {
                params: {
                    trainerId: id
                }
            });
            return res.data.data;
        }
    });


    if (trainerLoading || (slotId && slotLoading)) return <Loader />;
    if (trainerError) return <p className="text-red-500 p-6">Failed to load trainer info.</p>;
    if (slotError) return <p className="text-red-500 p-6">Failed to load slot info.</p>;

    return (
        <section>



            <div className="flex items-center gap-6 mb-10 ">

                <div className='w-full flex flex-col'>
                    <h2 className="text-3xl font-bold text-lime-500 text-center mb-3">{trainer?.fullName.toUpperCase()} <span className='text-white'>WILL BE YOUR TRAINER</span></h2>
                    <p className="text-gray-100 text-2xl text-center mb-3">You have selected the <span className='text-lime-500'>{slot?.slotName.toUpperCase()}</span> Slot</p>
                    <p className="text-gray-100 text-2xl text-center">Training will continue for <span className='text-lime-500'>{slot?.slotTime}</span></p>
                </div>


            </div>


            <MembershipTable  slotId={slotId} trainerId={id}/>




        </section>
    );
};

export default BookTrainer;
