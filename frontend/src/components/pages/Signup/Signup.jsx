import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {
       const dispatch = useDispatch()
       const navigate = useNavigate()
       const [email, setEmail] = useState("")
       const [password, setPassword] = useState("")
       const handleSignup = async (data) => {
              const dataResponse = await fetch("http://localhost:5000/api/users/register", {
                     method: "POST",
                     headers: {
                            'content-type': 'application/json',
                     },
                     body: JSON.stringify(data)
              })
              const dataApi = await dataResponse.json()
              // if(dataApi.success){
              //        dispatch(login(useData))
              //        navigate("/")
              // }

       }
       return (
              <div className='border-y-2 border-[#683292]  my-10'>
                     <h2 className=' text-xl m-auto max-w-md my-6 rounded-xl p-4 text-[#683292]'>Signing Up To Your Account...</h2>
                     <p className=' text-xl m-auto max-w-md my-4 text-[#683292]'>

                            <Link to={"/login"}>
                                   Already Have An Account ? Sign In
                            </Link>
                     </p>

                     { }

                     <form action="" onSubmit={(e) => handleSignup(e)}>
                            <div className="flex flex-col  m-auto max-w-md w-[400px]">
                                   <label htmlFor="" className=' text-xl m-2 text-[#683292]'>Name</label>
                                   <input
                                          className=' text-md m-2 text-[#683292] border-2 outline-none 
                                                        border-[#f83d8e] p-1 px-2 rounded-xl'
                                          type="text"
                                          placeholder='Enter Your Name...'
                                          value={email}
                                          required
                                          onChange={(e) => setEmail(e.target.value)}
                                   />

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
                                   <label htmlFor="" className=' text-xl m-2 text-[#683292]'>Confirm Password</label>
                                   <input
                                          className=' text-md m-2  rounded-xl text-[#683292] 
                                                 border-2 outline-none border-[#f83d8e] p-1 px-2'
                                          type="password"
                                          placeholder='Enter Your confirmation Password...'
                                          value={password}
                                          required
                                          onChange={(e) => setPassword(e.target.value)}
                                   />

                                   <button
                                          type='submit'
                                          className='btn my-8'
                                   >
                                          Sign Up
                                   </button>
                            </div>
                     </form>
              </div>
       )
}


export default Signup
