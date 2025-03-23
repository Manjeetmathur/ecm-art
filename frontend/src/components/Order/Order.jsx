import React from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const Order = () => {
  const { userInfo } = useSelector((st) => st.auth);
  //   const sortedOrders = userInfo.order.sort((a, b) => {
  //     return new Date(b.createdAt) - new Date(a.createdAt);
  //   });
  // const orders = .order.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center uppercase text-gray-800 tracking-wide drop-shadow-md mb-8">
          Your Order Details
        </h2>

        {/* Orders Grid */}
        {userInfo?.order?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userInfo.order.map((item) => (
              <div key={item._id}>
                <OrderItem orders={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No orders found. Start shopping now!
          </p>
        )}
      </div>
    </div>
  );
};

export default Order;