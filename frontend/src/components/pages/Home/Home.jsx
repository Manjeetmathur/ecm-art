import React, { useState } from "react";
import { IoCart } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowPointer, FaCartPlus } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import HomeMiddle from "../../HomeMiddle/HomeMiddle";
import HomeLower from "../../HomeMiddle/HomeLower";
import { useSelector } from "react-redux";
import p7 from '../../../assets/p7.jpeg'
const Home = () => {
  
  const {posts} =  useSelector(st => st.auth)
  
  return (
    <div className="">

      <div className=" absolute top-[44vw] md:top-[22vw  left-[38vw] fade">
        {/* <h1 className="text-[5vw] font-semibold  w-[50vw] my-2">Sketch Your Art With Manjeet</h1> */}
        {/* <p className="text-[#683292] w-[55vw] md:text-xl md:font-semibold ">something something something</p> */}
        {/* <Link to={'/explore'}>
          <button  className="btn my-4 px-2 text-[10px] md:text-xl 
            lg:text-2xl flex items-center gap-2">
              Explore More <FaLongArrowAltRight className="mt-1" /> 
          </button>
        </Link> */}
      </div>
      <div className="p-5 fade">
      <img
        src={p7}
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
      <div className="md:grid lg:grid-cols-3 md:grid-cols-2 mt-1 shadow-xl pb-">
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
