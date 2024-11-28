import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
       post:[
              {
                     post : {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Post"
                     },
                     quantity : {
                            type : Number,
                     }
              }
       ],
       postPrice:{
              type : Number,
              required:true
       },
       status : {
              type : String,
              default : 'Pending',
              enum : ['Pending','Completed','Cancelled'],
       },
       user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
       }
},{timestamps:true})

export const Order = mongoose.model("Order", OrderSchema)