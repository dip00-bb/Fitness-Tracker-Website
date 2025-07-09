import React from 'react';
import Banner from './Banner';
import Newsletter from './Newsletter';
import FeaturedSection from './FeaturedSection';
import About from './About';
import ReviewCarousel from './Reviews';
import TestimonialCarousel from './Reviews';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedSection/>
            <About/>
            <Newsletter/>
            <TestimonialCarousel/>
        </div>
    );
};

export default Home;