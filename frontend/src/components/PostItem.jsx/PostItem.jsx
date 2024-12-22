import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setPostData } from "../../store/authSlice";
import toast from "react-hot-toast";
import { url } from "../bacxkendUrl/BackendUrl";

const PostItem = () => {
  const [bloading, setbLoading] = useState(false);
  const [cloading, setcLoading] = useState(false);
  const params = useParams();
  console.log("params", params);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const fetchdata = async () => {
        const data = await axios.get(
          `${url}/post/get-post-by-id/${params.postId}`,
          {
            headers: { "content-type": "application/json" },
            withCredentials: true,
            withXSRFToken: true,
          }
        );
        const res = data.data;
        console.log(res);

        if (res.success) {
          console.log(res.post);

          dispatch(setPostData(res.post));
        }
      };
      fetchdata();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { postData, status } = useSelector((st) => st.auth);

  const navigate = useNavigate();
  const orderItem = async () => {
    try {
      if (!status) throw new Error("User is not logged in");
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
      if (!status) throw new Error("User is not logged in");
      setcLoading(true);
      console.log(cloading);

      const data = await axios.post(
        `${url}/post/add-cart`,
        { postId: postData._id },
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
      } else {
        toast(res.message);
      }
    } catch (error) {
      toast.error("user is not logged in");
    } finally {
      setcLoading(false);
    }
  };

  const openWhatsapp = () => { const phoneNumber = '6287773228'; // Replace with your actual phone number
    const message = "Hi, which item , you like to order ."; // Optional: Default message

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="m-10 md:w-[90%] flex flex-col md:flex-row gap-5 justify-center">
      <Link to={`${postData?.postImage}`}>
        <img
          src={postData?.postImage}
          alt=""
          className="h-[300px] w-[300px] lg:h-[350px] flex mx-auto rounded-lg shadow-md object-cover"
        />
      </Link>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-4">{postData?.postTitle}</h2>
        <p className="text-gray-700 mb-4">{postData?.postContent}</p>
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addToCart}
          >
            {cloading ? "please wait..." : "Add to cart"}
          </button>
          <div className="items-center flex mx-auto gap-4">
            <button className="text-[18px]" onClick={handleDecrement}>
              -
            </button>
            <p className="text-[15px]">{quantity}</p>
            <button className="text-[15px]" onClick={handleIncrement}>
              +
            </button>
          </div>
          <p className="text-red-500 font-bold">Rs. {postData?.postPrice}/-</p>
        </div>

        <div className="flex justify-between">
         
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={openWhatsapp}
          >
            {"Whatsapp Now"}
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={orderItem}
          >
            {bloading ? "please wait..." : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
