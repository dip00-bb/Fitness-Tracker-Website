// src/layouts/DashboardLayout.jsx
import React, { useState, useContext } from 'react';
import { NavLink, Outlet } from 'react-router';
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

const DashboardLayout = () => {
  const { userRole } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  // reusable link style
  const linkClass =
    'flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700';

  return (
    <div className="min-h-screen bg-base-100 text-base-content grid lg:grid-cols-[260px_1fr]">
      {/* ─────────── Sidebar ─────────── */}
      {/* Overlay – shows only on small screens when sidebar open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-full w-64 overflow-y-auto bg-base-200 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-4 border-b border-base-300 flex items-center lg:hidden">
          <span className="text-lg font-semibold">Dashboard</span>
        </div>

        <ul className="mt-4 space-y-1">
          <li>
            <NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>
              <FaHome /> Home
            </NavLink>
          </li>

          {/* ─── Admin links ───────────────────────────── */}
          {userRole === 'admin' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/all-newsletters"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <FaMedal /> All NewsLetter
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-trainers-list"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <GiMuscleUp /> All Trainers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/pending-trainers"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <MdPending /> Applied Trainers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/add-class"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <FaLocationArrow /> Add Class
                </NavLink>
              </li>
            </>
          )}

          {/* ─── Trainer links ────────────────────────── */}
          {userRole === 'trainer' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/manage-slots"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <FaClipboardList /> Manage Slots
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/add-new-slot"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <FaCalendarPlus /> Add New Slot
                </NavLink>
              </li>
            </>
          )}

          {/* Both trainer & admin */}
          {(userRole === 'trainer' || userRole === 'admin') && (
            <li>
              <NavLink
                to="/dashboard/add-forums"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                <FaPlusCircle /> Add New Forum
              </NavLink>
            </li>
          )}

          {/* ─── Member links ────────────────────────── */}
          {userRole === 'member' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/activity-log"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <FaClipboardList /> Activity Log
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <FaAddressCard /> Profile Page
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/booked-trainer"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserTie /> Booked Trainer
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </aside>

      {/* ─────────── Main content ─────────── */}
      <main className="flex flex-col">
        {/* topbar shown only on mobile */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-base-300 border-b border-base-300">
          <button
            className="btn btn-ghost btn-square p-2"
            aria-label="Open sidebar"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
