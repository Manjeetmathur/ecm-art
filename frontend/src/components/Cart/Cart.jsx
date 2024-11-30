import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from './CartProduct';

const Cart = () => {
       const {cartDetails} = useSelector( st => st.auth)
  return (
    <div className=' md:grid md:grid-cols-2  lg:grid-cols-3 '>
      {
       cartDetails.map((item) => {
              return <CartProduct key={item._id} product ={item } />
       })
      }
    </div>
  )
}

export default Cart
