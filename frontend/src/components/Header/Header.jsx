import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoReorderThree } from "react-icons/io5";
import { logout } from "../../store/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { url } from "../bacxkendUrl/BackendUrl";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, admin } = useSelector((st) => st.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const data = await axios.get(`${url}/user/logout`, {
        withCredentials: true,
        withXSRFToken: true,
      });
      const res = data.data;

      if (res.success) {
        dispatch(logout());
        toast.success(res.message);
        navigate("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <div className="bg-indigo-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ArtShop
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-gray-700 hover:text-indigo-600 text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IoReorderThree />
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center gap-4 md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-indigo-50 md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all duration-300`}
        >
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 text-base md:text-lg font-medium transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/order-page"
            className={`text-gray-700 hover:text-indigo-600 text-base md:text-lg font-medium transition-colors duration-300 ${
              status && !admin ? "block" : "hidden"
            }`}
          >
            Orders
          </Link>
          <Link
            to="/cart"
            className={`text-gray-700 hover:text-indigo-600 text-base md:text-lg font-medium transition-colors duration-300 ${
              status && !admin ? "block" : "hidden"
            }`}
          >
            Cart
          </Link>
          <Link
            to="/admin"
            className={`text-gray-700 hover:text-indigo-600 text-base md:text-lg font-medium transition-colors duration-300 ${
              admin ? "block" : "hidden"
            }`}
          >
            Dashboard
          </Link>

          {/* Login/Logout Button */}
          {status ? (
            <button
              onClick={logoutHandler}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-base md:text-lg font-medium"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-base md:text-lg font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;