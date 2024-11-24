import React from 'react'
import { Link } from 'react-router-dom'

const HomeMiddle = () => {
       return (
              <div className="">
                     <div className="flex flex-col lg:flex-row relative m-5 mb-10 items-center gap-10">
                            <Link to = {"/post-item"}>
                                   <img
                                          src="https://wallpaperaccess.com/full/181724.jpg"
                                          alt=""
                                          className="w-[300px] rounded-lg border-[2px] hover:scale-[103%] cursor-pointer border-[#683292]"
                                   />
                            </Link>
                            <img
                                   src="https://wallpaperaccess.com/full/181724.jpg"
                                   alt=""
                                   className="lg:w-[320px] w-[300px] rounded-lg  hover:scale-[103%] cursor-pointer border-[2px] md:mb-24 border-[#683292]"
                            />
                            <img
                                   src="https://wallpaperaccess.com/full/181724.jpg"
                                   alt=""
                                   className="w-[300px] rounded-lg border-[2px] hover:scale-[103%] cursor-pointer border-[#683292]"
                            />
                            
                     </div>
              </div>
       )
}

export default HomeMiddle
