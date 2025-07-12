import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <Outlet />

            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default MainLayout;