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

      <div className=" absolute top-[29vw] md:top-[22vw]  left-[13vw] fade">
        <h1 className="text-[5vw] font-semibold  w-[50vw] my-2">Sketch Your Art With Manjeet</h1>
        <p className="text-[#683292] w-[55vw] md:text-xl md:font-semibold ">something something something</p>
        <Link to={'/explore'}>
          <button  className="btn my-4 px-2 text-[10px] md:text-xl lg:text-2xl flex items-center gap-2">Explore More <FaLongArrowAltRight className="mt-1" /> </button>
        </Link>
      </div>
      <div className="p-5 fade">
      <img
        src="https://assets-global.website-files.com/6152909339c5938b8fdca638/63a3a3555278444b4c87cd6a_OWE176_Kids%20art_HERO_1200x674.jpg"
        alt=""
        className="w-full md:h-[52vw] rounded-lg mb-7  shadow-2xl "
      />
      </div>

      <h1 className="text-[5vw] font-semibold flex justify-center mx-auto">
        Our Popular Art Work
      </h1>
      <Link to={'/explore'}>
        <h2 className="flex justify-center m-4 text-[13px] md:text-[25px] lg:text-[35px] text-[#683292]">
          Ckeck Out More Art Work
        </h2>
      </Link>
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
