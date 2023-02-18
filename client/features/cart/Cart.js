import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartAsync,
  fetchOrderAsync,
  addToCartAsync,
  selectCart,
} from "./cartSlice";
import { me } from "../auth/authSlice";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const { id } = useSelector((state) => state.auth.me);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchOrderAsync(id));
  }, [dispatch, id]);

  return (
    <div className="all-items">
      <h1>Review Items for Checkout</h1>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          justifyContent: "center",
        }}
      >
        {cart.length < 1 && (
          <div>
            <h2>Cart is empty!</h2>
          </div>
        )}
        {cart.map((product) => {
          return (
            <div key={product.productId}>
              <Card
                raised
                sx={{
                  width: 280,
                  ml: 10,
                  mb: 3,
                  padding: "0.1em",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.imageUrl}
                  height="300"
                  width="300"
                />
                <CardContent>
                  <Link to={`/products/${product.id}`}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {product.price}
                  </Typography>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Tooltip title="Remove from cart">
                      <DeleteIcon
                        type="delete"
                        onClick={async (evt) => {
                          evt.preventDefault();
                          await dispatch(
                            deleteCartProductAsync(product.id, product.name)
                          );
                          await dispatch(fetchOrderAsync(id));
                        }}
                      />
                    </Tooltip>
                  </CardActions>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </Grid>
      <Link to="/orderconfirmation">
        <div className="continue-shopping">
          <Button
            align="center"
            variant="contained"
            sx={{
              bgcolor: "#28536B",
              "&:hover": {
                bgcolor: "#598588",
              },
            }}
          >
            Purchase
          </Button>
        </div>
      </Link>
      <Link to="/cart">
        <div className="continue-shopping">
          <Button
            align="center"
            variant="contained"
            sx={{
              bgcolor: "#28536B",
              "&:hover": {
                bgcolor: "#598588",
              },
            }}
          >
            Cancel
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default Checkout;
