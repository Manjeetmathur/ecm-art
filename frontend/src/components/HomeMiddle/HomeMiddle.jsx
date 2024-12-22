import React from 'react'
import { Link } from 'react-router-dom'
import p4 from "../../assets/p4.png"
import p5 from "../../assets/p5.png"
import p6 from "../../assets/p6.png"
const HomeMiddle = () => {
       return (
              <div className="">
                     <div className="flex flex-col lg:flex-row relative m-5 mb-10 items-center gap-10">
                            <Link to = {"/"}>
                                   <img
                                          src={p5}
                                          alt=""
                                          className="css1 w-[300px] md:w-[350px]  lg:w-[300px]  rounded-lg  hover:scale-[105%] cursor-pointer  shadow-2xl"
                                   /> 
                            </Link>
                            <img
                                   src={p4}
                                   alt=""
                                   className="css1 w-[300px] md:w-[350px] lg:w-[300px]   rounded-lg  hover:scale-[103%] cursor-pointer shadow-2xl lg:mb-24 border-[#683292]"
                            />
                            <img
                                   src={p6}
                                   alt=""
                                   className="css1 w-[300px] md:w-[350px] lg:w-[300px]   rounded-lg  hover:scale-[103%] cursor-pointer  shadow-2xl"
                            />
                            
                     </div>
              </div>
       )
}

export default HomeMiddle
