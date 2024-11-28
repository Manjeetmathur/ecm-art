import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setPostData } from "../../store/authSlice";
import toast from "react-hot-toast";
import { url } from "../bacxkendUrl/BackendUrl";

const PostItem = () => {
  const [bloading, setbLoading] = useState(false);
  const [cloading, setcLoading] = useState(false);
  const [cart, setcart] = useState(false);
  const params = useParams();
  console.log("params",params);
  
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const fetchdata = async () => {
        const data = await axios.get(
          `${url}/post/get-post-by-id/${params.postId}`
        );
        const res = data.data;

        if (res.success) {
          dispatch(setPostData(res.post));
        }
      };
      fetchdata();
    } catch (error) {}
  }, []);

  const { postData } = useSelector((st) => st.auth);

  const navigate = useNavigate();
  const orderItem = async () => {
    try {
      setbLoading(true);
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
      console.log("hlw", res);

      if (res.success) {
        toast.success("order placed successfully. . . ");
        navigate("/order-page");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setbLoading(false);
    }
  };
  const addToCart = async () => {
    try {
      setcLoading(true);
      console.log(cloading);
      
      const data = await axios.post(
        `${url}/post/add-cart`,
        { postId:postData._id },
        {
          withCredentials: true,
          withXSRFToken: true,
          headers: { "content-type": "application/json" },
        }
      );
      const res = data.data;
console.log(res);

      if (res.success) {
        toast.success(res.message);
      }else{
        
        toast(res.message);
      }
    } catch (error) {
    } finally {
      setcLoading(false);
    }
  };

  return (
    <div className="m-10 md:w-[90%] flex flex-col md:flex-row gap-5 justify-center">
      <img
        src={postData.postImage}
        alt=""
        className="h-[300px] lg:h-[350px] rounded-lg shadow-md"
      />
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-4">{postData?.postTitle}</h2>
        <p className="text-gray-700 mb-4">{postData?.postContent}</p>
        <div className="flex justify-between items-center mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addToCart}
          >
          { cloading ? 'please wait...' : ( cart ? 'remove from cart' : 'Add to cart')}
          </button>
          <p className="text-red-500 font-bold">Rs. {postData?.postPrice}/-</p>
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={orderItem}
        >
          { bloading ? 'please wait...' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
};

export default PostItem;
