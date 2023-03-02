import { createSlice } from "@reduxjs/toolkit"; 

const initialState = { 
   isAuth: !!localStorage.getItem("isAuth"),
   token: null, 
} 

const userSlice = createSlice({ 
   name: 'user', 
   initialState, 
   reducers: { 
      setUser: (state, action) => { 
         localStorage.setItem('isAuth', action.payload) 
         state.token = action.payload; 
      }, 
      removeUser: (state) => { 
         state.token = null; 
         state.isAuth = null
      } 
   } 
}) 


export const {setUser, removeUser} = userSlice.actions 
export default userSlice.reducer