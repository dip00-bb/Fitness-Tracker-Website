import React, { use, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext/AuthContext'
import { images } from '../assets/asset';

const Navbar = () => {


    const [menuOpen, setMenuOpen] = useState(false);

    const { user, signout } = use(AuthContext);

    const handleLogout = () => {
        signout()
    }



    const link =
        <>
            <li><NavLink className='text-[1.2rem] hover:text-green-500'>Home</NavLink></li>
            <li><NavLink to='/all-trainers' className='text-[1.2rem] hover:text-green-500'>All Trainer</NavLink></li>
            <li><NavLink to='/all-classes' className='text-[1.2rem] hover:text-green-500'>All Class</NavLink></li>
            <li><NavLink to='/posts' className='text-[1.2rem] hover:text-green-500'>Posts</NavLink></li>
            {
                user &&

                <>
                    <li><NavLink to='/dashboard/all-newsletters' className='text-[1.2rem] hover:text-green-500'>Dashboard</NavLink></li>
                    <li><NavLink className='text-[1.2rem] hover:text-green-500'>User Profile</NavLink></li>
                </>
            }


        </>

    const register = <>
        {
            user ?


                <>
                    <li><NavLink onClick={handleLogout} className='btn'>Logout</NavLink></li>

                    <div className="avatar">
                        <div className="ring ring-offset-base-100 w-12 rounded-full ring-offset-2">
                            <img src={user.photoURL} alt={user.displayName} />
                        </div>
                    </div>
                </>

                :

                <>
                    <li><NavLink to='/login' className='btn bg-green-600/70 border-0'>Login</NavLink></li>
                    <li><NavLink to='/register' className='btn bg-green-600/70 border-0'>Register</NavLink></li>
                </>
        }
    </>

    return (
        <div className="py-6">
            <nav className="max-w-[90%] mx-auto p-3 rounded-[2rem] border border-gray-700 shadow-sm bg-transparent flex items-center justify-between">
                {/* Left: Logo & Mobile Menu Toggle */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 focus:outline-none"
                        aria-label="Toggle Menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-800"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>

                    {/* Logo (shown only on large screens) */}
                    <NavLink to="/" className="hidden lg:block h-12">
                        <img className="h-full w-auto" src={images.webLogo} alt="logo" />
                    </NavLink>
                </div>

                {/* Center: Horizontal Menu (visible on large screens) */}
                <div className="hidden lg:flex items-center">
                    <ul className="flex gap-4 list-none">
                        {link}
                    </ul>
                </div>

                {/* Right: Register / Login */}
                <div className="flex items-center space-x-2 list-none">
                    {register}
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="lg:hidden mt-2 px-5 transition-all">
                    <ul className="bg-gray-800 shadow-md rounded-xl p-3 space-y-2">
                        {link}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;