import React from 'react';
import Banner from './Banner';
import Newsletter from './Newsletter';
import FeaturedSection from './FeaturedSection';
import About from './About';
import ReviewCarousel from './Reviews';
import TestimonialCarousel from './Reviews';
import TeamSection from './Team';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedSection/>
            <About/>
            <Newsletter/>
            <TestimonialCarousel/>
            <TeamSection/>
        </div>
    );
};

export default Home;