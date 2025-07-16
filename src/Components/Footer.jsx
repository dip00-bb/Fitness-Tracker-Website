import React from 'react';
import { FaFacebookF, FaYoutube, FaFacebookMessenger } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => (
  <footer className="bg-[#0d0d0d] text-gray-300 py-12 px-6 sm:px-10 md:px-16">
    <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

      {/* Brand / About */}
      <div className="text-xl">
        <div className="flex items-center gap-3 mb-3">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-lime-500"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c..."></path>
          </svg>
          <h3 className="text-2xl font-bold text-white">
            FIT<span className="text-lime-500">REX</span>
          </h3>
        </div>
        <p className="text-sm leading-relaxed max-w-sm">
          FITREX — powering healthier, stronger lifestyles since 1992.
          <br />Train. Track. Transform.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-xl font-semibold text-lime-500 mb-3">Quick Links</h4>
        <ul className="space-y-2 text-base sm:text-sm">
          <li>
            <Link to="/" className="hover:text-white transition text-base sm:text-sm">
              Home
            </Link>
          </li>
          <li>
            <Link to="/all-classes" className="hover:text-white transition text-base sm:text-sm">
              Classes
            </Link>
          </li>
          <li>
            <Link to="/all-trainers" className="hover:text-white transition text-base sm:text-sm">
              Trainers
            </Link>
          </li>
          <li>
            <Link to="/community" className="hover:text-white transition text-base sm:text-sm">
              Community
            </Link>
          </li>
        </ul>
      </div>

      {/* Social & Contact */}
      <div>
        <h4 className="text-xl font-semibold text-lime-500 mb-3">Connect</h4>
        <div className="flex gap-5 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-[#1a1a1a] hover:bg-lime-600 transition"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-[#1a1a1a] hover:bg-lime-600 transition"
            aria-label="YouTube"
          >
            <FaYoutube size={20} />
          </a>
          <a
            href="https://m.me"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-[#1a1a1a] hover:bg-lime-600 transition"
            aria-label="Messenger"
          >
            <FaFacebookMessenger size={20} />
          </a>
        </div>
        <p className="text-base sm:text-sm leading-relaxed max-w-xs">
          123 Muscle Ave, Fitness City<br />
          support@fitrex.com<br />
          +01870921***
        </p>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="mt-10 text-center text-xs sm:text-sm text-gray-500 border-t border-gray-700 pt-6">
      © {new Date().getFullYear()} FITREX. All rights reserved.
    </div>
  </footer>
);

export default Footer;
