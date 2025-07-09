import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaMoneyCheckAlt, FaUserCircle, FaLocationArrow, FaUserCheck, FaClock, FaMotorcycle, FaTasks, FaMedal } from 'react-icons/fa';
import { GiMuscleUp } from 'react-icons/gi';
import { MdPending } from 'react-icons/md';

const DashboardLayout = () => {

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                </div>
                {/* Page content here */}
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4"></ul>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">

                    <li>
                        <NavLink to='/'>
                            <FaHome className="inline mr-2" /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/all-newsletters'>
                            <FaMedal className="inline mr-2" /> All NewsLetter
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/all-trainers'>
                            <GiMuscleUp className="inline mr-2" /> All Trainers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/pending-trainers'>
                            <MdPending className="inline mr-2" />  Applied Trainers
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/dashboard/track'>
                            <FaLocationArrow className="inline mr-2" /> Track Package
                        </NavLink>
                    </li>


                    {/* rider links */}

                    {

                        <>
                            <li>
                                <NavLink to='/dashboard/pending-deliveries'>
                                    <FaTasks className="inline mr-2" /> Pending Deliveries
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/my-earning'>
                                    <FaMoneyCheckAlt className="inline mr-2" /> My Earning
                                </NavLink>
                            </li>
                        </>
                    }





                    {/* admin link */}

                    {


                        <>
                            <li>
                                <NavLink to='/dashboard/pending-rider'>
                                    <FaUserCheck className="inline mr-2" /> Pending Rider
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/approved-rider'>
                                    <FaClock className="inline mr-2" /> Active Rider
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/makeAdmin'>
                                    <FaUserCheck className="inline mr-2" /> Make Admin
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/assign-rider'>
                                    <FaMotorcycle className="inline mr-2" /> Assign Rider
                                </NavLink>
                            </li>
                        </>
                    }

                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;