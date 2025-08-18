import React, { use } from 'react';
import { AuthContext } from '../../../../Context/AuthContext/AuthContext';
import TrainerStatsCard from './TrainerStatsCard';
import TrainerBarChart from './TrainerBarChart';
import ClassBookingPieChart from './ClassBookingPieChart';

const WelcomePageTrainer = () => {
    const {user}=use(AuthContext)
    return (
        <div className='space-y-10 md:space-y-20'>
            <h1 className='text-3xl md:text-5xl font-bold text-white'>Welcome {user.displayName}</h1>
            <div>
                <TrainerStatsCard/>
            </div>
            <div>
                <TrainerBarChart/>
            </div>
            <div>
                <ClassBookingPieChart/>
            </div>
        </div>
    );
};

export default WelcomePageTrainer;