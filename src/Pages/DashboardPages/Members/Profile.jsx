// src/pages/dashboard/Profile.jsx
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import axiosPublic from '../../../Hooks/useAxiosPublic';

const Profile = () => {
    const { user, updateUser, setUser } = useContext(AuthContext);


    // local form state
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

    /* ─── handle submit ─── */
    const handleSave = async (e) => {
        e.preventDefault();
        const nowISO = new Date().toISOString();

        try {

            await axiosPublic.patch('/update-profile', {
                email: user.email,
                name: displayName,
                photoURL,
                lastLogin: nowISO
            });


            await updateUser( displayName, photoURL );


            setUser({
                ...user,
                displayName,
                photoURL,
                lastLogin: nowISO
            });

            Swal.fire('Updated!', 'Profile saved successfully.', 'success');
        } catch (err) {
            console.error(err);
            Swal.fire(
                'Error',
                err.response?.data?.message || err.message || 'Could not update profile',
                'error'
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center py-12 px-4">
            <form
                onSubmit={handleSave}
                className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
            >
                <h2 className="text-3xl font-bold text-lime-500 text-center">My Profile</h2>

                {/* Name */}
                <div>
                    <label className="block mb-1 text-sm">Display Name</label>
                    <input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full p-3 rounded bg-[#262626]"
                        placeholder="Your Name"
                        required
                    />
                </div>
                <label className="block mb-1 text-sm">Profile Picture URL</label>


                <input
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full p-3 rounded bg-[#262626]"
                    placeholder="https://example.com/photo.jpg"
                />
                {/* Photo URL */}
                <div className='flex flex-col items-center'>

                    {photoURL && (
                        <img
                            src={photoURL}
                            alt="preview"
                            className="w-20 h-20 rounded-full mt-3 object-cover border-2 border-lime-600"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-lime-600 hover:bg-lime-700 py-3 rounded font-semibold transition cursor-pointer"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;
