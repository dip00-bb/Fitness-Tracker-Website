import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosPublic from '../../../Hooks/useAxiosPublic';

const AddClass = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  /* ---- Mutation: POST new class ---- */
  const { mutate, isLoading } = useMutation({
    mutationFn: async (newClass) => {
      const res = await axiosPublic.post('/admin-classes', newClass);
      return res.data;
    },
    onSuccess: () => {
      /** invalidate class list so it refetches for AllClasses page */
      queryClient.invalidateQueries(['allClasses']);
      Swal.fire('Added!', 'New class has been created.', 'success');
      reset();
    },
    onError: () =>
      Swal.fire('Error', 'Could not add class. Try again later.', 'error')
  });

  const onSubmit = (data) => {
    mutate({
      name: data.name,
      image: data.image,
      details: data.details,
      extraInfo: data.extraInfo
    });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1a1a1a] w-full max-w-lg p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-red-500">
          Add New Class
        </h2>

        {/* Class Name */}
        <div>
          <label className="block mb-1 text-sm">Class Name</label>
          <input
            {...register('name', { required: true })}
            className="w-full p-3 rounded bg-[#262626] focus:outline-none"
            placeholder="e.g., Yoga Basics"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 text-sm">Image URL</label>
          <input
            {...register('image', { required: true })}
            className="w-full p-3 rounded bg-[#262626] focus:outline-none"
            placeholder="https://example.com/yoga.jpg"
            required
          />
        </div>

        {/* Details */}
        <div>
          <label className="block mb-1 text-sm">Details / Description</label>
          <textarea
            {...register('details', { required: true })}
            rows="3"
            className="w-full p-3 rounded bg-[#262626] focus:outline-none"
            placeholder="Short description of the class"
            required
          />
        </div>

        {/* Extra Info (optional) */}
        <div>
          <label className="block mb-1 text-sm">Additional Info (optional)</label>
          <textarea
            {...register('extraInfo')}
            rows="2"
            className="w-full p-3 rounded bg-[#262626] focus:outline-none"
            placeholder="Target audience, prerequisites, etc."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold transition cursor-pointer"
        >
          {isLoading ? 'Adding…' : 'Add Class'}
        </button>
      </form>
    </div>
  );
};

export default AddClass;
