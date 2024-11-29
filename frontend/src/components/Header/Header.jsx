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

    if (res.success) {
      dispatch(logout());
      toast.success(res.message);
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold md:block hidden">
          {/* Replace with your logo component or image */}
          Your Logo
        </Link>
        <div className="flex items-center gap-8  md:gap-14">
          <Link to="/" className="text-gray-700 hover:text-gray-900 ">Home</Link>
          
             
          {status ? (
           <div className="flex items-center">
             
             <Link to="/order-page" className="text-gray-700 hover:text-gray-900 mr-4">Orders</Link>
             { admin ? 
              <Link to="/admin" className="text-gray-700 hover:text-gray-900 mr-4">Dashboard</Link>
              : 
              <Link to="/cart" className="text-gray-700 hover:text-gray-900 pr-6"> Cart </Link>}
              <button onClick={logoutHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded">Logout</button>
             
           </div>
           ) : 
            <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;  
