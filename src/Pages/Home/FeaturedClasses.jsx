// src/components/FeaturedClasses.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../../Hooks/useAxiosPublic';
import Loader from '../../Utils/Loader';

const fetchFeaturedClasses = async () => {
    const { data } = await axiosPublic.get('/top-classes');
    return data;
};

const FeaturedClasses = () => {
    const { data: classes = [], isLoading, isError } = useQuery({
        queryKey: ['featuredClasses'],
        queryFn: fetchFeaturedClasses,
        staleTime: 5 * 60 * 1000
    });

    if (isLoading) return <Loader />;
    if (isError) return <p className="text-center text-red-500">Couldn’t load featured classes.</p>;

    return (
        <section className="my-12 mx-w-auto px-4 ">
            <h2 className="text-4xl md:text-6xl font-bold text-center text-lime-500 mb-6">
                Featured Classes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {classes.map(cls => (
                    <article
                        key={cls._id}
                        className="rounded-2xl shadow-sm bg-base-100 overflow-hidden hover:shadow-md transition"
                    >
                        <div className='h-52 md:h-72'>
                            <img
                                src={cls.image}
                                alt={cls.name}
                                className="h-full w-full object-fill"
                            />
                        </div>

                        <div className='p-4'>
                            <div className="flex flex-col gap-3 mb-3">
                                <h3 className="text-xl font-bold text-lime-400">{cls.name}</h3>
                            </div>
                            <div className='mb-4'>
                                <p className="text-sm text-white line-clamp-2">{cls.details}</p>
                            </div>
                            <div className="mt-auto inline-block text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full w-max justify-items-end items-end">
                                {cls.totalBooked} bookings
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default FeaturedClasses;
