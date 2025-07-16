import { Dumbbell, HeartPulse, Users } from 'lucide-react'; // Optional icons if you're using lucide-react
import React from 'react';

const features = [
  {
    title: 'Personal Training',
    description: 'Get personalized workout plans crafted by expert trainers to meet your unique fitness goals.',
    icon: <Dumbbell size={40} className="text-green-700" />,
  },
  {
    title: 'Healthy Recipes',
    description: 'Access a curated library of high-protein, low-carb recipes to fuel your fitness journey.',
    icon: <HeartPulse size={40} className="text-green-700" />,
  },
  {
    title: 'Community Support',
    description: 'Join a thriving community of fitness enthusiasts for daily motivation and progress sharing.',
    icon: <Users size={40} className="text-green-700" />,
  },
];

const FeaturedSection = () => {
  return (
    <section className="px-4 py-20 bg-black text-white mx-w-auto">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Why <span className="text-lime-500">Choose Us</span></h2>
        <p className="text-gray-400 text-lg md:text-xl">Explore our top features designed to elevate your fitness experience.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#111] p-8 rounded-xl shadow-md hover:shadow-lime-500/40 transition duration-300 text-left"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
