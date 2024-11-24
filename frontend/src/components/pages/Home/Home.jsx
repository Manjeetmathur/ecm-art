import React, { useState } from "react";
import { IoCart } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowPointer, FaCartPlus } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import HomeMiddle from "../../HomeMiddle/HomeMiddle";
import HomeLower from "../../HomeMiddle/HomeLower";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPosts, setUserInfo } from "./store/authSlice";
import { url } from "./components/bacxkendUrl/BackendUrl";
const Home = () => {
  const dispatch = useDispatch()
  //all posts
  useEffect(() => {
    try {
      const fetch = async() => {
        const data = await axios.get(`${url}/post/get-post`)
        const res = data.data
        dispatch(setPosts( res.allPost));
      } 
      fetch()
    } catch (error) {
      console.log(error);
      
    }
    
  },[])

  //userDetails
  useEffect(() => {
    try {
      const fetch = async() => {
        const data = await axios.get(`${url}/user/get-user-details`,{withCredentials:true,withXSRFToken:true})
        const res = data.data
        if(res.success){
          dispatch(setUserInfo(res.user))
        }
        // dispatch(setPosts( res.allPost));
        
      } 
      fetch()
    } catch (error) {
      console.log(error);
      
    }
    
  },[])


  const {posts} =  useSelector(st => st.auth)
  
  return (
    <div className="">

      <div className=" absolute top-[150px] md:top-[250px]  md:left-[150px] lg:left-[200px] left-[40px]">
        <h1 className="text-4xl font-semibold w-[300px] md:w-[450px] lg:w-[550px] my-2">Sketch Your Art With Manjeet</h1>
        <p className="text-[#683292] ">something something something</p>
        <button className="btn my-4 px-2 md:text-xl flex items-center gap-2">Explore More <FaLongArrowAltRight className="mt-1" /> </button>
      </div>
      <img
        src="https://wallpaperaccess.com/full/181724.jpg"
        alt=""
        className="w-full md:h-[30rem] rounded-b-lg my-7 border-[2px] border-[#683292]"
      />

      <h1 className="text-4xl font-semibold flex justify-center">
        Our Popular Art Work
      </h1>
      <h2 className="flex justify-center m-4 text-[#683292]">
        Ckeck Out Our Favourite Art Work
      </h2>
      <div className="flex flex-col md:flex-row justify-center my-5 border-b-2 border-[#683292]">
       <HomeMiddle />
      </div>
      <div className="lg:grid grid-cols-3 mt-10 border-b-2 border-[#f83d8e] ">
        {
          posts.map((item,idx) => {
            return <HomeLower key={idx} post={item}/>
          })
        }
      </div>
    </div>
  );
};

export default Home;
