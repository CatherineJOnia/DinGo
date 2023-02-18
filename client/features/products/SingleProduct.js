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

  return (
    <div>
      <main>
        {this.props.is_admin ? (
          <div className="adminBar">
            <h5>Admin Control</h5>
            <div className="adminBar">
              <Link to={`/products/${product.id}/edit`}>
                <button className="adminButton">
                  <EditIcon fontSize="12" /> Edit
                </button>
              </Link>
              <button
                className="adminButton"
                onClick={() => this.props.deleteProduct(product.id)}
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
              onClick={() => {
                return this.addToCart(product.id);
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
