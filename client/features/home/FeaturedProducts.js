import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchFeaturedProducts,
  selectFeaturedProducts,
} from "../products/featuredProductsSlice";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const featuredProducts = useSelector(selectFeaturedProducts);

  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/products";
    navigate(path);
  };

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <center>
      <div className="featuredProducts">
        <h3>Featured Products</h3>
        <div className="featuredProductsContainer">
          {featuredProducts && featuredProducts.length
            ? featuredProducts.map((product) => {
                return (
                  <div key={product.id} className="featuredBox">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.imageUrl} className="featuredImg" />
                      <div className="featuredDesc">
                        <h4>{product.name}</h4>
                        <p>Starting at ${product.price}</p>
                      </div>
                    </Link>
                  </div>
                );
              })
            : null}
        </div>
        <button onClick={routeChange}>View All Products</button>
      </div>
    </center>
  );
};

export default FeaturedProducts;
