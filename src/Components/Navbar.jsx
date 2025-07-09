import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext/AuthContext'
import { images } from '../assets/asset';

const Navbar = () => {




    const { user, signout } = use(AuthContext);

    const handleLogout = () => {
        signout()
    }



    const link =
        <>
            <li><NavLink className='text-[1.2rem] hover:text-green-500'>Home</NavLink></li>
            <li><NavLink className='text-[1.2rem] hover:text-green-500'>All Trainer</NavLink></li>
            <li><NavLink className='text-[1.2rem] hover:text-green-500'>All Class</NavLink></li>
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
        <div className='py-4'>
            <div className='navbar bg-transparent border-gray-700 border-1 rounded-4xl px-5 max-w-10/11 mx-auto shadow-sm'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                link
                            }
                        </ul>
                    </div>
                    <NavLink to='/' className="md:h-12 hidden lg:block">
                        <img className='w-full h-full' src={images.webLogo} alt="logo" />
                    </NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="space-x-3 menu-horizontal px-1 list-none">
                        {
                            link
                        }
                    </ul>
                </div>
                <div className="navbar-end list-none space-x-2">
                    {
                        register
                    }
                </div >
            </div>
        </div >
    );
};

export default Navbar;