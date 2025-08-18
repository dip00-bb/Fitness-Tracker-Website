import React, { use, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ThemeToggle from '../Components/ThemeToggle';
import { ThemeContext } from '../ThemeContext/DarkLight';

const MainLayout = () => {
    const {mode}=use(ThemeContext)
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className={`${mode==="light"?"bg-teal-50":"bg-black"}`}>
            <header className={`sticky top-0 z-50`}>
                <Navbar />
            </header>

            <main className='w-full'>
                <Outlet />
            </main>
            <div>
                <ThemeToggle className="place-content-center" />
            </div>
            <footer>
                <Footer />
            </footer>
            <Toaster />
        </div>
    );
};

export default MainLayout;