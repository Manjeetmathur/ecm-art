import React from 'react'
import { Link } from 'react-router-dom'

const HomeMiddle = () => {
       return (
              <div className="">
                     <div className="flex flex-col lg:flex-row relative m-5 mb-10 items-center gap-10">
                            <Link to = {"/"}>
                                   <img
                                          src="https://wallpaperaccess.com/full/181724.jpg"
                                          alt=""
                                          className="w-[80vw] lg:w-[300px] rounded-lg  hover:scale-[105%] transition-[0.3s] cursor-pointer  shadow-2xl"
                                   />
                            </Link>
                            <img
                                   src="https://wallpaperaccess.com/full/181724.jpg"
                                   alt=""
                                   className="w-[80vw] lg:w-[300px]  rounded-lg  hover:scale-[103%] cursor-pointer shadow-2xl lg:mb-24 border-[#683292]"
                            />
                            <img
                                   src="https://wallpaperaccess.com/full/181724.jpg"
                                   alt=""
                                   className="w-[80vw] lg:w-[300px]  rounded-lg  hover:scale-[103%] cursor-pointer  shadow-2xl"
                            />
                            
                     </div>
              </div>
       )
}

export default HomeMiddle
