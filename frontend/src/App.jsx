import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPosts, setUserInfo } from "./store/authSlice";
import { url } from "./components/bacxkendUrl/BackendUrl";
function App() {
  const dispatch = useDispatch()
  //all posts
  useEffect(() => {
    try {
      const fetch = async() => {
        const data = await axios.get(`${url}/post/get-post`)
        const res = data.data
        dispatch(setPosts( res.allPost));
      } 
      fetch()
    } catch (error) {
      console.log(error);
      
    }
    
  },[])

  //userDetails
  useEffect(() => {
    try {
      const fetch = async() => {
        const data = await axios.get(`${url}/user/get-user-details`,{withCredentials:true,withXSRFToken:true})
        const res = data.data
        if(res.success){
          dispatch(setUserInfo(res.user))
        }
        // dispatch(setPosts( res.allPost));
        
      } 
      fetch()
    } catch (error) {
      console.log(error);
      
    }
    
  },[])


  return (
    <div className="m-">
      <Toaster/>
        <Header />
        <main>
          <Outlet></Outlet>
        </main>
        <Footer />
      
    </div>
  );
}

export default App;
