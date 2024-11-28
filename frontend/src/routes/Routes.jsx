import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../components/pages/About/About";
import Home from "../components/pages/Home/Home";
import Login from "../components/pages/Login/Login";
import Signup from "../components/pages/Signup/Signup";
import PostItem from "../components/PostItem.jsx/PostItem";
import Order from "../components/Order/Order";
import Admin from "../components/Admin/Admin";
import Cart from "../components/Cart/Cart";

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
                            path : "/cart",
                            element : <Cart/>
                     },
                     {
                            path : "/login",
                            element : <Login/>
                     },
                     {
                            path : "/signup",
                            element : <Signup/>
                     },
                     {
                            path : "/admin",
                            element : <Admin/>
                     },
              ]
       },
       
       
       
])
export default router