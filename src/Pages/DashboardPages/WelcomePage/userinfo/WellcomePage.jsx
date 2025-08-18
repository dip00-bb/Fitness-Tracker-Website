import React, { use } from 'react';
import { AuthContext } from '../../../../Context/AuthContext/AuthContext';
import DashBoardChart from './DashBoardChart';
import UserCards from './UserCard';

const WellcomePage = () => {

    const { user } = use(AuthContext)

    return (
        <div className='text-white'>
            <h1 className='text-4xl md:text-6xl font-bold mb-10 md:mb-20'>Welcome <span className='text-green-400'>{user.displayName}</span> </h1>
            <div>
                <UserCards />
            </div>


            <div className=''>
                <div>
                    <DashBoardChart />
                </div>

            </div>
        </div>
    );
};

export default WellcomePage;