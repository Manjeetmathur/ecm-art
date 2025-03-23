import React, { useState } from "react";
import { url } from "../bacxkendUrl/BackendUrl";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const CartProduct = ({ product }) => {
  const postData = product.result[0];
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

  const removeToCart = async () => {
    try {
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

      if (res.success) {
        toast.success(res.message);
        window.location.reload();
      } else {
        toast.error(res.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setcLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-4">
      <div className="bg-white border border-indigo-100 rounded-lg shadow-lg overflow-hidden transform hover:scale-102 transition-transform duration-300 w-full">
        {/* Cart Item Content */}
        <div className="flex flex-col p-4">
          {/* Product Image */}
          <div className="flex-shrink-0 mb-4">
            <Link to={`/post-item/${postData?._id}`}>
              <img
                src={postData?.postImage || "https://via.placeholder.com/100"}
                alt={postData?.postTitle || "Product Image"}
                className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-md shadow-sm hover:scale-105 transition-transform duration-300 mx-auto"
              />
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex flex-col items-center text-center space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-800 truncate">
              {postData?.postTitle || "Product Title"}
            </h3>
            <p className="text-lg font-bold text-indigo-600">
              {postData?.postPrice?.toFixed(2) || "N/A"}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center justify-center gap-3 border border-gray-300 rounded-md p-1.5 w-fit">
              <button
                onClick={handleDecrement}
                className="text-gray-600 hover:text-indigo-600 text-xl font-bold disabled:opacity-50"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="text-gray-800 font-medium text-base">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="text-gray-600 hover:text-indigo-600 text-xl font-bold"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-3 w-full">
              <button
                onClick={buyItem}
                className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-4 py-1.5 rounded-md hover:from-indigo-700 hover:to-indigo-600 transition-colors duration-300 text-sm sm:text-base font-medium disabled:opacity-50 w-full sm:w-auto"
                disabled={bloading}
              >
                {bloading ? "Please Wait..." : "Buy Now"}
              </button>
              <button
                onClick={removeToCart}
                className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium disabled:opacity-50 w-full sm:w-auto"
                disabled={cloading}
              >
                {cloading ? "Please Wait..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;