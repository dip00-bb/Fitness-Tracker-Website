import React from "react";
import { images } from "../../assets/asset";

const About = () => {
    return (
        <section className="bg-black text-white px-4 py-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Left Content - Text */}
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        <span className="text-red-500">About</span> Our Mission
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl mb-4">
                        We are not just a fitness platform — we're a movement. Our goal is to empower individuals of all levels to take control of their physical and mental well-being.
                    </p>
                    <p className="text-gray-400 text-base">
                        From personalized training to community challenges, our platform is built for those who are serious about transformation. Join us and become part of something bigger than the gym — a lifestyle revolution.
                    </p>
                </div>

                {/* Right Content - Image */}
                <div className="w-full h-full">
                    <img
                        src={images.aboutImg}
                        alt="About Us"
                        className="rounded-xl w-full object-cover shadow-xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
