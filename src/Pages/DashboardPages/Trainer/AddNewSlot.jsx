// src/pages/trainer/AddNewSlot.jsx
import React, { use, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';
import axiosPublic from '../../../Hooks/useAxiosPublic';
import Loader from '../../../Utils/Loader';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';


const dayOptions = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' }
];

const AddNewSlot = () => {
    const { user } = use(AuthContext);
    
    const email=user?.email

    const { register, handleSubmit, control, reset } = useForm();
    const [trainer, setTrainer] = useState(null);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    /* ─── Fetch trainer & class list on mount ─── */

   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trainerRes, classRes] = await Promise.all([
                    axiosPublic.get(`/add-new-slot/${email}`),
                    axiosPublic.get('/admin-classes')
                ]);
                setTrainer(trainerRes.data.data);
                setClasses(
                    classRes.data.data.map((c) => ({ value: c._id, label: c.name }))
                );
                reset({
                    slotName: '',
                    slotTime: '',
                    days: trainerRes.data.data.availableDays.map((d) =>
                        dayOptions.find((o) => o.value === d)
                    )
                });
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed to load data', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [email, reset]);

    /* ─── Submit handler ─── */
    const onSubmit = async (data) => {
        try {
            await axiosPublic.post(`/add-new-slot/${email}`, {
                day: data.days.map((d) => d.value),     // array of days
                slotName: data.slotName,
                slotTime: data.slotTime,
                classId: data.classId.value,
                extraInfo: data.extraInfo
            });
            Swal.fire('Success', 'Slot added!', 'success');
            reset();                     // clear form after success
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Could not add slot', 'error');
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
                <h2 className="text-3xl font-bold text-red-500 mb-4 text-center">
                    Add New Slot
                </h2>

                {/* Read‑only trainer info */}
                <div className="flex gap-6 items-center">
                    <img
                        src={trainer.profileImage}
                        alt={trainer.fullName}
                        className="w-24 h-24 rounded-full border-2 border-red-600 object-cover"
                    />
                    <div>
                        <p className="font-semibold">{trainer.fullName}</p>
                        <p className="text-gray-400 text-sm">{trainer.email}</p>
                        <p className="text-gray-400 text-sm">
                            Current days: {trainer.availableDays.join(', ')}
                        </p>
                        <p className="text-gray-400 text-sm">
                            Current time: {trainer.availableTime}
                        </p>
                    </div>
                </div>

                {/* Select days (multi) */}
                <div>
                    <label className="block mb-1 text-sm">Select Days</label>
                    <Controller
                        name="days"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={dayOptions}
                                isMulti
                                className="text-black"
                            />
                        )}
                    />
                </div>

                {/* Slot Name */}
                <div>
                    <label className="block mb-1 text-sm">Slot Name</label>
                    <input
                        {...register('slotName', { required: true })}
                        className="w-full p-3 rounded bg-[#262626] focus:outline-none"
                        placeholder="e.g., Morning Slot"
                    />
                </div>

                {/* Slot Time */}
                <div>
                    <label className="block mb-1 text-sm">Slot Time</label>
                    <input
                        {...register('slotTime', { required: true })}
                        className="w-full p-3 rounded bg-[#262626] focus:outline-none"
                        placeholder="e.g., 6am - 7am"
                    />
                </div>

                {/* Classes include */}
                <div>
                    <label className="block mb-1 text-sm">Class Include</label>
                    <Controller
                        name="classId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select {...field} options={classes} className="text-black" />
                        )}
                    />
                </div>

                {/* Extra Info */}
                <div>
                    <label className="block mb-1 text-sm">Extra Info (optional)</label>
                    <textarea
                        {...register('extraInfo')}
                        rows="2"
                        className="w-full p-3 rounded bg-[#262626] focus:outline-none"
                        placeholder="Notes, participant limit, etc."
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold transition"
                >
                    Add Slot
                </button>
            </form>
        </div>
    );
};

export default AddNewSlot;
