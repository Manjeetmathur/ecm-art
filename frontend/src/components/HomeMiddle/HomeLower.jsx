import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../bacxkendUrl/BackendUrl";
import {useSelector} from "react-redux"
const HomeLower = ({ post }) => {
       const p = (post);
       const [bloading,setbLoading] = useState(false)
       const [cloading,setcLoading] = useState(false)
       const navigate = useNavigate()

       const {status} = useSelector(st => st.auth)
       console.log("stats",status);
       
       const orderItem = async () => {
              try {
                     
                     if(!status) {
                            throw new Error("user is not logged in") ; 
                     }
                     setbLoading(true)
                     const data = await axios.post(
                            `${url}/post/order-item`,
                            { postId: p._id, postPrice: p.postPrice },
                            {
                                   withCredentials: true,
                                   withXSRFToken: true,
                                   headers: { "content-type": "application/json" },
                            }
                     );
                     const res = data.data;
                     console.log("hlw", res);

                     if (res.success) {
                            toast.success("order placed successfully. . . ");
                            navigate("/order-page");
                            
                     } else {
                            toast.error("something went wrong");
                     }
              } catch (error) {
                     toast.error(error.message);
              }finally{
                     setcLoading(false)
              }
       }
       const addToCart = async () => {
              try {
                     if(!status) throw new Error("user is not logged in") 
                     setcLoading(true)
                     const data =await axios.post(`${url}/post/add-cart`,
                            { postId: p._id },
                            {
                                   withCredentials: true,
                                   withXSRFToken: true,
                                   headers: { "content-type": "application/json" },
                            }
                     )
                     const res = data.data
                     console.log(res);
                     
                     if(res.success){
                            toast.success(res.message)
                     }else{
                            toast(res.message)
                     }
                     

              } catch (error) {

              }finally{
                     setcLoading(false)
              }
       }

       return (
              <div className=" w-full flex justify-center my-8 ">
                     <div className="flex flex-col items-center w-[80%] shadow-xl bg-white rounded-lg p-4">
                            <h2 className="text-xl font-bold mb-4">{p.postTitle}</h2>
                            <Link to={`/post-item/${p._id}`} className="">
                                   <img
                                          src={p?.postImage}
                                          alt=""
                                          className=" h-[40vh]  rounded-lg mb-4 hover:scale-[103%] transition-[5s] object-contain"
                                   />
                            </Link>

                            <p className="text-gray-700 mb-4">{p.postContent.slice(0, 100)}...</p>
                            <div className="flex justify-between gap-4 items-center">
                                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                          onClick={orderItem}
                                   >
                                          { bloading ? 'please wait...' : 'Buy Now'}
                                   </button>
                                   <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                                          onClick={addToCart}
                                   >
                                          { cloading ? 'please wait...' :'Add to cart'}
                                   </button>
                            </div>
                     </div>
              </div>
       );
};

export default HomeLower;
