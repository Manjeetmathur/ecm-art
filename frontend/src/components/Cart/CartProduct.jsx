import React, { useState } from "react";
import { url } from "../bacxkendUrl/BackendUrl";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const CartProduct = ({ product }) => {
       const postData = product.result[0];
       console.log(postData);
       const navigate = useNavigate();
       const [bloading, setbLoading] = useState(false);
       const [cloading, setcLoading] = useState(false);
       const [quantity, setQuantity] = useState(1);

       const handleIncrement = () => {
              setQuantity(quantity + 1);
       };

       const handleDecrement = () => {
              if (quantity > 1) {
                     setQuantity(quantity - 1);
              }
       };
       const buyItem = async () => {
              try {
                     setbLoading(true);
                     const data = await axios.post(
                            `${url}/post/order-item`,
                            { postId: postData?._id, postPrice: postData?.postPrice, quantity },
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
                     setcLoading(false);
              }
       };
       const removeToCart = async () => {
              try {
                     console.log("hii");

                     setcLoading(true);
                     const data = await axios.post(
                            `${url}/post/remove-cart`,
                            { postId: postData?._id },
                            {
                                   withCredentials: true,
                                   withXSRFToken: true,
                                   headers: { "content-type": "application/json" },
                            }
                     );
                     const res = data.data;
                     console.log(res);

                     if (res.success) {
                            console.log("hii");

                            toast.success(res.message);
                            window.location.reload();
                     } else {
                            toast(res.message);

                            window.location.reload();
                     }
              } catch (error) {
              } finally {
                     setcLoading(false);
              }
       };

       return (
              <div className="p-5">
                     <div className="flex items-center border-b border-gray-200 py-4 cart ">
                            <div className="flex-shrink-0 mr-4">
                                   <Link to={`/post-item/${postData?._id}`}>
                                          <img
                                                 src={postData?.postImage}
                                                 alt="Product Image"
                                                 className="w-[100px] h-[100px] object-cover rounded-lg"
                                          />
                                   </Link>
                            </div>
                            <div className="flex flex-col">
                                   <h3 className="text-base font-bold text-gray-700 mb-1">
                                          {postData?.postTitle}
                                   </h3>
                                   <div className="flex justify-between items- flex-col">
                                          <p className="text-sm font-bold text-gray-900">
                                                 Rs. {postData?.postPrice}
                                          </p>
                                          <div className="flex items-center ">
                                                 <button
                                                        className="text-gray-500 hover:text-red-500 focus:outline-none"
                                                        onClick={removeToCart}
                                                 >
                                                        Remove
                                                 </button>
                                                 <span className="mx-2 text-gray-500">|</span>
                                                 <div className="">
                                                        <button
                                                               className="text-gray-500 hover:text-green-500 focus:outline-none"
                                                               onClick={buyItem}
                                                        >
                                                               Buy Now
                                                        </button>

                                                 </div>

                                          </div>
                                          <div className="items-center flex mx-auto gap-4" >
                                                 <button className="text-[18px]" onClick={handleDecrement}>
                                                        -
                                                 </button>
                                                 <p className="text-[15px]">{quantity}</p>
                                                 <button className="text-[15px]" onClick={handleIncrement}>
                                                        +
                                                 </button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>
       );
};

export default CartProduct;
