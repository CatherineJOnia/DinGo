import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  deleteFromCartAsync,
  fetchOrderAsync,
  editCartAsync,
  updateItemQuantityAsync,
  selectCart,
  increase,
  decrease,
} from "./cartSlice";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  ButtonGroup,
} from "@mui/material";

const GuestCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

  const subtotal = cart.reduce((subtotal, product) => {
    subtotal += product.price * product.quantity;
    return subtotal;
  }, 0);

  const tax = (Number(subtotal) * 0.07).toFixed(2);

  const total = (Number(subtotal) + Number(tax)).toFixed(2);

  useEffect(() => {
    if (cart) setCart(cart);
  }, [cart]);

  var quantityValues = [];
  for (var i = 1; i <= 50; i++) {
    quantityValues.push(i);
  }

  return (
    <div className="cartReviewDiv">
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {cart && cart.length
            ? cart.map((product) => {
                return (
                  <ListItem key={product.productId} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={product.name} />
                    <ButtonGroup
                      size="small"
                      aria-label="small outlined button group"
                    >
                      <Button
                        onClick={() => {
                          if (product.quantity >= 1) {
                            const _product = cart.filter((prod) => {
                              return +prod.productId === product.id;
                            })[0];
                            const index = cart.indexOf(_product);
                            product.quantity++;
                            cart[index] = _product;
                            window.localStorage.cart = JSON.stringify(cart);
                            setCart(cart);
                            dispatch(navigate("/cart"));
                          }
                          return;
                        }}
                      >
                        +
                      </Button>

                      {<Button disabled>{product.quantity}</Button>}

                      {
                        <Button
                          onClick={() => {
                            if (product.quantity === 1) {
                              product.quantity = 1;
                            } else if (product.quantity > 1) {
                              product.quantity--;
                              window.localStorage.cart = JSON.stringify(cart);
                              setCart(cart);
                              dispatch(navigate("/cart"));
                            }
                            return;
                          }}
                        >
                          -
                        </Button>
                      }

                      <Button
                        onClick={() => {
                          window.localStorage.removeItem("cart");
                          let cartState = cart.filter((cartItem) => {
                            return cartItem.id !== product.id;
                          });
                          let newCart = JSON.stringify(cartState);
                          window.localStorage.setItem("cart", newCart);
                          setCart(cartState);
                          dispatch(navigate("/cart"));
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </ListItem>
                );
              })
            : null}
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
              ${total}
            </Typography>
          </ListItem>
        </List>
        <hr />
      </React.Fragment>
    </div>
  );
};

export default GuestCart;
