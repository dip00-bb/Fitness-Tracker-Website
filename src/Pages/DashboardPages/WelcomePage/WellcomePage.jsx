import React, { use } from 'react';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import DashBoardChart from '../../../Components/DashBoardChart';

const WellcomePage = () => {

    const { user } = use(AuthContext)

    return (
        <div className='text-white'>
            <h1 className='text-4xl md:text-6xl font-bold mb-10 md:mb-20'>Welcome <span className='text-green-400'>{user.displayName}</span> </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 md:mb-20">

                <div className="card-bg text-white p-6 rounded-sm shadow-lg transform transition hover:scale-105">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">Total Classes</h1>
                    <p className="text-2xl md:text-3xl font-medium text-center ">3</p>
                </div>


                <div className="card-bg text-white p-6 rounded-sm shadow-lg transform transition hover:scale-105">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">Attendance</h1>
                    <p className="text-2xl md:text-3xl font-medium text-center ">70%</p>
                </div>


                <div className="card-bg text-white p-6 rounded-sm shadow-lg transform transition hover:scale-105">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">Total in Month</h1>
                    <p className="text-2xl md:text-3xl font-medium text-center ">50 Hours</p>
                </div>
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