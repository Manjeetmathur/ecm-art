import React from 'react'
import { useSelector } from 'react-redux'
import OrderItem from './OrderItem';

const Order = () => {

  const { userInfo } = useSelector(st => st.auth)
  console.log(userInfo.order);
//   const sortedOrders = userInfo.order.sort((a, b) => {
//     return new Date(b.createdAt) - new Date(a.createdAt);
// });
  // const orders = .order.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <div>
      
      <h2 className="text-2xl font-bold flex justify-center mt-4">Your Order Details</h2>
     <div className="md:grid md:grid-cols-2 lg:grid-cols-3 slideright">
     {
       userInfo?.order?.map((item) => {
          return <div className="">
            <OrderItem  key={item._id} orders={item}  />
          </div>
        })
      }
     </div>
    </div>
  )
}

export default Order
