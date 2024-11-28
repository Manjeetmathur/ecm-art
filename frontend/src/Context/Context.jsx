import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartDetails, setOrderDetails, setPosts, setUserInfo } from "../store/authSlice";
import axios from "axios";
import { url } from "../components/bacxkendUrl/BackendUrl";

export const context = createContext()

const ContextProvider = ({ children }) => {

       const dispatch = useDispatch()
       //all posts
       useEffect(() => {
              try {
                     const fetch = async () => {
                            const data = await axios.get(`${url}/post/get-post`)
                            const res = data.data
                            console.log(res);
                            
                            if (res.success) {
                                   dispatch(setPosts(res.allPost));
                            }
                     }
                     fetch()
              } catch (error) {
                     console.log(error);

              }
       }, [])


       //userDetails
       useEffect(() => {
              try {
                     const fetch = async () => {
                            const data = await axios.get(`${url}/user/get-user-details`, { withCredentials: true, withXSRFToken: true })
                            const res = data.data

                            if (res.success) {
                                  res.admin ?  dispatch(setUserInfo(res.admin)) :  dispatch(setUserInfo(res.user))
                                   
                                  
                            }
                            // dispatch(setPosts( res.allPost));

                     }
                     fetch()
              } catch (error) {
                     console.log(error);

              }

       }, [])
      
      
       //orderDetails
       useEffect(() => {
              try {
                     const fetch = async () => {
                            const data = await axios.get(`${url}/post/get-order-details`, { withCredentials: true, withXSRFToken: true })
                            const res = data.data
                            // console.log(res);
                            
                            if (res.success) {
                                   dispatch(setOrderDetails(res))
                            }

                     }
                     fetch()
              } catch (error) {
                     console.log(error);

              }

       }, [])

       //cart Details
       useEffect(() => {
              try {
                     const fetch = async () => {
                            const data = await axios.get(`${url}/post/get-cart-item`, { withCredentials: true, withXSRFToken: true })
                            const res = data.data
                            if (res.success) {
                                   dispatch(setCartDetails(res.cartItems))
                            }

                     }
                     fetch()
              } catch (error) {
                     console.log(error);

              }

       }, [])


       return (
              <context.Provider value={''}>
                     {children}
              </context.Provider>
       )
}
export default ContextProvider