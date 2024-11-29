import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { login, setAdmin } from '../../../store/authSlice'
import toast from 'react-hot-toast'
import { url } from '../../bacxkendUrl/BackendUrl'
const Login = () => {

       const [email,setEmail] = useState("")
       const [password,setPassword] = useState("")
       const [loading,setLoading] = useState(false)
       const dispatch = useDispatch()
       const navigate = useNavigate()
       const handleLogin = async (e) => {
              e.preventDefault()
              
              try {
                     setLoading(true)
                     const data = await axios.post(`${url}/user/login`, 
                            {
                                   email,password
                            },
                            {
                                   headers: {
                                          'content-type': 'application/json',
                                   },
                                   // mode: 'cors',
                                   withCredentials:"true"
                            }
                     )
                     const response = data.data
                     if (response.success) {
                            if(response.role === 'admin'){
                                   
                                   dispatch(setAdmin(response.role))
                            }
                            dispatch(login(response.loggedInUser))
                            toast.success(response.message)
                            navigate("/")
                     }else{
                            toast.error(response.message)
                     }
              } catch (error) {
                     toast.error(error.message)
              }finally{
                     setLoading(false)
              }

       }
       return (
              <div className='shadow-xl pb-5  mt-10'>
                     <h2 className=' text-xl m-auto max-w-md my-6 rounded-xl p-4 text-[#683292]'>Signing In To Your Account...</h2>
                     <p className=' text-xl m-auto max-w-md my-4 text-[#683292] px-4'>

                            <Link to={"/signup"}>
                                   Dont't Have Account ? Sign Up
                            </Link>
                     </p>
                     <form action="" onSubmit={(e) => handleLogin(e)}>
                            <div className="flex flex-col  m-auto max-w-md w-[300px]">

                                   <label htmlFor="" className=' text-xl m-2 text-[#683292]'>Email</label>
                                   <input 
                                          className=' text-md m-2 text-[#683292] border-2 outline-none 
                                                        border-[#f83d8e] p-1 px-2 rounded-xl'
                                          type="email"
                                          placeholder='Enter Your Email...'
                                          value={email}
                                          required
                                          onChange={(e) => setEmail(e.target.value)}
                                   />
                                   <label htmlFor="" className=' text-xl m-2 text-[#683292]'>Password</label>
                                   <input 
                                          className=' text-md m-2  rounded-xl text-[#683292] 
                                                 border-2 outline-none border-[#f83d8e] p-1 px-2'
                                          type="password"
                                          placeholder='Enter Your Password...'
                                          value={password}
                                          required
                                          onChange={(e) => setPassword(e.target.value)}
                                   />

                                   <button
                                          className='btn my-8'
                                   >
                                         {loading ? "Please wait . . .":"Sign In"}
                                   </button>
                            </div>
                     </form>
              </div>
       )
}


export default Login
