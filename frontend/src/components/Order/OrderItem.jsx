import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../bacxkendUrl/BackendUrl";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // Added for error handling consistency

const OrdersItem = ({ orders }) => {
  const order = orders.orders;
  const [image, setImage] = useState("");
  const [imageId, setImageId] = useState("");

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const data = await axios.get(`${url}/post/get-post-by-id/${orders?.post?.[0]?.post}`);
        const res = data.data;
        if (res.success) {
          setImage(res.post.postImage);
          setImageId(res.post._id);
        } else {
          toast.error(res.message || "Failed to fetch post details");
        }
      } catch (error) {
        toast.error("Error fetching post details");
      }
    };
    if (orders?.post?.[0]?.post) {
      fetchPostInfo();
    }
  }, [orders]);
  console.log(orders)

  const cancelOrders = async () => {
    try {
      const data = await axios.post(
        `${url}/post/cancel-orders`,
        { ordersId: orders._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      const res = data.data;

      if (res.success) {
        toast.success("Orders cancelled successfully!");
        window.location.reload();
      } else {
        toast.error(res.message || "Failed to cancel orders");
      }
    } catch (error) {
      toast.error("Error cancelling orders");
    }
  };

  return (
    <div className="bg-indigo-50 shadow-lg rounded-lg p-6 m-4 sm:m-6 md:m-8 max-w-lg mx-auto">
      {/* Orders Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center borders-b borders-indigo-200 pb-4 mb-4">
        <p className="text-gray-700 text-sm sm:text-base font-medium">
          <span className="font-semibold text-indigo-600">Orders ID:</span>{" "}
          {orders?._id.slice(16, 28)}
        </p>
        <p className="text-gray-700 text-sm sm:text-base font-medium mt-2 sm:mt-0">
          <span className="font-semibold text-indigo-600">Status:</span>{" "}
          <span
            className={`${
              orders?.status === "cancelled"
                ? "text-red-600"
                : orders?.status === "delivered"
                ? "text-green-600"
                : "text-yellow-600"
            } capitalize`}
          >
            {orders?.status}
          </span>
        </p>
      </div>

      {/* Orders Details */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <p className="text-gray-700 text-sm sm:text-base font-medium">
          <span className="font-semibold text-indigo-600">Orders Date:</span>{" "}
          {new Date(orders?.createdAt).toLocaleString()}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Link to={`/post-item/${imageId}`}>
              <img
                src={image || ""}
                alt="Product"
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
          {/* Orders Info */}
          <div className="text-gray-700 text-sm sm:text-base space-y-1">
            <p>
              <span className="font-semibold text-indigo-600">Price:</span>{" "}
              ${orders?.postPrice?.toFixed(2) || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-indigo-600">User ID:</span>{" "}
              {orders?.user.slice(16, 28)}
            </p>
            <p>
              <span className="font-semibold text-indigo-600">Product ID:</span>{" "}
              {orders?.post[0].post.slice(16, 28)}
            </p>
            <p>
              <span className="font-semibold text-indigo-600">Quantity:</span>{" "}
              {orders?.post[1]?.quantity || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Cancel Orders Button */}
      <button
        onClick={cancelOrders}
        className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 text-sm sm:text-base font-medium shadow-sm"
        disabled={orders?.status === "cancelled" || orders?.status === "delivered"}
      >
        Cancel Orders
      </button>
    </div>
  );
};

export default OrdersItem;