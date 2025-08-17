
import React, { useState, useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import Avatar from '@mui/material/Avatar';
import {
  FaHome,
  FaLocationArrow,
  FaMedal,
  FaPlusCircle,
  FaCalendarPlus,
  FaClipboardList,
  FaUserTie,
  FaAddressCard,
} from 'react-icons/fa';
import { GiMuscleUp } from 'react-icons/gi';
import { MdPending } from 'react-icons/md';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import { FaDollarSign } from 'react-icons/fa6';

const DashboardLayout = () => {
  const { userRole, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const targetRuleRoute = {
    admin: 'admin-welcome-page',
    trainer: 'trainer-welcome-page',
    member: 'user-welcome-page',
  };
  const redirectRoute = targetRuleRoute[userRole];

  const linkClass = 'flex items-center gap-2 px-4 py-2';

  return (
    <div className="min-h-screen bg-base-100 text-base-content lg:pl-64">
      {/* overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-[#0D1117] fixed top-0 left-0 z-40 h-full w-64
          overflow-y-auto transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          grid grid-rows-[auto,1fr,auto] overflow-hidden`}
      >
        {/* Avatar & User Info */}
        <div className="py-6 self-center">
          <Avatar
            sx={{ width: 80, height: 80 }}
            className="mx-auto border-2 border-[#288647] shadow-md"
            alt={user?.displayName || 'User Avatar'}
            src={user?.photoURL}
          />
          <p className="text-center mt-3 text-white font-medium">{user?.displayName}</p>
          <p className="text-center mt-1 text-white text-sm">{user?.email}</p>
        </div>

        {/* Nav Links */}
        <ul className="space-y-1 text-white px-2">
          <li>
            <NavLink
              to={`/dashboard/${redirectRoute}`}
              className={`${linkClass} active-route-dashboard`}
              onClick={() => setIsOpen(false)}
            >
              <FaHome /> Home
            </NavLink>
          </li>

          {userRole === 'admin' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/all-newsletters"
                  className={`${linkClass} active-route-dashboard`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaMedal /> All NewsLetter
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-trainers-list"
                  className={`${linkClass} active-route-dashboard`}
                  onClick={() => setIsOpen(false)}
                >
                  <GiMuscleUp /> All Trainers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/pending-trainers"
                  className={`${linkClass} active-route-dashboard`}
                  onClick={() => setIsOpen(false)}
                >
                  <MdPending /> Applied Trainers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/add-class"
                  className={`${linkClass} active-route-dashboard`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaLocationArrow /> Add Class
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/balance"
                  className={`${linkClass} active-route-dashboard`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaDollarSign /> Balance
                </NavLink>
              </li>
            </>
          )}

          {userRole === 'trainer' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/manage-slots"
                  className={`${linkClass} active-route-dashboard`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaClipboardList /> Manage Slots
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/add-new-slot"
                  className={`${linkClass} active-route-dashboard`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaCalendarPlus /> Add New Slot
                </NavLink>
              </li>
            </>
          )}

          {(userRole === 'trainer' || userRole === 'admin') && (
            <li>
              <NavLink
                to="/dashboard/add-forums"
                className={`${linkClass} active-route-dashboard`}
                onClick={() => setIsOpen(false)}
              >
                <FaPlusCircle /> Add New Forum
              </NavLink>
            </li>
          )}

          {userRole === 'member' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/activity-log"
                  className={`${linkClass} active-route-dashboard`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaClipboardList /> Activity Log
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={`${linkClass} active-route-dashboard`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaAddressCard /> Profile Page
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/booked-trainer"
                  className={`${linkClass} active-route-dashboard`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserTie /> Booked Trainer
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Footer */}
        <div className="py-4 border-t border-gray-700 text-center self-end">
          <Link
            to="/"
            className="text-white block hover:text-[#1F6FEB] transition"
          >
            Back Home
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-col">
        {/* topbar only on mobile */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-base-300 border-b border-base-300">
          <button
            className="btn btn-ghost btn-square p-2"
            aria-label="Open sidebar"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="white"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-lg font-semibold">Dashboard</span>
        </header>

        {/* outlet */}
        <section className="p-4 flex-1 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
