import React, { use } from "react";
import { images } from "../../assets/asset";
import { Link, useNavigate } from "react-router";
import useTitle from "../../Hooks/useTitle";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import { loginSuccessSwal, } from "../../Utils/swal";
import axiosPublic from "../../Hooks/useAxiosPublic";


const Login = () => {

    useTitle('Login')

    const { userLogIn, googleLogIn, user } = use(AuthContext);
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const handleLogin = (data) => {
        userLogIn(data.userEmail, data.userPassword).
            then(() => {
                loginSuccessSwal()
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleGoogleLogin = () => {
        googleLogIn()
            .then((res) => {
                const user = res.user

                const userInformation = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    userRole: "member",
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                };

                loginSuccessSwal()
                navigate(`${location.state ? location.state : '/'}`);


                axiosPublic.post('/addNewUser', userInformation)
                    .then(() => {
                        return

                    }).catch((err) => {
                        return
                    })


            }).catch(errors => {
                console.log(errors)
            })
    }

    return (
        <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-11/12 mx-auto py-12 gap-8 text-white">

            {/* Form Section */}
            <div className="w-full md:w-1/2 shadow-md p-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-red-500">
                    Welcome Back to <span className="text-white">FitNex</span>
                </h2>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input

                            {...register("userEmail")}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-red-500 py-2 text-white"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input

                            {...register("userPassword")}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-red-500 py-2 text-white"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 transition duration-300 cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                {/* Social Login Placeholder */}
                <div className="mt-6 text-center">
                    <p className="mb-2">Or login with</p>
                    {/* You can add Google/Facebook buttons here */}
                    <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </div>

                {/* Toggle to Register */}
                <p className="text-center mt-6">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-red-400 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
                <img
                    src={images.loginImg}
                    alt="Login"
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
};

export default Login;
