import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../bacxkendUrl/BackendUrl";
import { useSelector } from "react-redux";
import { IoCart } from "react-icons/io5";

const HomeLower = ({ post }) => {
       const [bloading, setbLoading] = useState(false);
       const [cloading, setcLoading] = useState(false);
       const [quantity, setQuantity] = useState(1);
       const navigate = useNavigate();
       const { status } = useSelector((st) => st.auth);

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
                            throw new Error("User is not logged in");
                     }
                     setbLoading(true);
                     const data = await axios.post(
                            `${url}/post/order-item`,
                            { postId: post._id, postPrice: post.postPrice, quantity },
                            {
                                   withCredentials: true,
                                   withXSRFToken: true,
                                   headers: { "content-type": "application/json" },
                            }
                     );
                     const res = data.data;

                     if (res.success) {
                            toast.success("Order placed successfully!");
                            navigate("/order-page");
                     } else {
                            toast.error("Something went wrong");
                     }
              } catch (error) {
                     toast.error(error.message);
              } finally {
                     setbLoading(false);
              }
       };

       const addToCart = async () => {
              try {
                     if (!status) throw new Error("User is not logged in");
                     setcLoading(true);
                     const data = await axios.post(
                            `${url}/post/add-cart`,
                            { postId: post._id },
                            {
                                   withCredentials: true,
                                   withXSRFToken: true,
                                   headers: { "content-type": "application/json" },
                            }
                     );
                     const res = data.data;

                     if (res.success) {
                            toast.success(res.message);
                     } else {
                            toast.error(res.message);
                     }
              } catch (error) {
                     toast.error(error.message);
              } finally {
                     setcLoading(false);
              }
       };

       return (
              <div className="my-6 px-2">
                     <div className="bg-indigo-50 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-full max-w-sm mx-auto">
                            {/* Product Image */}
                            <Link to={`/post-item/${post._id}`}>
                                   <img
                                          src={post?.postImage || "https://via.placeholder.com/300"}
                                          alt={post.postTitle}
                                          className="w-full h-48 sm:h-56 object-cover rounded-t-lg"
                                   />
                            </Link>

                            {/* Product Details */}
                            <div className="p-4">
                                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                                          {post.postTitle}
                                   </h2>
                                   <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                          {post.postContent.slice(0, 100)}...
                                   </p>
                                   <div className="mt-2 flex items-center justify-between">
                                          <span className="text-lg font-bold text-indigo-600">
                                                 {post.postPrice?.toFixed(2) || "N/A"}
                                          </span>
                                          <div className="flex items-center gap-2">
                                                 <button
                                                        onClick={handleDecrement}
                                                        className="text-gray-600 hover:text-indigo-600 text-lg font-bold"
                                                        disabled={quantity <= 1}
                                                 >
                                                        -
                                                 </button>
                                                 <span className="text-gray-800 font-medium">{quantity}</span>
                                                 <button
                                                        onClick={handleIncrement}
                                                        className="text-gray-600 hover:text-indigo-600 text-lg font-bold"
                                                 >
                                                        +
                                                 </button>
                                          </div>
                                   </div>

                                   {/* Buttons */}
                                   <div className="mt-4 flex gap-3">
                                          <button
                                                 onClick={orderItem}
                                                 className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-sm sm:text-base font-medium disabled:opacity-50"
                                                 disabled={bloading}
                                          >
                                                 {bloading ? "Please Wait..." : "Buy Now"}
                                          </button>
                                          <button
                                                 onClick={addToCart}
                                                 className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center gap-1 text-sm sm:text-base font-medium disabled:opacity-50"
                                                 disabled={cloading}
                                          >
                                                 {cloading ? "Please Wait..." : (
                                                        <>
                                                               <IoCart /> Add to Cart
                                                        </>
                                                 )}
                                          </button>
                                   </div>
                            </div>
                     </div>
              </div>
       );
};

export default HomeLower;