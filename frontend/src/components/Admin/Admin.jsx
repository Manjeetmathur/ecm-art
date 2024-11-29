import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateProduct from "./CreateProduct/CreateProduct";
import Orders from "./Orders/Orders";
import Posts from "./posts/Posts";
import Profile from "./Profile/Profile";
import OrderDetails from "./Orders/OrderDetails";

const Admin = () => {
  const navigate = useNavigate();
  const { admin, userInfo, orderDetails,posts } = useSelector((st) => st.auth);
  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  }, []);;

  const [active, setActive] = useState("profile");

  console.log(posts)
  return (
    <div className="" >
      
      <div className="flex items-center justify-center flex-col">
        <div className={`flex mx-auto gap-4 mt-5` }>
          <h3 onClick={() => setActive("profile")}>profile</h3>
          <p onClick={() => setActive("posts")}>posts</p>
          <p onClick={() => setActive("create-product")}>create</p>
          <p onClick={() => setActive("orders")}>orders</p>
        </div>
        <div className="p-5 m-5 ">
          <div className="">
            {active === "profile" && <Profile profile={userInfo} />}
            {active === "create-product" && <CreateProduct/>}
            {active === "orders" && <div className="">
              <h1 className="flex justify-center text-2xl font-bold">Order Details</h1>
              <OrderDetails className='w-[full] ' orderDetails={orderDetails.d1} /> 
            </div> }
            {active === "posts" && <div className="grid  lg:grid-cols-2 gap-10 w-[100%] ">
              {
                posts.map((post,idx) => {
                  return <Posts key={post._id} post={post} />
                })
              }
            </div> }
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Admin;
