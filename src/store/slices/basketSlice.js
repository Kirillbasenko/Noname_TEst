import { createSlice } from "@reduxjs/toolkit"; 

const initialState = { 
   basket: JSON.parse(localStorage.getItem("basket")) || [],
} 

const basketSlice = createSlice({ 
   name: 'basket', 
   initialState, 
   reducers: { 
      setBasket: (state, action) => {
         let arr = state.basket.filter(item => item.key === action.payload.key)
         state.basket = arr.length === 1 ? state.basket.filter(item => item.key !== action.payload.key) : [...state.basket, action.payload]
         localStorage.setItem("basket", JSON.stringify(state.basket))
      },
      removeBasket: state => {
         state.basket = []
      },
      deleteDevice: (state, action) => {
         state.basket = state.basket.filter(item => item.key !== action.payload)
      },
   } 
}) 


export const { 
   setBasket,
   setPlusCurrent,
   setMinusCurrent,
   deleteDevice,
   removeBasket
} = basketSlice.actions 

export default basketSlice.reducer