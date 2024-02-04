import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
// import favSlice from "./FavSlice"
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    // favUi: favSlice.reducer,
    middleware: [thunk, logger]
  },
});

export default store;
