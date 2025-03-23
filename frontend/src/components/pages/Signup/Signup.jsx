import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../bacxkendUrl/BackendUrl";
import toast from "react-hot-toast";

const Signup = () => {
       const dispatch = useDispatch();
       const navigate = useNavigate();
       const [email, setEmail] = useState("");
       const [fullName, setfullName] = useState("");
       const [password, setPassword] = useState("");
       const [confirmPassword, setconfirmPassword] = useState("");
       const [profile, setProfile] = useState("");
       const [loading, setLoading] = useState(false); // Added loading state

       const handleSignup = async (e) => {
              e.preventDefault();
              setLoading(true);
              try {
                     const formData = new FormData();
                     formData.append("profile", profile);
                     formData.append("fullName", fullName);
                     formData.append("email", email);
                     formData.append("password", password);
                     formData.append("confirmPassword", confirmPassword);

                     const dataResponse = await axios.post(`${url}/user/register`, formData, {
                            headers: {
                                   "content-type": "multipart/form-data", // Updated for file upload
                            },
                     });
                     const res = dataResponse.data;

                     if (res.success) {
                            navigate("/login");
                            toast.success(res.message);
                     } else {
                            toast.error(res.message);
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
                                   Create Your Account
                            </h2>

                            {/* Sign In Link */}
                            <p className="text-center text-sm sm:text-base text-gray-700">
                                   Already have an account?{" "}
                                   <Link
                                          to="/login"
                                          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300"
                                   >
                                          Sign In
                                   </Link>
                            </p>

                            {/* Form */}
                            <form onSubmit={handleSignup} className="space-y-5">
                                   <div className="space-y-4">
                                          {/* Profile Picture Field */}
                                          <div>
                                                 <label
                                                        htmlFor="profile"
                                                        className="block text-sm sm:text-base font-medium text-indigo-600"
                                                 >
                                                        Profile Picture
                                                 </label>
                                                 <input
                                                        id="profile"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => setProfile(e.target.files?.[0])}
                                                        required
                                                        className="mt-1 w-full px-4 py-2 text-gray-700 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors duration-300"
                                                 />
                                          </div>

                                          {/* Full Name Field */}
                                          <div>
                                                 <label
                                                        htmlFor="fullName"
                                                        className="block text-sm sm:text-base font-medium text-indigo-600"
                                                 >
                                                        Full Name
                                                 </label>
                                                 <input
                                                        id="fullName"
                                                        type="text"
                                                        placeholder="Enter your name..."
                                                        value={fullName}
                                                        onChange={(e) => setfullName(e.target.value)}
                                                        required
                                                        className="mt-1 w-full px-4 py-2 text-gray-700 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors duration-300"
                                                 />
                                          </div>

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

                                          {/* Confirm Password Field */}
                                          <div>
                                                 <label
                                                        htmlFor="confirmPassword"
                                                        className="block text-sm sm:text-base font-medium text-indigo-600"
                                                 >
                                                        Confirm Password
                                                 </label>
                                                 <input
                                                        id="confirmPassword"
                                                        type="password"
                                                        placeholder="Confirm your password..."
                                                        value={confirmPassword}
                                                        onChange={(e) => setconfirmPassword(e.target.value)}
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
                                          {loading ? "Please wait..." : "Sign Up"}
                                   </button>
                            </form>
                     </div>
              </div>
       );
};

export default Signup;