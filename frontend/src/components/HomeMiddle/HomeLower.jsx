import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const HomeLower = (post) => {
       const p = (post.post);

       return (
              <div>
                     <div className="flex flex-col relative m-5 items-center">
                            <p className="w-[380px] px-2 my-2 font-medium text-[#f83d8e]">
                                   {p.postTitle}
                            </p>
                            <Link to={`/post-item/${p._id}`} className="">
                                   <img
                                          src={p?.postImage}
                                          alt=""
                                          className="w-[380px] h-[330px] rounded-lg"
                                   />
                            </Link>
                            <p className="w-[380px] px-2 my-2 font-medium text-[#f83d8e]">
                                   {p.postContent.slice(0, 43)} . . .
                            </p>
                            <div className="flex justify-between items-center">
                                   <button className="btn hover:m-[4px] text-[14px] px-2 bg-[#683292]">
                                          Add To Cart
                                   </button>
                            </div>
                     </div>
              </div>
       );
};

export default HomeLower;
