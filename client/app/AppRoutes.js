import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "../features/home/Home";
import AllProducts from "../features/products/AllProducts";
import SingleProduct from "../features/products/SingleProduct";
import AddProduct from "../features/admin/AddProduct";
import EditSingleProduct from "../features/admin/EditSingleProduct";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="home" element={<Home />} />

        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:productId" component={<SingleProduct />} />

        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/editproduct" element={<EditSingleProduct />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
