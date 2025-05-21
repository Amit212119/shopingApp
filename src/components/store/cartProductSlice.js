import { createSlice } from '@reduxjs/toolkit';

const cardProductSlice = createSlice({
  name: 'cardProduct',
  initialState: {
    cartData:[]
  },
  reducers: {
    addCardProduct(state, action) {
      state.cartData.push(action.payload);
    },
    deleteCardProduct(state, action) {
       const data = state.cartData.filter((item) => item.id !== action.payload)
       console.log(action.payload, 'id');
       console.log(data, 'store');
       state.cartData = data;
    },
    decrease(state, action) {
     const selectedIndex =  state.cartData.findIndex((item) => item.id === action.payload.id);
    const selectedItem = state.cartData[selectedIndex];
    if(selectedItem.qty > 0){
      selectedItem.qty = selectedItem.qty - 1;
      state.cartData[selectedIndex] = selectedItem;
    }
    },
    increase(state, action) {
     const selectedIndex =  state.cartData.findIndex((item) => item.id === action.payload.id);
    const selectedItem = state.cartData[selectedIndex];
    selectedItem.qty = selectedItem.qty + 1;
     state.cartData[selectedIndex] = selectedItem;
    },
  },
});
export const { addCardProduct, deleteCardProduct, increase, decrease } = cardProductSlice.actions;
export default cardProductSlice.reducer;
