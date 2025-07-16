import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-[#0d0d0d] text-gray-300 py-12 px-6">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

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
              <path d="M22.672 15.226l-2.432.811.841 2.515c..." />
            </svg>
            <h3 className="text-2xl font-bold text-white">
              Fit<span className="text-lime-500">Ness</span>
            </h3>
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            Revolutionizing the fitness industry with innovative solutions that empower individuals to lead healthier, more active lifestyles.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center">
          <h4 className="text-xl font-semibold text-lime-500 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-base sm:text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/all-classes" className="hover:text-white transition">Classes</Link>
            </li>
            <li>
              <Link to="/all-trainers" className="hover:text-white transition">Trainers</Link>
            </li>
            <li>
              <Link to="/posts" className="hover:text-white transition">Community</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col items-end">
          <h4 className="text-xl font-semibold text-lime-500 mb-3">Connect</h4>
          <div className="flex gap-5 mb-4">
            <a
              href="https://www.facebook.com/profile.php?id=100090006800919"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-[#1a1a1a] hover:bg-lime-600 transition"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.instagram.com/dipchondo/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-[#1a1a1a] hover:bg-lime-600 transition"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://x.com/MovieLover23667"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-[#1a1a1a] hover:bg-lime-600 transition"
              aria-label="Twitter / X"
            >
              <FaXTwitter size={20} />
            </a>
          </div>

          <div className="space-y-2 text-right">
            <div className="flex items-center gap-2 justify-end">
              <Mail className="h-4 w-4 text-lime-500" />
              <span className="text-sm">info@fittracker.com</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Phone className="h-4 w-4 text-lime-500" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <MapPin className="h-4 w-4 text-lime-500" />
              <span className="text-sm">123 Fitness St, Health City</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-xs sm:text-sm text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} FitTracker. All rights reserved. | Privacy Policy | Terms of Service
      </div>
    </footer>
  );
};

export default Footer;
