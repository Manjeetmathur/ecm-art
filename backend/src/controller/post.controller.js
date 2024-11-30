import mongoose from "mongoose";
import { Cart } from "../model/Cart.model.js";
import { Order } from "../model/Oreder.model.js";
import { Post } from "../model/post.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import sendMail from "../utils/Sendmail.js";
import { Admin } from "../model/admin.model.js";

const createPost = asyncHandler(async (req, res) => {
       const { postContent, postPrice, postTitle, postCategory} = req.body

       try {
              const admin = req.user
              console.log(admin);
              
              if (!admin) {
                     throw new ApiError(404, "admin not found")
              }

              const isAdmin = await Admin.findById(admin._id)

              if (!isAdmin) {
                     throw new ApiError(404, "admin not found")
              }

              if (!postContent || !postPrice || !postCategory || !postTitle) {
                     throw new ApiError(401, 'All fields are required . . .')
              }

              const postImagePath = req?.file?.path

              if (!postImagePath) {
                     throw new ApiError(401, "Image required . . .")
              }

              const postImage = await uploadOnCloudinary(postImagePath)

              const post = await Post.create({
                     postContent,
                     postPrice,
                     postTitle,
                     postCategory,
                     stock: 1,
                     postImage: postImage.secure_url,
                     owner: admin._id
              })
              await admin.posts.push(post._id)
              await admin.save()
              res.status(200).json({
                     success: true,
                     message: "post uploaded",
                     post
              })

       } catch (error) {
              res.json({
                     message: error.message
              })
       }
})

const deletePost = asyncHandler(async (req, res) => {
       const { postId } = req.body
       const admin = req.user
       try {

              if (!admin) {
                     throw new ApiError(404, "admin not found")
              }
              if (!postId) {
                     throw new ApiError(404, "post not found")
              }

              const post = await Post.findByIdAndDelete(postId)

              if (!post) {
                     throw new ApiError("Post not found . . .")
              }
              admin.posts = admin.posts.filter(id => id.toString() !== postId.toString())
              await admin.save()
              res.status(200).json({
                     message: "post deleted ",
                     success: true,
              })
       } catch (error) {
              res.json({
                     message: error.message
              })
       }
})

const addToCart = asyncHandler(async (req, res) => {
       const { postId } = req.body
       const user = req.user
       
       try {
              if (!user) {
                     throw new ApiError(404, "user not found")
              }
              if (!postId) {
                     throw new ApiError(404, "product not found")
              }

              const cartPost = await Cart.findOne({ owner: user._id, post: postId })

              console.log(cartPost);
              
              if (!cartPost) {
                     const cartpost = await Cart.create({
                            post: postId,
                            owner: user._id
                     })
                     user.cart.push(cartpost._id)
                     await user.save()
                     res.status(200).json({
                            message: "added to cart",
                            success: true,
                            cartpost
                     })

              }else{
                     throw new ApiError(500,"Already added to cart")
              }

       } catch (error) {
              res.json({
                     message: error.message
              })
       }


})
const removeToCart = asyncHandler(async (req, res) => {
       const { postId } = req.body
       const user = req.user

       try {
              if (!user) {
                     throw new ApiError(404, "user not found")
              }
              if (!postId) {
                     throw new ApiError(404, "product not found")
              }

              const cartPost = await Cart.findOne({ owner: user._id, post: postId })

              if(cartPost){
                     await Cart.findByIdAndDelete(cartPost._id)

                     user.cart = user.cart.filter(id => id.toString() !== cartPost._id.toString())
                     await user.save()
                     res.status(200).json({
                            message: "remove from cart",
                            success: true
                     })
              }else{
                     throw new Error("Product is not in cart")
              }

            
            

       } catch (error) {
              res.json({
                     message: error.message
              })
       }


})

