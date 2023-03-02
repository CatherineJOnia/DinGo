import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";
import { fetchProductsAsync, productList } from "./productsSlice";
import paginate from "./Paginate";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Pagination, Typography, Stack, Container, Grid } from "@mui/material";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(productList);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const [page, setPage] = useState(
    localStorage.getItem("currentPage")
      ? Number(localStorage.getItem("currentPage"))
      : 1
  );
  const [productsPerPage, setProductsPerPage] = useState([]);

  const handlePageChange = (event, value) => {
    localStorage.setItem("currentPage", value - 1);
    setPage(value - 1);
  };

  useEffect(() => {
    if (products.length > 0) {
      if (page > Math.ceil(products.length / 9) - 1) {
        localStorage.setItem("currentPage", page - 1);
        setPage((prev) => prev - 1);
      } else {
        setProductsPerPage(paginate(products)[page]);
      }
    }
  }, [products, page]);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div>
      {isAdmin ? (
        <div className="adminBar">
          <h5>Admin Control</h5>
          <Link to={"/addproduct"}>
            <button className="adminButton">
              <AddCircleIcon fontSize="12" /> Add a Product
            </button>
          </Link>
        </div>
      ) : null}
      <ProductCarousel />
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
          {productsPerPage && productsPerPage.length
            ? productsPerPage.map((product) => {
                return (
                  <Grid
                    className="all-prod-card-cont"
                    item
                    xs={8}
                    md={4}
                    key={product.id}
                  >
                    <ProductCard
                      imageUrl={product.imageUrl}
                      name={product.name}
                      description={product.description}
                      productId={product.id}
                      isAdmin={isAdmin}
                      inventoryQty={product.inventoryQty}
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
        <Stack className="all-prod-page-nums" spacing={2}>
          <Pagination
            count={paginate(products).length}
            page={page + 1}
            onChange={handlePageChange}
          />
        </Stack>
      </Container>
    </div>
  );
};

export default AllProducts;
