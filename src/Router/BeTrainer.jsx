import React, { use, useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import axiosPublic from '../Hooks/useAxiosPublic';
import useTitle from '../Hooks/useTitle';

const daysOptions = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
];


// const slotName = [
//     { value: 'Morning', label: 'Morning' },
//     { value: 'Evening', label: 'Evening' },
//     { value: 'Night', label: 'Night' },
// ]

const skillsOptions = [
    'Yoga',
    'Weight Training',
    'Cardio',
    'Nutrition',
    'Bodybuilding',
];

const BeTrainerForm = () => {

    useTitle('Be Trainer')

    const { user } = use(AuthContext);
    const userEmail = user?.email;
    const fullName = user?.displayName;

    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        profileImage: '',
        availableDays: [],
        // availableDayPart:'',
        availableTime: '',
        skills: [],
        experience: '',
        socialLinks: {
            facebook: '',
            instagram: '',
            x: '',
        },
        otherInfo: '',
    });

    const handleSkillsChange = (skill) => {
        setFormData((prev) => {
            const skills = prev.skills.includes(skill)
                ? prev.skills.filter((s) => s !== skill)
                : [...prev.skills, skill];
            return { ...prev, skills };
        });
    };

    const handleDaysChange = (selectedOptions) => {
        setFormData((prev) => ({ ...prev, availableDays: selectedOptions }));
        // console.log(formData.availableDays)
    };

    // const handleDayPartChange = (selectedOptions) => {
    //     setFormData((prev) =>({ ...prev, availableDayPart: selectedOptions }));
    //     console.log(formData.availableDayPart)
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            email: userEmail,
            fullName: fullName,
            availableDays: formData.availableDays.map((d) => d.value),
            // availableDayPart:formData.availableDayPart.map((d)=>d.value)
        };

        try {
            const res = await axiosPublic.post('/be-trainer', payload);
            const data = res.data;

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Applied!',
                    text: 'Your trainer application is submitted.',
                });
            } else if (data.message === 'Trainer already applied') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Already Applied!',
                    text: 'You have already submitted your application.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Something went wrong!',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Request Failed',
                text: error.message || 'Failed to submit application.',
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-[#1a1a1a] rounded-xl text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Apply to be a Trainer</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-1">Full Name</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded bg-gray-700 text-white cursor-not-allowed"
                        value={fullName}
                        readOnly

                    />
                </div>

                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={userEmail}
                        readOnly
                        className="w-full p-3 rounded bg-gray-700 text-white cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block mb-1">Age</label>
                    <input
                        type="number"
                        className="w-full p-3 rounded bg-[#2a2a2a] text-white"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Profile Image URL</label>
                    <input
                        type="url"
                        className="w-full p-3 rounded bg-[#2a2a2a] text-white"
                        value={formData.profileImage}
                        onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block mb-1">Skills</label>
                    <div className="flex flex-wrap gap-3">
                        {skillsOptions.map((skill) => (
                            <label key={skill} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.skills.includes(skill)}
                                    onChange={() => handleSkillsChange(skill)}
                                />
                                {skill}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Available Days</label>
                    <Select
                        isMulti
                        options={daysOptions}
                        onChange={handleDaysChange}
                        value={formData.availableDays}
                        className="text-black"
                    />
                </div>

                {/* <div>
                    <label className="block mb-1">Slot Time</label>
                    <Select
                        isMulti
                        options={slotName}
                        onChange={handleDayPartChange}
                        value={formData.availableDayPart}
                        className="text-black"
                    />
                </div> */}


                <div>
                    <label className="block mb-1">Available Time (hour) </label>
                    <input
                        type="text"
                        className="w-full p-3 rounded bg-[#2a2a2a] text-white"
                        placeholder='Ex: 1'
                        value={formData.availableTime}
                        onChange={(e) => setFormData({ ...formData, availableTime: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block mb-1">Years of Experience</label>
                    <input
                        type="number"
                        className="w-full p-3 rounded bg-[#2a2a2a] text-white"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block mb-1">Social Media Links (Optional)</label>
                    <div className="flex gap-4 flex-col md:flex-row">
                        <input
                            type="url"
                            placeholder="Facebook URL"
                            className="flex-1 p-3 rounded bg-[#2a2a2a] text-white"
                            value={formData.socialLinks.facebook}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    socialLinks: { ...prev.socialLinks, facebook: e.target.value },
                                }))
                            }
                        />
                        <input
                            type="url"
                            placeholder="Instagram URL"
                            className="flex-1 p-3 rounded bg-[#2a2a2a] text-white"
                            value={formData.socialLinks.instagram}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    socialLinks: { ...prev.socialLinks, instagram: e.target.value },
                                }))
                            }
                        />
                        <input
                            type="url"
                            placeholder="X (Twitter) URL"
                            className="flex-1 p-3 rounded bg-[#2a2a2a] text-white"
                            value={formData.socialLinks.x}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    socialLinks: { ...prev.socialLinks, x: e.target.value },
                                }))
                            }
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Other Information</label>
                    <textarea
                        rows="4"
                        className="w-full p-3 rounded bg-[#2a2a2a] text-white"
                        value={formData.otherInfo}
                        onChange={(e) => setFormData({ ...formData, otherInfo: e.target.value })}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-red-600 w-full py-3 rounded text-xl font-semibold hover:bg-red-700 transition cursor-pointer"
                >
                    Apply Now
                </button>
            </form>
        </div>
    );
};

export default BeTrainerForm;
