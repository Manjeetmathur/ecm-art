import React, { useState } from 'react'
import axios from 'axios'
import { url } from '../../bacxkendUrl/BackendUrl'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const CreateProduct = () => {
       const [image, setImage] = useState("")
       const [postTitle, setpostTitle] = useState("")
       const [postContent, setpostContent] = useState("")
       const [postPrice, setpostPrice] = useState("")
       const [postCategory, setpostCategory] = useState("")
       const [loading, setLoading] = useState(false)
       const navigate = useNavigate()
       const handleSubmit = async (e) => {
              e.preventDefault()
             try {
              setLoading(true)
               const formData = new FormData()
               formData.append("postImage", image)
               formData.append("postTitle", postTitle)
               formData.append("postContent", postContent)
               formData.append("postPrice", postPrice)
               formData.append("postCategory", postCategory)
 
               const data = await axios.post(`${url}/post/create-post`,
                      formData,
                      {
                             headers: { "content-type": "multipart/form-data" },
                             withCredentials: true,
                             withXRFToken: true,
                      }
               )
               const res = data.data
 
               console.log(res)
 
               if (res.success) {
 
                      navigate('/')
               }else{
                     toast(res.message)
               }
             } catch (error) {
              toast(error.message)
             }finally{
              setLoading(false)
             }


       }
       return (
              <div className='lg:w-[60vw] md:w-[50vw] mx-auto'>
                     <div className="container mx-auto p-4 bg-white rounded-lg shadow-md ">
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                   <h2 className="text-2xl font-bold mb-4">Create Post</h2>

                                   <div className="mb-4">
                                          <label htmlFor="postImage" className="block text-sm font-medium text-gray-700">Post Image</label>
                                          <input type="file" id="postImage" name="postImage" required onChange={(e) => setImage(e.target.files?.[0])} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                                   </div>

                                   <div className="mb-4">
                                          <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700">Post Title</label>
                                          <input type="text" id="postTitle" name="postTitle" required value={postTitle} onChange={(e) => setpostTitle(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                                   </div>

                                   <div className="mb-4">
                                          <label htmlFor="postContent" className="block text-sm font-medium text-gray-700">Post Content</label>
                                          <textarea id="postContent" name="postContent" required value={postContent} onChange={(e) => setpostContent(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-32 resize-none"></textarea>
                                   </div>

                                   <div className="mb-4">
                                          <label htmlFor="postPrice" className="block text-sm font-medium text-gray-700">Post Price</label>
                                          <input type="text" id="postPrice" name="postPrice" required value={postPrice} onChange={(e) => setpostPrice(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                                   </div>

                                   <div className="mb-4">
                                          <label htmlFor="postCategory" className="block text-sm font-medium text-gray-700">Post Category</label>
                                          <select id="postCategory" name="postCategory" required value={postCategory} onChange={(e) => setpostCategory(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                                 <option value="" disabled>Select Category</option>
                                                 <option value="sketch">Sketch</option>
                                                 <option value="drawing">Drawing</option>
                                                 <option value="digital-painting">Digital Painting</option>
                                                 <option value="3d">3D</option>
                                          </select>
                                   </div>

                                   <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                          {
                                                 loading ? "please wait " : 'Create Post'
                                          }
                                   </button>
                            </form>
                     </div>
              </div>
       )
}

export default CreateProduct
