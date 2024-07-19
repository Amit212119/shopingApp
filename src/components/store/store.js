import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartProductSlice from "./cartProductSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    cartProduct : cartProductSlice,
  },
});
export default store;