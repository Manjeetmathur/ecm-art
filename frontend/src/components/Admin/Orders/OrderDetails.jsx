import React from 'react'
import Orders from './Orders';

const OrderDetails = ({orderDetails}) => {
  return (
    <div className="overflow-x-auto bg-gray-100 rounded-lg px-4 py-2 shadow-lg">
    <div className="overflow-x-auto lg:grid lg:grid-cols-4 gap-4 ">
      {orderDetails.map((item, idx) => (
        <Orders order={item} key={idx} className="grid grid-cols-3 " />
      ))}
    </div>
  </div>
  )
}

export default OrderDetails
