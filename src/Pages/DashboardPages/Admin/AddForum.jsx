// src/pages/dashboard/AddForum.jsx
import React, { use, useState } from 'react';
import Swal from 'sweetalert2';
import axiosPublic from '../../../Hooks/useAxiosPublic';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';

const AddForum = () => {
  /* local form state */

  const {user} = use(AuthContext);


  const [title, setTitle]       = useState('');
  const [tags, setTags]         = useState('');
  const [content, setContent]   = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      return Swal.fire('Required', 'Title and content are required.', 'warning');
    }

    try {
      await axiosPublic.post('/save-forums-data', {

        title,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        content,
        imageURL,
        authorEmail:user.email,
        author:user.displayName,
        authorImage:user.photoURL
      });

      Swal.fire('Success', 'Forum post published!', 'success');

      // reset form
      // setTitle('');
      // setTags('');
      // setContent('');
      // setImageURL('');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to publish.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] w-full max-w-2xl p-8 rounded-xl shadow-lg space-y-8"
      >
        <h2 className="text-3xl font-bold text-lime-500 text-center">
          Create a New Forum Post
        </h2>

        {/* Title */}
        <div>
          <label className="block mb-1 text-sm">Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a catchy title…"
            className="w-full p-3 rounded bg-[#262626] focus:outline-none"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 text-sm">
            Tags <span className="text-gray-400 text-xs">(comma‑separated)</span>
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="fitness, nutrition, cardio"
            className="w-full p-3 rounded bg-[#262626] focus:outline-none"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 text-sm">Content</label>
          <textarea
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, questions, or tips…"
            className="w-full p-3 rounded bg-[#262626] resize-none focus:outline-none"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 text-sm">Image URL (optional)</label>
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 rounded bg-[#262626] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-lime-600 hover:bg-lime-700 py-3 rounded font-semibold transition cursor-pointer"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default AddForum;
