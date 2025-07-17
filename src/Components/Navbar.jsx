import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { images } from '../assets/asset';
import Loader from '../Utils/Loader';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signout, userRole,roleLoading } = useContext(AuthContext);


  if(roleLoading){
    return <Loader/>
  }

  const targetRuleRoute = {
    admin: "all-newsletters",
    trainer: "manage-slots",
    member: "activity-log",
  };
  const redirectRoute = targetRuleRoute[userRole] || "activity-log";



  const handleLogout = () => signout();

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="text-[1.2rem] hover:text-green-500 transition-colors"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-trainers"
          className="text-[1.2rem] hover:text-green-500 transition-colors"
        >
          All Trainer
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-classes"
          className="text-[1.2rem] hover:text-green-500 transition-colors"
        >
          All Class
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/posts"
          className="text-[1.2rem] hover:text-green-500 transition-colors"
        >
          Forums
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to={`/dashboard/${redirectRoute}`}
              className="text-[1.2rem] hover:text-green-500 transition-colors"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-profile"
              className="text-[1.2rem] hover:text-green-500 transition-colors"
            >
              User Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const authButtons = user ? (
    <>
      <li>
        <button
          onClick={handleLogout}
          className="inline-flex items-center px-4 py-3 text-sm font-semibold rounded-md bg-red-600/90 hover:bg-red-700 text-white transition-colors cursor-pointer"
        >
          Logout
        </button>
      </li>
      <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-gray-300">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="object-cover w-full h-full"
        />
      </div>
    </>
  ) : (
    <>
      <li>
        <NavLink
          to="/login"
          className="inline-flex items-center px-4 py-3 text-sm font-semibold rounded-md bg-green-600/80 hover:bg-green-700 text-white transition-colors"
        >
          Login
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/register"
          className="inline-flex items-center px-4 py-3 text-sm font-semibold rounded-md bg-green-600/80 hover:bg-green-700 text-white transition-colors"
        >
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="py-6 text-white">
      <nav className="max-w-[90%] mx-auto px-6 py-3 rounded-3xl border border-gray-700 bg-transparent shadow-sm flex items-center justify-between">

        <div className="flex items-center gap-4">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>


          <NavLink to="/" className="hidden lg:block h-12">
            <img src={images.webLogo} alt="logo" className="h-full w-auto" />
          </NavLink>
        </div>


        <ul className="hidden lg:flex items-center gap-4">{navLinks}</ul>


        <ul className="flex items-center gap-3">{authButtons}</ul>
      </nav>

      {menuOpen && (
        <ul className="lg:hidden mt-2 mx-auto max-w-[90%] bg-gray-800/90 rounded-xl p-4 space-y-2 shadow-md">
          {navLinks}
          <hr className="border-gray-700" />
          {authButtons}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
