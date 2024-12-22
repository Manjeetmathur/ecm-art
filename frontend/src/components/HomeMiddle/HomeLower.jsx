import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../bacxkendUrl/BackendUrl";
import { useSelector } from "react-redux"
const HomeLower = ({ post }) => {
       const p = (post);
       const [bloading, setbLoading] = useState(false)
       const [cloading, setcLoading] = useState(false)
       const navigate = useNavigate()

       const { status } = useSelector(st => st.auth)
       const [quantity, setQuantity] = useState(1);

       const handleIncrement = () => {
              setQuantity(quantity + 1);
       };

       const handleDecrement = () => {
              if (quantity > 1) {
                     setQuantity(quantity - 1);
              }
       };
       const orderItem = async () => {
              try {

                     if (!status) {
                            throw new Error("user is not logged in");
                     }
                     setbLoading(true)
                     const data = await axios.post(
                            `${url}/post/order-item`,
                            { postId: p._id, postPrice: p.postPrice ,quantity},
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
              } finally {
                     setcLoading(false)
              }
       }
       const addToCart = async () => {
              try {
                     if (!status) throw new Error("user is not logged in")
                     setcLoading(true)
                     const data = await axios.post(`${url}/post/add-cart`,
                            { postId: p._id },
                            {
                                   withCredentials: true,
                                   withXSRFToken: true,
                                   headers: { "content-type": "application/json" },
                            }
                     )
                     const res = data.data
                     console.log(res);

                     if (res.success) {
                            toast.success(res.message)
                     } else {
                            toast(res.message)
                     }


              } catch (error) {
                     toast.error(error.message);
              } finally {
                     setcLoading(false)
              }
       }
      

       return (
              <div className="flex justify-center my-8 blockk">
                     <div className="flex flex-col items-center w-[95%] shadow-xl bg-white rounded-lg p-4">
                            <h2 className="text-xl font-bold mb-4">{p.postTitle}</h2>
                            <Link to={`/post-item/${p._id}`} className="">
                                   <img
                                          src={p?.postImage}
                                          alt=""
                                          className=" w-[90vw]  rounded-lg mb-4 hover:scale-[103%] transition-[5s] object-cover"
                                   />
                            </Link>

                            <p className="text-gray-700 mb-4">{p.postContent.slice(0, 100)}...</p>
                            <div className="flex justify-between gap-4 items-center">
                                   <button className="text-[4vw] md:text-[15px]  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                          onClick={orderItem}
                                   >
                                          {bloading ? 'please wait...' : 'Buy Now'}
                                   </button>
                                   <div className="items-center ">
                                          <button className="text-[18px]" onClick={handleDecrement}>-</button>
                                          <p className="text-[15px]">{quantity}</p>
                                          <button className="text-[15px]" onClick={handleIncrement}>+</button>

                                   </div>
                                   <button className="bg-gray-200 text-[4vw] md:text-[15px]  hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                                          onClick={addToCart}
                                   >
                                          {cloading ? 'please wait...' : 'Add to cart'}
                                   </button>
                            </div>
                     </div>
              </div>
       );
};

export default HomeLower;
