
import React from "react";
import { images } from "../../assets/asset";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Banner = () => {
    return (
        <div className="relative h-[70vh] overflow-hidden">
            {/* Background image + content */}
            <div
                className="relative z-10 px-4 flex justify-center items-center h-full"
                style={{
                    backgroundImage: `url(${images.bannerImg})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Left Content */}
                <div className="p-6 rounded-lg text-lime-500 md:w-1/2 flex flex-col items-center">
                    {/* Animated Heading */}
                    <motion.h1
                        className="text-5xl md:text-9xl font-bold mb-4 text-center"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        Unleash <span className="text-white">Your Power</span>
                    </motion.h1>

                    {/* Animated Subtext */}
                    <motion.p
                        className="text-xl md:text-3xl mb-6 text-lime-400 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    >
                        Build strength, sculpt your body, and transform your lifestyle with expert-guided training programs.
                    </motion.p>

                    {/* Animated Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <Link
                            to="/all-classes"
                            className="bg-lime-400 w-fit text-black px-6 py-3 uppercase tracking-wide font-semibold hover:bg-lime-700 transition-all duration-300 cursor-pointer rounded-2xl"
                        >
                            Explore Classes
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

