import product from "./slices/productSlice";
import user from "./slices/userSlice";
import basket from "./slices/basketSlice";
import { configureStore } from '@reduxjs/toolkit';

const stringMiddleware = () => (next) => (action) => {
   if(typeof action === "string"){
      return next({
         type: action
      })
   }
   return next(action)
}

const store = configureStore({
   reducer: { product, user, basket },
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
   devTools: process.env.NODE_ENV !== "production"
})

export default store;