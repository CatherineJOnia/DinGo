import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "../features/home/Home";
import AuthForm from "../features/auth/AuthForm";
import AllProducts from "../features/products/AllProducts";
import SingleProduct from "../features/products/SingleProduct";
import AddProduct from "../features/admin/AddProduct";
import EditSingleProduct from "../features/admin/EditSingleProduct";
import UserData from "../features/users/UserData";
import Checkout from "../features/cart/Checkout";
import Review from "../features/cart/Review";

import socket from "./socket";
import { fetchProductsAsync } from "../features/products/productsSlice";
import { fetchSingleProductAsync } from "../features/products/singleProductSlice";
import { fetchOrderAsync } from "../features/cart/cartSlice";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { product } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("product/create", (message) => {
      dispatch(fetchProductsAsync());
    });

    socket.on("product/edit", (productId) => {
      if (
        location.pathname === "/products" ||
        location.pathname === "/admin/products"
      ) {
        dispatch(fetchProductsAsync());
      }

      productId === product.id && dispatch(fetchSingleProductAsync(productId));
    });

    socket.on("products/deleteProduct", (productId) => {
      if (
        location.pathname === "/products" ||
        location.pathname === "/admin/products"
      ) {
        dispatch(fetchProductsAsync());
      }
      if (product.id === productId) {
        dispatch(fetchSingleProductAsync(productId));
      }
    });

    socket.on("products/addProduct", (message) => {
      dispatch(fetchProductsAsync());
    });

    socket.on("cart/addProduct", (message) => {
      dispatch(fetchOrderAsync());
    });

    socket.on("cart/editProduct", (message) => {
      dispatch(fetchOrderAsync());
    });

    socket.on("cart/deleteProduct", (message) => {
      dispatch(fetchOrderAsync());
    });

    return () => {
      socket.off("connect");
      socket.off("product/create");
      socket.off("product/edit");
      socket.off("products/deleteProduct");
      socket.off("products/addProduct");
      socket.off("cart/addProduct");
      socket.off("cart/editProduct");
      socket.off("cart.deleteProduct");
    };
  }, [product, cart]);

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="home" element={<Home />} />

        <Route
          path="/"
          element={<AuthForm name="login" displayName="Login" />}
        />
        <Route
          path="/login"
          element={<AuthForm name="login" displayName="Login" />}
        />
        <Route
          path="/signup"
          element={<AuthForm name="signup" displayName="Sign Up" />}
        />

        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:productId" element={<SingleProduct />} />

        <Route path="/addproduct" element={<AddProduct />} />
        <Route
          path="/products/:productId/edit"
          element={<EditSingleProduct />}
        />

        <Route path="/users" element={<UserData />} />

        <Route path="/cart" element={<Checkout />} />
        <Route path="/cart/guest" element={<Checkout />} />
        {/* <Route path="/cart/review" elecment={<Review />} /> */}
      </Routes>
    </div>
  );
};

export default AppRoutes;
