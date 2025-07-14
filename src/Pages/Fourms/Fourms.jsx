// src/pages/Forums.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import axiosPublic from '../../Hooks/useAxiosPublic';
import Loader from '../../Utils/Loader';
import useTitle from '../../Hooks/useTitle';

const ForumCard = ({ post, onVote }) => (
  <div className="bg-[#1a1a1a] rounded-lg shadow-md p-6 space-y-4">
    <div className="flex items-center gap-3">
      <img
        src={post.authorImage}
        alt={post.author}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold">{post.author}</p>
        <p className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
    </div>

    <h3 className="text-xl font-bold text-lime-400">{post.title}</h3>

    {/* tags */}
    <div className="flex flex-wrap gap-2">
      {post.tags.map((t, i) => (
        <span
          key={i}
          className="text-xs bg-lime-700/20 text-lime-400 px-2 py-1 rounded-full"
        >
          #{t}
        </span>
      ))}
    </div>

    <p className="text-gray-300">{post.content}</p>

    {post.imageURL && (
      <img
        src={post.imageURL}
        alt="post visual"
        className="w-full max-h-72 rounded"
      />
    )}

    {/* vote bar */}
    <div className="flex items-center gap-4 mt-2">
      <button onClick={() => onVote(post._id, 1)}>
        <FaArrowUp className="text-lime-500 hover:text-lime-400 cursor-pointer" />
      </button>
      <span className="font-semibold">{post.voteCount}</span>
      <button onClick={() => onVote(post._id, -1)}>
        <FaArrowDown className="text-red-500 hover:text-red-400 cursor-pointer" />
      </button>
    </div>
  </div>
);

const Forums = () => {


  useTitle("Posts")

  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();


  const { data, isLoading, isError } = useQuery({
    queryKey: ['forums', page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/forums?page=${page}`);
      return res.data;
    },
    keepPreviousData: true
  });


  const voteMutation = useMutation({
    mutationFn: ({ id, vote }) =>
      axiosPublic.patch(`/forum-vote/${id}`, { vote }),
    onSuccess: () => {
      queryClient.invalidateQueries(['forums', page]);
    }
  });

  const handleVote = (id, vote) => {
    voteMutation.mutate({ id, vote }); 
  };

  if (isLoading) return <Loader />;
  if (isError)   return <p className="text-red-500 p-6">Failed to load forums.</p>;

  const { data: posts, totalPages } = data;

  return (
    <section className="min-h-screen text-white py-10 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center text-lime-500 mb-10">
        Community Forums
      </h2>


      <div className="space-y-8 max-w-3xl mx-auto">
        {posts.map((p) => (
          <ForumCard key={p._id} post={p} onVote={handleVote} />
        ))}
      </div>


      <div className="flex justify-center gap-4 mt-12">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded bg-[#1a1a1a] disabled:opacity-40"
        >
          Prev
        </button>
        <span className="self-center">
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded bg-[#1a1a1a] disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Forums;
