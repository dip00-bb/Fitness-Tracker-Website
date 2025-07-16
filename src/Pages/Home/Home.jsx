import React from 'react';
import Banner from './Banner';
import Newsletter from './Newsletter';
import FeaturedSection from './FeaturedSection';
import About from './About';
import TestimonialCarousel from './Reviews';
import TeamSection from './Team';
import useTitle from '../../Hooks/useTitle';
import FeaturedClasses from './FeaturedClasses';

const Home = () => {
    useTitle("Home")
    return (
        <div>
            <Banner />
            <FeaturedSection />
            <About />
            <FeaturedClasses />
            <TestimonialCarousel />
            <Newsletter />
            <TeamSection />
        </div>
    );
};

export default Home;