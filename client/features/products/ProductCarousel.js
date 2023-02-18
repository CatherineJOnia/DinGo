import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeaturedProducts,
  selectFeaturedProducts,
} from "../products/featuredProductsSlice";
import { Link } from "react-router-dom";

import Carousel from "react-material-ui-carousel";
import { Button, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Work Sans"].join(","),
  },
  palette: {
    primary: {
      main: "#5b7b7a",
    },
    secondary: {
      main: "#ceb5a7",
    },
  },
});

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const featuredProducts = useSelector(selectFeaturedProducts);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <Carousel>
      {featuredProducts && featuredProducts.length
        ? featuredProducts.map((product) => {
            return (
              <div key={product.id}>
                <img className="all-prod-carousel-img" src={product.imageUrl} />
                <div className="all-prod-carousel-txt">
                  <h1>{product.name}</h1>
                  <Link to={`/products/${product.id}`}>
                    <ThemeProvider theme={theme}>
                      <Button
                        sx={{ mt: 2 }}
                        size="medium"
                        variant="contained"
                        color="primary"
                      >
                        Shop Now
                      </Button>
                    </ThemeProvider>
                  </Link>
                </div>
              </div>
            );
          })
        : null}
    </Carousel>
  );
};

export default ProductCarousel;