const getUserCartItem = asyncHandler(async (req, res) => {
       const user = req.user

       try {
              const userId = user._id

              const cartItems = await Cart.aggregate([
                     {
                            $match: {
                                   owner: new mongoose.Types.ObjectId(userId)
                            }
                     },
                     {
                            $lookup: {
                                   from: "posts",
                                   localField: "post",
                                   foreignField: "_id",
                                   as: "result"
                            }
                     },
                     // {
                     //        $project: {
                     //               result: "$result"
                     //        }
                     // },
              ])
              res.json({
                     cartItems,
                     success:true
              })


       } catch (error) {

       }
})

const orderItem = asyncHandler(async (req, res) => {
       const { postId, postPrice, quantity } = req.body
       const user = req.user

       try {
              if (!user) {
                     throw new ApiError(404, "user not found")
              }
              if (!postId) {
                     throw new ApiError(404, "post not found")
              }

              const admin = await Admin.findOne({ posts: postId })
              const p = await Post.findById(postId)

              if (!p) {
                     throw new ApiError("Post not found")
              }

              const orderpost = await Order.create({
                     post: [
                            { post: postId },
                            { quantity: quantity || 1 }
                     ],
                     postPrice,
                     user: user._id
              })
              user.order.push(orderpost._id)
              await user.save()

              admin.orders.push(orderpost._id)
              await admin.save()

              let para = `thanks for your order for ${p.postContent} 
                                    rupees ${postPrice} `
              sendMail(para, user.email)
              sendMail(user.email, "kumanjeet779@gmail.com")

              res.status(200).json({
                     message: "Order Placed",
                     success: true,
                     orderpost
              })
       } catch (error) {
              res.json({
                     message: error.message
              })
       }


})

const cancelOrder = asyncHandler(async (req, res) => {
       const { orderId } = req.body
       const user = req.user
       
       try {
              if (!orderId) {
                     throw new ApiError(401, "Order not found");
              }
              const admin = await Admin.findOne({ orders: orderId })
              
              const order = await Order.findByIdAndDelete(orderId)
              
              if (!order) {
                     throw new ApiError(404,"Order not found")
              }

              user.order = user.order.filter(id => id.toString() !== orderId.toString())
              await user.save()

              admin.orders = admin.orders.filter(id => id.toString() !== orderId.toString())
              await admin.save()

              return res.status(200).json({
                     message: "order cancel",
                     success: true
              })

       } catch (error) {
              res.json({
                     message: error.message
              })
       }
})

const getorderDetails = asyncHandler(async (req, res) => {
       const user = req.user
       try {
              const admin = await Admin.findOne({ email: user.email })
              if (!admin) {
                     throw new ApiError("htt saala")
              }
              const orderDetails = await Admin.aggregate([
                     {
                            $lookup: {
                                   from: "orders",
                                   localField: "orders",
                                   foreignField: "_id",
                                   as: "result",
                            },
                     },
                     {
                            $unwind: '$result'
                     },
              ])
              // console.log(orderDetails);
              
              const orderuserDetails = await Order.aggregate([
                     {
                            $lookup: {
                                   from: "users",
                                   localField: "user",
                                   foreignField: "_id",
                                   as: "rest"
                            }
                     },
                     {
                            $unwind: '$rest'
                     },
                     // {
                     //        $project: {
                     //               "data": "$rest",

                     //        }
                     // }

              ])
              console.log(orderuserDetails);
              
              res.status(200).json({
                     success: true,
                     d1 : orderDetails,
                     d2 : orderuserDetails
              })

       } catch (error) {
              res.json({
                     message: error.message
              })
       }
})

const getAllPost = asyncHandler(async (req, res) => {
       try {
              const allPost = await Post.find().sort({ createdAt: -1 })
              res.status(200).json({
                     allPost,
                     success: true
              })

       } catch (error) {

       }
})

const getPostById = asyncHandler(async (req, res) => {
       try {
              const { postId } = req.params
              const post = await Post.findById(postId)

              res.status(200).json({
                     message: "fetched",
                     success: true,
                     post
              })

       } catch (error) {

       }
})

export {
       createPost,
       deletePost,
       addToCart,
       removeToCart,
       cancelOrder,
       orderItem,
       getAllPost,
       getPostById,
       getUserCartItem,
       getorderDetails
}