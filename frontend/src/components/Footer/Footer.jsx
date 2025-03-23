import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-indigo-50 w-full p-6 sm:p-10 shadow-md border-t border-indigo-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
        {/* Logo and Navigation Links */}
        <div className="flex flex-col items-center md:items-start gap-5">
          <div className="text-2xl font-bold text-indigo-600">
            <Link to="/">ArtShop</Link>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-5 sm:gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 text-sm sm:text-base font-medium transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/explore"
              className="text-gray-700 hover:text-indigo-600 text-sm sm:text-base font-medium transition-colors duration-300 relative group"
            >
              Explore
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-indigo-600 text-sm sm:text-base font-medium transition-colors duration-300 relative group"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <h1 className="text-xl sm:text-2xl font-semibold text-indigo-600">
            Reach Us
          </h1>
          <p className="text-gray-700 text-sm sm:text-base">
            Email:{" "}
            <a
              href="mailto:manjeet@768"
              className="text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
            >
              manjeet@768
            </a>
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            Contact No.:{" "}
            <a
              href="tel:+916287773228"
              className="text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
            >
              +91 62877 73228
            </a>
          </p>
        </div>

        {/* Copyright Info */}
        <div className="flex flex-col gap-2 text-center md:text-right">
          <p className="text-gray-600 text-sm sm:text-base">
            Copyright © 2024 Manjeet
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            Content owned, maintained, and updated by Department of Manjeet
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            Designed & Developed by: Manjeet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;