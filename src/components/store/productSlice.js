import { createSlice } from "@reduxjs/toolkit";

const product = {};

const productSlice = createSlice({
    name: "product",
    initialState: product,
    reducers: {
        getSelectedProduct(state, action){
            state.product = action.payload;
        }
    }
})
export const {getSelectedProduct} = productSlice.actions;
export  default productSlice.reducer;