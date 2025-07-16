import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import axiosPublic from '../../Hooks/useAxiosPublic';
import Loader from '../../Utils/Loader';
import { images } from '../../assets/asset';

const LatestPost = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['latestForums'],
        queryFn: async () => {
            const res = await axiosPublic.get('/forums-at-home');
            return res.data?.data || [];
        }
    });

    if (isLoading) return <Loader />;
    if (isError) return <p className="text-red-500 p-4">Failed to load posts.</p>;

    return (
        <section className="py-10 px-4 bg-[#0d0d0d] text-white mx-w-auto">
            <h2 className="text-3xl font-bold text-lime-500 mb-6">Latest Community Posts</h2>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data.map((post) => (
                    <div key={post._id} className="bg-[#1a1a1a] rounded-lg shadow p-4 flex flex-col gap-3">
                        <img
                            src={post.imageURL}
                            alt={post.title}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h3 className="text-xl font-semibold text-lime-400">{post.title}</h3>
                        <p className="text-sm text-gray-300 line-clamp-4">{post.content}</p>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {post.tags.map((tag, idx) => (
                                <span key={idx} className="text-xs bg-lime-700/20 text-lime-400 px-2 py-1 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                            <img
                                src={post.authorImage}
                                alt={post.author}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <img
                                src={post.authorRole==="admin" ? images.adminBadge : images.trainerBadge}
                                alt={post.author}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm">{post.author}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <Link
                            to={`/forums-details/${post._id}`}
                            className="mt-auto text-lime-400 hover:underline text-sm font-medium"
                        >
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LatestPost;
