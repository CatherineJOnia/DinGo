import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAsync,
  deleteProductAsync,
  productList,
} from "./productsSlice";
// import { addProduct } from "../store/singleProductSlice";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Pagination, Typography, Stack } from "@mui/material";
// import CircularLoading from "./CircularLoading";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(productList);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div>
      <div className="adminBar">
        <Link to={"/addproduct"}>
          <button className="adminButton">
            <AddCircleIcon fontSize="12" /> Add a Product
          </button>
        </Link>
      </div>
      {/* <ProductCarousel /> */}
      <Container maxWidth="md" className="product-container">
        <div className="all-prod-body">
          <h3>All Collections</h3>
        </div>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          {products && products.length
            ? products.map((product) => {
                return (
                  <Grid
                    className="all-prod-card-cont"
                    item
                    xs={8}
                    md={4}
                    key={product.id}
                  >
                    <ProductCard
                      image={product.imageUrl}
                      title={product.name}
                      description={product.description}
                      productId={product.id}
                      isAdmin={isAdmin}
                      inventoryQuantity={product.inventoryQty}
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
        {/* //Pagination */}
        {/* <Stack className="all-prod-page-nums" spacing={2}>
          <Pagination
            count={numPages}
            page={this.state.page}
            onChange={handleChange}
          />
        </Stack> */}
      </Container>
    </div>
  );
};

export default AllProducts;
