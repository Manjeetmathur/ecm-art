import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IoReorderThree } from "react-icons/io5";
import { logout } from "../../store/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {status} = useSelector(st => st.auth)
 

  const logoutHandler = async() => {
    const data = await axios.get("http://localhost:8000/api/user/logout",{
      withCredentials:true,
      withXSRFToken:true,
    })
    const res = data.data
    
    if(res.success){
      dispatch(logout())
      toast.success(res.message)
      navigate("/login")
    }else{
      toast.error(response.message)
    }
  }

  return (
    <nav className="bg-[#fffff] mt-4">
      <div className={`flex  justify-around md:text-xl`}>
        <div className="hidden md:flex">
            <Link to={"/"} className="">Logo</Link>
        </div>
        <div className="flex justify-around md: gap-10">
          <div className="">
            <Link to={"/"}>Home</Link>
          </div>
          <div className="">
            <Link to={"/about"}>About</Link>
          </div>
          <div className="">
            <Link to={"/"}>Explore</Link>
          </div>
          <div className="">
            <div className=" ">
              {
                status ? 
                <div className="cursor-pointer" onClick={logoutHandler}>Logout</div> 
                :
                
                <Link to={"/login"}>Login</Link>
              }
            </div>
            {/* <div className="header-text  ">
                <button onClick={handleLogout}>Logout</button>
              </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
