import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <header className='top-0 sticky'>
                <Navbar />
            </header>
            <Outlet />
        </div>
    );
};

export default MainLayout;