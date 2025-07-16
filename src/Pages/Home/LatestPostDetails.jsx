// src/pages/ForumDetails.jsx
import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useTitle from '../../Hooks/useTitle';
import axiosPublic from '../../Hooks/useAxiosPublic';
import Loader from '../../Utils/Loader';
import { images } from '../../assets/asset';


const LatestPostDetails = () => {
    const { id } = useParams();
    useTitle("Forum Post");

    const { data, isLoading, isError } = useQuery({
        queryKey: ['forumDetails', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/forum/${id}`);
            return res.data?.data;
        }
    });

    if (isLoading) return <Loader />;
    if (isError || !data) return <p className="text-red-500 p-6">Post not found.</p>;

    const { title, imageURL, tags, content, author, authorImage, createdAt, authorRole } = data;

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white py-10 px-4 md:px-16">
            <div className="max-w-4xl mx-auto space-y-6 bg-[#1a1a1a] p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                    <img
                        src={authorImage}
                        alt={author}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <img
                        src={authorRole === "admin" ? images.adminBadge : images.trainerBadge}
                        alt={title}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-lg font-semibold">{author}</p>
                        <p className="text-sm text-gray-400">
                            {new Date(createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-lime-400">{title}</h1>

                {imageURL && (
                    <img
                        src={imageURL}
                        alt={title}
                        className="w-full max-h-[400px] object-cover rounded"
                    />

                )}



                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs bg-lime-700/20 text-lime-400 px-2 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <p className="text-gray-200 leading-relaxed whitespace-pre-line">{content}</p>
            </div>
        </div>
    );
};

export default LatestPostDetails;
