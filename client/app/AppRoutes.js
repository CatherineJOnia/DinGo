import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "../features/home/Home";
import AuthForm from "../features/auth/AuthForm";
import AllProducts from "../features/products/AllProducts";
import SingleProduct from "../features/products/SingleProduct";
import AddProduct from "../features/admin/AddProduct";
import EditSingleProduct from "../features/admin/EditSingleProduct";
import Checkout from "../features/cart/Checkout";
import Review from "../features/cart/Review";

const AppRoutes = () => {
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

        <Route path="/cart" element={<Checkout />} />
        <Route path="/cart/guest" element={<Checkout />} />
        {/* <Route path="/cart/review" elecment={<Review />} /> */}
      </Routes>
    </div>
  );
};

export default AppRoutes;
