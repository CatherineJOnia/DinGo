import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeaturedProducts,
  selectFeaturedProducts,
} from "../products/featuredProductsSlice";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const featuredProducts = useSelector(selectFeaturedProducts);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <center>
      <div className="featuredProducts">
        <h3>Featured Products</h3>
        <div className="featuredProductsContainer">
          {featuredProducts && featuredProducts.length === 0
            ? featuredProducts.map((product) => (
                <div key={product.id} className="featuredBox">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} className="featuredImg" />
                    <div className="featuredDesc">
                      <h4>{product.name}</h4>
                      <p>Starting at ${product.price}</p>
                    </div>
                  </Link>
                </div>
              ))
            : null}
        </div>
        <Link to="/products">
          <button>View All Products</button>
        </Link>
      </div>
    </center>
  );
};

export default FeaturedProducts;
