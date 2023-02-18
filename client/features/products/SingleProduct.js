import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { addToCartAsync } from "../shoppingCart/shoppingCartSlice";
import { fetchSingleProduct, selectSingleProduct } from "./singleProductSlice";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { addItemToCart } from '../store/cart';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);

  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const user = useSelector((state) => state.auth.me);
  const userId = user.id;

  const { name, price, description, imageUrl } = product;
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);
};

export default SingleProduct;
