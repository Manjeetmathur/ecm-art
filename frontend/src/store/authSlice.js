import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       status : true,
       userData : null,
       posts : null,
       postData : null,
       userinfo : null
}
const authSlice = createSlice({
       name : "auth",
       initialState,
       reducers : {
              login : (state,action) => {
                     state.status = true,
                     state.userData = action.payload
                     
              },
              logout : (state) => {
                     state.status = false,
                     state.userData = null
              },
              setPosts : (state,action) => {
                     state.posts = action.payload
              },
              setPostData : (state,action) => {
                     state.postData=action.payload
              },
              setUserInfo : (state,action) => {
                     state.userInfo=action.payload
              }
       }

})
export const {login,logout,setPosts,setPostData,setUserInfo} = authSlice.actions
export default authSlice.reducer