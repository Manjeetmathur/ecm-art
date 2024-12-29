import React from 'react'
import { dateFormat } from '../../DateFormat/DateFormat';

const Orders = ({ order }) => {
  const orderDetails = (order?.result);
  console.log(orderDetails);


  return (
    <div className="flex flex-col border border-gray-300 rounded-lg p-4 my-4 shadow-xl ">
      <div className="flex text-sm font-medium text-gray-800 mb-2">
        <div className="w-1/6 mr-8 ">OrderID:</div>
        <div className="w-5/6">{orderDetails?._id}</div>
      </div>
      <div className="flex text-sm font-medium text-gray-800 mb-2">
        <div className="w-1/6 mr-8">ProductID:</div>
        <div className="w-5/6">{orderDetails?.post[0]._id}</div>
      </div>
      <div className="flex text-sm font-medium text-gray-800 mb-2">
        <div className="w-1/6 mr-8">User:</div>
        <div className="w-5/6">{orderDetails?.user}</div>
      </div>
      <div className="flex text-sm font-medium text-gray-800 mb-2">
        <div className="w-1/6 mr-8">Product Price:</div>
        <div className="w-5/6">{orderDetails?.postPrice}</div>
      </div>
      <div className="flex text-sm font-medium text-gray-800 mb-2">
        <div className="w-1/6 mr-8">Quantity:</div>
        <div className="w-5/6">{orderDetails?.post[1]?.quantity}</div>
      </div>
      <div className="flex text-sm font-medium text-gray-800 mb-2">
        <div className="w-1/6 mr-8">Status:</div>
        <div className="w-5/6">{orderDetails?.status}</div>
      </div>
      <div className="flex text-sm font-medium text-gray-800">
        <div className="w-1/6 mr-8">Date:</div>
        <div className="w-5/6">{dateFormat(orderDetails?.createdAt)}</div>
      </div>
    </div>
  )
}

export default Orders
