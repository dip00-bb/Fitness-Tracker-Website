import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MainLayout = () => {
    useEffect(()=>{
        AOS.init();
    },[])
    return (
        <div>
            <header className='sticky top-0 z-50'>
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