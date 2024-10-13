// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Adjust the path if CartSlice.jsx is in a different directory

const store = configureStore({
  reducer: {
    cart: cartReducer, // Use a key that represents the slice of the state
  },
});

export default store;
