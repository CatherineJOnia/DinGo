import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  deleteFromCartAsync,
  fetchOrderAsync,
  editCartAsync,
  updateItemQuantityAsync,
  selectCart,
  increase,
  decrease,
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

  const me = useSelector((state) => state.auth.me);
  const userId = useSelector((state) => state.auth.me.id);
  const cart = useSelector(selectCart);
  const order = useSelector((state) => state.auth.me.orders);

  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = async (orderId, productId, quantity) => {
    setQuantity(quantity++);
    await dispatch(editCartAsync({ orderId, productId, quantity }));
    dispatch(fetchOrderAsync(userId));
  };

  const handleDecrement = async (orderId, productId, quantity) => {
    setQuantity(quantity--);
    await dispatch(editCartAsync({ orderId, productId, quantity }));
    dispatch(fetchOrderAsync(userId));
  };

  const handleDelete = async () => {
    await dispatch(deleteFromCartAsync(order.orderId, order.productId));
  };

  const calculateSubtotal = () => {
    var total = 0;
    for (var product of cart) {
      product.cart
        ? (total += Number(product.price) * product.cart.quantity)
        : null;
    }
    setSubtotal(total);
  };

  const calculateTax = () => {
    var tax = 0;
    tax += Number(subtotal) * 0.07;
    setTax((Math.round(tax * 100) / 100).toFixed(2));
  };

  const calculateTotal = () => {
    var total = 0;
    total += Number(subtotal);
    total += Number(tax);
    setOrderTotal((Math.round(total * 100) / 100).toFixed(2));
  };

  useEffect(() => {
    calculateSubtotal();
    calculateTax();
    calculateTotal();
  }, [handleIncrement, handleDecrement, handleDelete]);

  useEffect(() => {
    dispatch(fetchOrderAsync(userId));
  }, [dispatch]);

  return (
    <div className="cartReviewDiv">
      {cart && cart.length === 0 ? (
        "Your cart is empty. Check out our Products page to find your perfect DinGo!"
      ) : (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <List disablePadding>
            {cart.map((product, index) => {
              return (
                <ListItem key={index} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={product ? product.name : null} />
                  <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                  >
                    <Button
                      onClick={async () => {
                        handleIncrement(
                          product.cart.orderId,
                          product.cart.productId,
                          product.cart.quantity
                        );
                      }}
                    >
                      +
                    </Button>

                    {
                      <Button disabled>
                        {product.cart ? product.cart.quantity : "1"}
                      </Button>
                    }

                    {
                      <Button
                        onClick={async () => {
                          dispatch(
                            handleDecrement(
                              product.cart.orderId,
                              product.cart.productId,
                              product.cart.quantity
                            )
                          );
                        }}
                      >
                        -
                      </Button>
                    }

                    <Button
                      onClick={async (evt) => {
                        evt.preventDefault();
                        await dispatch(
                          deleteFromCartAsync(product.cart.productId)
                        );
                        dispatch(fetchOrderAsync(userId));
                      }}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </ListItem>
              );
            })}
            <hr />

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Subtotal" />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                ${subtotal}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Tax" />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                ${tax}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Shipping" />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                FREE
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" variant="h6" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                ${orderTotal}
              </Typography>
            </ListItem>
          </List>
          <hr />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
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
