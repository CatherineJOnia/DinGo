import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  deleteFromCartAsync,
  fetchOrderAsync,
  editCartAsync,
  updateItemQuantityAsync,
  selectCart,
} from "./cartSlice";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";

const Review = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const cart = useSelector(selectCart);
  const auth = useSelector((state) => state.auth);
  const { orderId } = useParams();
  const { productId } = useParams();
  const { products } = useParams();

  let quantity = 1;

  let productNameMap = {};
  {
    console.log("cart cart", cart);
    // cart && cart.length > 0
    //   ? cart.products.forEach((product) => {
    //       productNameMap[product.id] = product.name;
    //     })
    //   : null;
  }

  const handleIncrement = (orderId, productId, quantity) => {
    let newQuantity = quantity + 1;
    updateItemQuantityAsync(orderId, productId, newQuantity);
  };

  const handleDecrement = (orderId, productId, quantity) => {
    let newQuantity = quantity - 1;
    updateItemQuantityAsync(orderId, productId, newQuantity);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    deleteFromCartAsync(orderId, productId);
  };

  useEffect(() => {
    dispatch(fetchOrderAsync(userId));
    // dispatch(updateItemQuantityAsync(orderId, productId, quantity));
    // dispatch(editCartAsync(orderId));
  }, [dispatch]);

  return (
    <div className="loadingDiv">
      {/* {this.loading ? (
          CircularLoading()
      ) : ( */}
      <div className="cartReviewDiv">
        {cart.length === 0 ? (
          "Your cart is empty. Check out our Products page to find your perfect DinGo!"
        ) : (
          // <Typography variant="h6" gutterBottom>
          //   <Link to="/products">
          //     Your cart is empty. Check out our Products page to find your
          //     perfect room!
          //   </Link>
          // </Typography>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {cart && cart.length
                ? cart.map((orderRow) => {
                    <ListItem
                      key={orderRow.orderId + orderRow.productId}
                      sx={{ py: 1, px: 0 }}
                    >
                      <ListItemText
                        primary={productNameMap[orderRow.productId]}
                        secondary={
                          <ButtonGroup
                            size="small"
                            aria-label="small outlined button group"
                          >
                            <Button
                              onClick={() =>
                                handleIncrement(
                                  orderRow.orderId,
                                  orderRow.productId,
                                  orderRow.quantity
                                )
                              }
                            >
                              +
                            </Button>
                            {<Button disabled>{orderRow.quantity}</Button>}
                            {
                              <Button
                                onClick={() =>
                                  handleDecrement(
                                    orderRow.orderId,
                                    orderRow.productId,
                                    orderRow.quantity
                                  )
                                }
                              >
                                -
                              </Button>
                            }
                            <Button onClick={() => handleDelete(orderRow)}>
                              Delete
                            </Button>
                          </ButtonGroup>
                        }
                      />
                      <Typography variant="body2">
                        ${orderRow.totalPrice}
                      </Typography>
                    </ListItem>;
                  })
                : null}

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  ${cart[0].orderTotal}
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Shipping To:
                </Typography>
                <Typography gutterBottom>
                  {auth.firstName} {auth.lastName}
                </Typography>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ mt: 2 }}
                ></Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </div>
      {/* ) */}
    </div>
  );
};

export default Review;
