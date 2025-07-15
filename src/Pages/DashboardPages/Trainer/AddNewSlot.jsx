// src/pages/trainer/AddNewSlot.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import axiosPublic from '../../../Hooks/useAxiosPublic';
import Loader from '../../../Utils/Loader';
import useTitle from '../../../Hooks/useTitle';



const dayOptions = [
  { value: 'Sunday', label: 'Sunday' },
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' }
];

const slotNameOption = [
  { value: 'Morning', label: 'Morning' },
  { value: 'Evening', label: 'Evening' },
  { value: 'Night', label: 'Night' },
]



const AddNewSlot = () => {


  useTitle("Dashboard | Add New Slot")

  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { register, handleSubmit, control, reset } = useForm();
  const [trainer, setTrainer] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ─ Fetch trainer + classes once ─ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tRes, cRes] = await Promise.all([
          axiosPublic.get(`/add-new-slot/${email}`),
          axiosPublic.get('/admin-classes')
        ]);

        setTrainer(tRes.data.data);
        setClasses(cRes.data.data.map((c) => ({ value: c._id, label: c.name })));

        reset({
          slotName: '',
          slotTime: '',
          days: tRes.data.data.availableDays.map((d) =>
            dayOptions.find((o) => o.value === d)
          )
        });
      } catch (err) {
        Swal.fire('Error', 'Failed to load trainer data.', err);
      } finally {
        setLoading(false);
      }
    };
    if (email) fetchData();
  }, [email, reset]);


  const onSubmit = async (data) => {
    const trainerEmail = trainer.email;
    const trainerImage = trainer.profileImage;
    const trainerID = trainer._id;

    try {
      /* ───────── 1) TRY to add trainer to the class ───────── */
      const addTrainerRes = await axiosPublic.patch(
        `/insert-trainer-in-class/${data.classId.value}`,
        { trainerEmail, trainerImage, trainerID }
      );

      /* If backend returns success === false, throw for catch */
      if (!addTrainerRes.data?.success) {
        throw new Error(addTrainerRes.data?.message || 'Unable to add trainer');
      }

      /* Show success for adding trainer */
      await Swal.fire('Added!', 'Trainer linked to class.', 'success');

      /* ───────── 2) NOW add the slot itself ───────── */
      await axiosPublic.patch(`/add-new-slot/${trainerEmail}`, {
        slotName: data.slotName.value,
        slotDay: data.slotDay.value,
        slotTime:data.slotTime,
        classId: data.classId.value,
        className:data.classId.label,
        trainerID,
        trainerEmail,
        extraInfo: data.extraInfo || '',
        bookedByStudent:[],
      });

      Swal.fire('Success', 'Slot added!', 'success');
      reset();
    } catch (err) {
      /* Error could be duplicate trainer or max‑5 message */
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong';

      Swal.fire('Error', msg, 'error');
    }
  };






  if (loading) return <Loader />;
  if (!trainer) return <p className="text-red-500 p-6">Trainer not found.</p>;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center py-12 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg w-full max-w-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-lime-500 text-center">Add New Slot</h2>

        {/* Read‑only Info in disabled inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              value={trainer.fullName}
              disabled
              className="w-full p-3 rounded bg-[#262626] text-gray-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              value={trainer.email}
              disabled
              className="w-full p-3 rounded bg-[#262626] text-gray-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Current Days</label>
            <input
              value={trainer?.availableDays?.join(', ')}
              disabled
              className="w-full p-3 rounded bg-[#262626] text-gray-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Current Time</label>
            <input
              value={trainer.availableTime}
              disabled
              className="w-full p-3 rounded bg-[#262626] text-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm">Select Days</label>
          <Controller
            disabled
            name="days"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} options={dayOptions} isMulti className="text-black" />
            )}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Slot Name</label>
          <Controller
            name="slotName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={slotNameOption}
                placeholder="Select a Part..."
                className="text-black"
              />
            )}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Slot Time</label>
          <input
            {...register('slotTime', { required: true })}
            className="w-full p-3 rounded bg-[#262626]"
            placeholder="e.g., 6am - 7am"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Slot Day</label>
          <Controller
            name="slotDay"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={dayOptions}
                placeholder="Select a day…"
                className="text-black"
              />
            )}
          />
        </div>

        {/* Class include */}
        <div>
          <label className="block mb-1 text-sm">Class Include</label>
          <Controller

            name="classId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Select {...field} options={classes} className="text-black" />}
          />
        </div>

        {/* Extra Info */}
        <div>
          <label className="block mb-1 text-sm">Extra Info (optional)</label>
          <textarea
            {...register('extraInfo')}
            rows="2"
            className="w-full p-3 rounded bg-[#262626]"
            placeholder="Notes, participant limit, etc."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-lime-600 hover:bg-lime-700 py-3 rounded font-semibold transition cursor-pointer"
        >
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddNewSlot;
