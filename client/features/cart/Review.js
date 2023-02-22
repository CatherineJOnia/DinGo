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
import { CardTravelOutlined, CardTravelSharp } from "@mui/icons-material";

const Review = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const cart = useSelector(selectCart);
  const { orderId } = useParams();
  const { productId } = useParams();
  const { products } = useParams();
  const orders = useSelector((state) => state.auth.me.orders);
  const me = useSelector((state) => state.auth.me);
  let quantity = 1;

  const handleIncrement = async (orderId, productId, quantity) => {
    let newQuantity = quantity + 1;
    await dispatch(editCartAsync({ orderId, productId, newQuantity }));
  };

  const handleDecrement = async (orderId, productId, quantity) => {
    let newQuantity = quantity - 1;
    await dispatch(editCartAsync({ orderId, productId, newQuantity }));
  };

  const handleDelete = async () => {
    await dispatch(deleteFromCartAsync(productId));
  };

  useEffect(() => {
    dispatch(fetchOrderAsync(userId));
  }, [dispatch]);

  return (
    <div className="cartReviewDiv">
      {cart.length === 0 ? (
        "Your cart is empty. Check out our Products page to find your perfect DinGo!"
      ) : (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          <List disablePadding>
            {cart.map((products, index) => {
              return (
                <ListItem key={index} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={products.name}
                    secondary={
                      <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                      >
                        <Button
                          onClick={() => {
                            handleIncrement();
                          }}
                        >
                          +
                        </Button>
                        {<Button disabled>{quantity}</Button>}
                        {
                          <Button
                            onClick={() =>
                              handleDecrement({ orderId, productId, quantity })
                            }
                          >
                            -
                          </Button>
                        }
                        <Button
                          onClick={() => handleDelete({ userId, productId })}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    }
                  />
                  <Typography variant="body2">${products.price}</Typography>
                </ListItem>
              );
            })}

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                ${cart.orderTotal}
              </Typography>
            </ListItem>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Shipping To:
              </Typography>
              <Typography gutterBottom>
                {me.firstName} {me.lastName}
              </Typography>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
};

export default Review;
