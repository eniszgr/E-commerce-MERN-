import { createSlice } from "@reduxjs/toolkit";

//if cart is in local storage, return it, otherwise return an empty array
const fetchFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  }
  return [];
};
const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};
const initialState = {
  carts: fetchFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isItemCart = state.carts.find(
        (cart) => cart.id === action.payload.id
      ); //if item already exist, return object
      if (isItemCart) {
        const tempCart = state.carts.map((item) => {
          if (item.id === action.payload.id) {
            //if item is already in cart, update quantity
            let tempQuantity = item.quantity + action.payload.quantity;
            return { ...item, quantity: tempQuantity };
          } else {
            return item; //if item is not in cart, return the item
          }
        });
        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
    },
    removeFromCart: (state, action) => {
      const tempCart = state.carts.filter((item) => item.id !== action.payload);
      state.carts = tempCart;
      storeInLocalStorage(state.carts);
    },
    clearCart: (state) => {
      state.carts = [];
      storeInLocalStorage(state.carts);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
