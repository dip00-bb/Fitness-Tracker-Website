import React, { use } from 'react';
import { AuthContext } from '../../../../Context/AuthContext/AuthContext';
import TrainerStatsCard from './TrainerStatsCard';

const WelcomePageTrainer = () => {
    const {user}=use(AuthContext)
    return (
        <div>
            <h1 className='text-3xl md:text-5xl font-bold text-white'>Welcome {user.displayName}</h1>
            <div>
                <TrainerStatsCard/>
            </div>
        </div>
    );
};

export default WelcomePageTrainer;