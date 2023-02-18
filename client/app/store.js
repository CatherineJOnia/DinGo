import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import singleProductReducer from "../features/products/singleProductSlice";
import cartReducer from "../features/cart/cartSlice";
import usersReducer from "../features/users/usersSlice";
import singleUserReducer from "../features/users/singleUserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    product: singleProductReducer,
    cart: cartReducer,
    users: usersReducer,
    user: singleUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
