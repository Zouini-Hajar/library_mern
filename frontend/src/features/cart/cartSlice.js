import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.log('Error saving the local state')
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: loadState(),
  },
  reducers: {
    addToCart: (state, action) => {
      state.data.push(action.payload);
      saveState(state.data);
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
      saveState(state.data);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCartItems = state => state.cart.data;
export default cartSlice.reducer;
