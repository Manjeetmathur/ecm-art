import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setPostData } from "../../store/authSlice";
import toast from "react-hot-toast";
import { url } from "../bacxkendUrl/BackendUrl";

const PostItem = () => {

  const params = useParams()
  console.log(params.postId);
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const fetchdata = async () => {
        const data = await axios.get(`${url}/post/get-post-by-id/${params.postId}`)
        const res = data.data
        console.log(res);

        if (res.success) {
          dispatch(setPostData(res.post))
        }
      }
      fetchdata()
    } catch (error) {

    }
  }, [])

  const { postData } = useSelector(st => st.auth)

  const navigate = useNavigate();
  const orderItem = async () => {
    try {
      const data = await axios.post(
        `${url}/post/order-item`,
        { postId: postData._id, postPrice: postData.postPrice },
        {
          withCredentials: true,
          withXSRFToken: true,
          headers: { "content-type": "application/json" },
        }
      );
      const res = data.data;
      if (res.success) {
        toast.success("order placed successfully. . . ");
         navigate("/order-page");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="m-10   md:w-[90%] flex flex-col md:flex-row items-center gap-5 justify-center">
      <img
        src="https://wallpaperaccess.com/full/181724.jpg"
        alt=""
        className=" h-[300px] lg:h-[350px] rounded-lg "
      />
      <div className="">

        <p className="mt-4 mx-4">
          {postData.postContent}
        </p>
        <div className="flex justify-between mt-5">
          <button className="btn px-2"> Add to cart</button>
          <p className="mx-4 text-[#f83d8e] font-bold">Rs. {postData.postPrice}/-</p>
        </div>
        <button className="btn px-2 flex mx-auto" onClick={orderItem}>buy now</button>
      </div>
    </div>
  );
};

export default PostItem;
