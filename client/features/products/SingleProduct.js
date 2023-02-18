import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { deleteProductAsync } from "../products/productsSlice";
import { addToCartAsync } from "../cart/cartSlice";
import { fetchSingleProduct, selectSingleProduct } from "./singleProductSlice";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  const { productId } = useParams();

  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const user = useSelector((state) => state.auth.me);
  const userId = user.id;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);

  return (
    <div>
      <main>
        {isAdmin ? (
          <div className="adminBar">
            <h5>Admin Control</h5>
            <div className="adminBar">
              <Link to={`/products/${productId}/edit`}>
                <button className="adminButton">
                  <EditIcon fontSize="12" /> Edit
                </button>
              </Link>
              <button
                className="adminButton"
                onClick={async (evt) => {
                  evt.preventDefault();
                  await dispatch(deleteProductAsync({ productId }));
                }}
              >
                <DeleteIcon fontSize="12" /> Delete
              </button>
            </div>
          </div>
        ) : null}
        <div className="singleView">
          <div>
            <div className="back">
              <Link to={"/products"}>
                <ArrowBackIcon fontSize="12" /> Back to All
              </Link>
            </div>
            <img
              src={product.imageUrl}
              className="featuredProduct"
              alt={product.name}
            />
          </div>
          <div className="left">
            <h2>{product.name}</h2>
            <div className="description">{product.description}</div>
            <div className="price">${product.price}</div>
            <button
              onClick={async (evt) => {
                evt.preventDefault();
                await dispatch(addToCartAsync({ userId, productId }));
              }}
            >
              <ShoppingCartIcon fontSize="25" /> Add To Cart
            </button>
            <div className="details"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleProduct;
