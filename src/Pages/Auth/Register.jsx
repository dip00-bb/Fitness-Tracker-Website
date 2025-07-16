import React, { use } from "react";
import registerImg from "../../assets/register.png"; // Update path if needed
import useTitle from "../../Hooks/useTitle";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axiosPublic from "../../Hooks/useAxiosPublic";
import { errorSwal, registerSuccessSwal } from "../../Utils/swal";

const Register = () => {

    useTitle('Register')
    const { userRegister, updateUser, setUser } = use(AuthContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        userRegister(data.userEmail, data.userPassword)
            .then((res) => {
                if (res.user) {

                    const user=res.user
                    updateUser(data.userName, data.userPhoto).then(() => {

                        setUser({ ...user, displayName: data.userName, photoURL: data.userPhoto });

                        const userInformation = {
                            name: data.userName,
                            email: data.userEmail,
                            photoURL: data.userPhoto,
                            userRole: "member", // default: can be 'member'
                            createdAt: new Date().toISOString(),
                            lastLogin: new Date().toISOString()
                        };

                        axiosPublic.post('/addNewUser', userInformation)
                            .then(() => {
                                registerSuccessSwal(data.userName)
                                navigate('/')
                            }).catch((err) => {
                                errorSwal(err.message)
                            })

                    }).catch(error => {
                        setUser(user)
                        errorSwal(error.message)
                    })

                }


            })
            .catch((error) => {
                errorSwal(`${error.message} koi moi`)
            });
    };

    return (
        <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-11/12 mx-auto py-12 gap-8 text-gray-300">

            {/* Form Section */}
            <div className="w-full md:w-1/2 p-6">
                <h2 className="text-2xl md:text-5xl font-bold mb-10 text-center text-white">
                    Join <span className="text-red-700">FitNex</span> and Start Your Journey
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input

                            {...register("userName")}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border-b-2 border-white focus:outline-none focus:border-red-500 py-2"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input

                            {...register("userEmail")}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border-b-2 border-white focus:outline-none focus:border-red-500 py-2"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block mb-1 font-medium">Photo URL</label>
                        <input

                            {...register("userPhoto")}
                            type="text"
                            placeholder="Enter photo URL"
                            className="w-full border-b-2 border-white focus:outline-none focus:border-red-500 py-2"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input

                            {...register("userPassword")}
                            type="password"
                            placeholder="Enter password"
                            className="w-full border-b-2 border-white focus:outline-none focus:border-red-500 py-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 transition duration-300 text-2xl cursor-pointer"
                    >
                        Register
                    </button>
                </form>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
                <img
                    src={registerImg}
                    alt="Register"
                    className="w-full h-auto rounded-xl"
                />
            </div>
        </div>
    );
};

export default Register;
