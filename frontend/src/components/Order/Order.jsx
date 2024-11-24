import React from 'react'
import { useSelector } from 'react-redux'
import OrderItem from './OrderItem';

const Order = () => {

       const {userInfo} = useSelector(st => st.auth)

  return (
    <div>
      <h1>Your Oders</h1>
       {
              userInfo.order.map((item) => {
                    return  <OrderItem key={item._id} orders={item}/>
              })
       }
    </div>
  )
}

export default Order
