import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IoReorderThree } from "react-icons/io5";
import { logout } from "../../store/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { url } from "../bacxkendUrl/BackendUrl";
import Admin from "../Admin/Admin";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, admin } = useSelector((st) => st.auth);

  const logoutHandler = async () => {
    const data = await axios.get(`${url}/user/logout`, {
      withCredentials: true,
      withXSRFToken: true,
    });
    const res = data.data;
    console.log(res);

    if (res.success) {
      dispatch(logout());
      toast.success(res.message);
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="bg-white text-[15px] md:text-[18px] md:font-semibold shadow-md">
      <div className="px-4 py-4 flex md:justify-between">
        <Link to="/" className="text-xl font-bold md:block hidden">
          {/* Replace with your logo component or image */}
          Your Logo
        </Link>
        <div className="flex items-center gap-8  mx-auto md:mx-0">
          <Link to="/" className="text-gray-700 hover:text-blue-500 ">
            Home
          </Link>
          <Link
            to="/order-page"
            className={`text-gray-700 hover:text-blue-500 ${
              status ? "block" : "hidden"
            } ${admin ? "hidden" : "block"}`}
          >
            Orders
          </Link>
          <Link
            to="/cart"
            className={`text-gray-700 hover:text-blue-500 ${
              status ? "block" : "hidden"
            } ${admin ? "hidden" : "block"}`}
          >
            {" "}
            Cart{" "}
          </Link>

          <Link
            to="/admin"
            className={`"text-gray-700 hover:text-blue-500 "
             ${admin ? "block" : "hidden"}`}
          >
            Dashboard
          </Link>
          <button
            onClick={logoutHandler}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ${
              status ? "block" : "hidden"
            }`}
          >
            Logout
          </button>
          <Link
            to="/login"
            className={`bg-blue-500 hover:bg-blue-700 
            text-white font-bold py-2 px-4 rounded ${
              status ? "hidden" : "block"
            }`}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
