
import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosPublic from "../../Hooks/useAxiosPublic";

const Newsletter = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            return Swal.fire({
                icon: "error",
                title: "Both fields are required!",
                background: "#1f1f1f",
                color: "#fff",
                confirmButtonColor: "#ef4444"
            });
        }

        try {
            const response = await axiosPublic.post("/newsletter-subscribe", formData);


            if (response.data.insertedId || response.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Subscribed Successfully!",
                    background: "#1f1f1f",
                    color: "#fff",
                    confirmButtonColor: "#ef4444"
                });
                setFormData({ name: "", email: "" });
            }


            else if (response.status === 409) {
                Swal.fire({
                    icon: "success",
                    title: "You are already subscribed!",
                    background: "#1f1f1f",
                    color: "#fff",
                    confirmButtonColor: "#ef4444"
                });
            }

        } catch (err) {

            if (err.response?.status === 409) {
                Swal.fire({
                    title: "Already Subscribed",
                    text: err.response.data.error,
                    icon: "info",
                    confirmButtonColor: "#d33",
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong!",
                    background: "#1f1f1f",
                    color: "#fff",
                    confirmButtonColor: "#ef4444"
                });
            }
        }
    };

    return (
        <div className="text-white mx-w-auto py-10">
            <div className="py-10 md:flex items-center justify-between gap-10 bg-black">
                {/* Left Content */}
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        Stay <span className="text-lime-500">Updated</span>
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl">
                        Subscribe to our newsletter for the latest workouts, tips, and exclusive updates.
                    </p>
                </div>

                {/* Right Form */}
                <div className="md:w-1/2 w-full">
                    <form
                        onSubmit={handleSubscribe}
                        className="flex flex-col md:flex-row items-center gap-4"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full md:flex-1 px-4 py-3 bg-transparent border-b border-gray-500 text-white placeholder-gray-400 focus:outline-none text-xl"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full md:flex-1 px-4 py-3 bg-transparent border-b border-gray-500 text-white placeholder-gray-400 focus:outline-none text-xl"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 font-semibold uppercase text-xl tracking-wider transition rounded-none cursor-pointer"
                        >
                            Subscribe Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
