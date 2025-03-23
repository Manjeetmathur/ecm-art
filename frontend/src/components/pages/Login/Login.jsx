import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login, setAdmin } from "../../../store/authSlice";
import toast from "react-hot-toast";
import { url } from "../../bacxkendUrl/BackendUrl";

const Login = () => {
       const { status } = useSelector((st) => st.auth);
       const navigate = useNavigate();

       useEffect(() => {
              if (status) {
                     navigate("/");
              }
       }, [status, navigate]);

       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [loading, setLoading] = useState(false);
       const dispatch = useDispatch();

       const handleLogin = async (e) => {
              e.preventDefault();
              try {
                     setLoading(true);
                     const data = await axios.post(
                            `${url}/user/login`,
                            { email, password },
                            {
                                   headers: {
                                          "content-type": "application/json",
                                   },
                                   withCredentials: true,
                            }
                     );
                     const response = data.data;
                     if (response.success) {
                            if (response.role === "admin") {
                                   dispatch(setAdmin(response.role));
                            }
                            dispatch(login(response.loggedInUser));
                            toast.success(response.message);
                            navigate("/");
                     } else {
                            toast.error(response.message);
                     }
              } catch (error) {
                     toast.error(error.message);
              } finally {
                     setLoading(false);
              }
       };

       return (
              <div className="min-h-screen bg-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                     <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 max-w-md w-full space-y-6">
                            {/* Heading */}
                            <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600">
                                   Sign In to Your Account
                            </h2>

                            {/* Sign Up Link */}
                            <p className="text-center text-sm sm:text-base text-gray-700">
                                   Don’t have an account?{" "}
                                   <Link
                                          to="/signup"
                                          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300"
                                   >
                                          Sign Up
                                   </Link>
                            </p>

                            {/* Form */}
                            <form onSubmit={handleLogin} className="space-y-5">
                                   <div className="space-y-4">
                                          {/* Email Field */}
                                          <div>
                                                 <label
                                                        htmlFor="email"
                                                        className="block text-sm sm:text-base font-medium text-indigo-600"
                                                 >
                                                        Email
                                                 </label>
                                                 <input
                                                        id="email"
                                                        type="email"
                                                        placeholder="Enter your email..."
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        className="mt-1 w-full px-4 py-2 text-gray-700 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors duration-300"
                                                 />
                                          </div>

                                          {/* Password Field */}
                                          <div>
                                                 <label
                                                        htmlFor="password"
                                                        className="block text-sm sm:text-base font-medium text-indigo-600"
                                                 >
                                                        Password
                                                 </label>
                                                 <input
                                                        id="password"
                                                        type="password"
                                                        placeholder="Enter your password..."
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                        className="mt-1 w-full px-4 py-2 text-gray-700 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors duration-300"
                                                 />
                                          </div>
                                   </div>

                                   {/* Submit Button */}
                                   <button
                                          type="submit"
                                          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-300 text-sm sm:text-base font-medium disabled:opacity-50"
                                          disabled={loading}
                                   >
                                          {loading ? "Please wait..." : "Sign In"}
                                   </button>
                            </form>
                     </div>
              </div>
       );
};

export default Login;