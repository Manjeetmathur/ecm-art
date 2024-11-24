import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../components/pages/About/About";
import Home from "../components/pages/Home/Home";
import Login from "../components/pages/Login/Login";
import Signup from "../components/pages/Signup/Signup";
import PostItem from "../components/PostItem.jsx/PostItem";
import Order from "../components/Order/Order";

const router = createBrowserRouter([
       {
              path : "/",
              element : <App/>,
              children:[
                     {
                            path : "/about",
                            element : <About/>
                     },
                     {
                            path : "/",
                            element : <Home/>
                     },
                     {
                            path : "/post-item/:postId",
                            element : <PostItem/>
                     },
                     {
                            path : "/order-page",
                            element : <Order/>
                     },
                     {
                            path : "/login",
                            element : <Login/>
                     },
                     {
                            path : "/signup",
                            element : <Signup/>
                     },
              ]
       },
       
       
       
])
export default router