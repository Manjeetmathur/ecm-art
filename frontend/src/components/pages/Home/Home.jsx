import React, { useState } from "react";
import { IoCart } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowPointer, FaCartPlus } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import HomeMiddle from "../../HomeMiddle/HomeMiddle";
import HomeLower from "../../HomeMiddle/HomeLower";
import { useSelector } from "react-redux";
const Home = () => {


  const {posts} =  useSelector(st => st.auth)
  
  return (
    <div className="">

      <div className=" absolute top-[150px] md:top-[250px]  md:left-[150px] lg:left-[200px] left-[40px]">
        <h1 className="text-4xl font-semibold w-[300px] md:w-[450px] lg:w-[550px] my-2">Sketch Your Art With Manjeet</h1>
        <p className="text-[#683292] ">something something something</p>
        <button className="btn my-4 px-2 md:text-xl flex items-center gap-2">Explore More <FaLongArrowAltRight className="mt-1" /> </button>
      </div>
      <div className="p-5 ">
      <img
        src="https://wallpaperaccess.com/full/181724.jpg"
        alt=""
        className="w-full md:h-[30rem] rounded-lg mb-7  lg:h-[35rem] shadow-2xl "
      />
      </div>

      <h1 className="text-4xl font-semibold flex justify-center">
        Our Popular Art Work
      </h1>
      <h2 className="flex justify-center m-4 text-[#683292]">
        Ckeck Out Our Favourite Art Work
      </h2>
      <div className="flex flex-col md:flex-row justify-center my-5 border-b-2 shadow-xl">
       <HomeMiddle />
      </div>
      <div className="md:grid lg:grid-cols-3 gap-5 md:grid-cols-2 mt-10 shadow-xl pb-6">
        {
          posts?.map((item,idx) => {
            return <HomeLower key={idx} post={item}/>
          })
        }
      </div>
      
    </div>
  );
};

export default Home;
