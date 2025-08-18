import React from 'react';
import AdminCards from './AdminCards';
import TrafficSources from './AdminTrafic';
import CountryVisitors from './CountryVisitors';
import CompanyCostChart from './CompanyCostChart';





const WelcomePageAdmin = () => {
    return (
        <div className='text-white space-y-10 md:space-y-20'>
            <p className='text-3xl md:text-5xl font-bold'>Monitor Everything Any Where</p>

            <div> <AdminCards /> </div>

            <div className="flex flex-wrap gap-10">
                <div className='flex-1'>
                    <TrafficSources  />
                </div>
                <div className='flex-1' >
                    <CountryVisitors   />
                </div>
            </div>

            <div>
                <CompanyCostChart/>
            </div>
        </div>
    );
};

export default WelcomePageAdmin;