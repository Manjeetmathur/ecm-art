import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../bacxkendUrl/BackendUrl';
import { Link } from 'react-router-dom';

const OrderItem = (orders) => {
  const order = orders.orders
  //  console.log(order);
  const [image, setImage] = useState("")
  const [imageId, setImageId] = useState("")

  useEffect(() => {
    try {
      const info = async () => {
        const data = await axios.get(`${url}/post/get-post-by-id/${order?.post?.[0]?.post}`)
        const res = data.data
        if (res.success) {
          setImage(res.post.postImage)
          setImageId(res.post._id)
        }
      }
      info()
    } catch (error) {

    }
  }, [])

  const CancelOrder = async()=> {
    try {
      const data =await axios.post(`${url}/post/cancel-order`,
        {"orderId":order._id},
        {
          headers : {"Content-Type" : "application/json"},
          withCredentials:true,
          withXSRFToken:true,
        }
      )
      const res = data.data
      console.log(res);

      if(res.success){
        window.location.reload()
      }else{
        toast.error(res.message)
      }
      
    } catch (error) {
      
    }
  }


  return (
    <div className="order-details bg-white shadow-md rounded-lg p-6 m-10 blockk">
      <div className="flex justify-between border-b border-gray-200 pb-4 mb-4">
        <p className="text-gray-700">Order ID: {order?._id.slice(16, 28)}</p>
        <p className="text-gray-700">Order Status: {order?.status}</p>
      </div>
      <div className=" flex flex-col items-center gap-4 mb-4">

        <p className="text-gray-700">Order Date: {new Date(order?.createdAt).toLocaleString()}</p>
        <div className="flex flex-row-reverse justify-center gap-10">
          <div className="">
            <Link to={`/post-item/${imageId}`} >
              <img src={image} alt="" className='w-[20vw] md:w-[100px]' />
            </Link>

          </div>
          <div className="">
            <p className="text-gray-700">Price: {order?.postPrice}</p>
            <p className="text-gray-700">User ID: {order?.user.slice(16, 28)}</p>
            <p className="text-gray-700">Product Id: {order?.post[0].post.slice(16, 28)}</p>
            <p className="text-gray-700">Quantity : {order?.post[1].quantity}</p>
          </div>
        </div>
      </div>
      <button className='border-2 px-2 rounded-lg hover:bg-gray-100' onClick={CancelOrder}> Cancel Order </button>
    </div>
  )
};

export default OrderItem;
