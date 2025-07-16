import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>

            <main className='w-full'>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
            <Toaster />
        </div>
    );
};

export default MainLayout;