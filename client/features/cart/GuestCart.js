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

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const GuestCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const editItem2 = (itemID, amount) => {
    let cartCopy = [...cart];
    //find if item exists, just in case
    let existingItem = cartCopy.find((item) => item.productId === itemID);
    //if it doesn't exist simply return
    if (!existingItem) return;
    //continue and update quantity
    existingItem.quantity += amount;
    //validate result
    if (existingItem.quantiy <= 0) {
      // remove item by filtering it from cart array
      cartCopy = cartCopy.filter((item) => item.productId !== itemID);
    }
    // update state and local state
    setCart(cartCopy);
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  };

  const editItem = (itemId, amount) => {
    if (!localStorage.getItem) {
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));

      const existingItem = cartArray.find((item) => item.id === newItem.id);
      if (!existingItem) return;
      existingItem.quantity += amount;
      if (existingItem.quantity <= 0)
        console.log("newItem.quantity", newItem.quantity);
    }
  };

  const total = cart.reduce((subtotal, product) => {
    subtotal += product.price * product.quantity;
    return subtotal;
  }, 0);

  const calculateSubtotal = () => {
    var total = 0;
    for (var product of cart) {
      product.cart ? (total += Number(product.price) * product.quantity) : null;
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

  // useEffect(() => {
  //   calculateSubtotal();
  //   calculateTax();
  //   calculateTotal();
  // }, [dispatch]);

  useEffect(() => {
    if (cart) setCart(cart);
  }, [cart]);

  var quantityValues = [];
  for (var i = 1; i <= 50; i++) {
    quantityValues.push(i);
  }

  return (
    <div className="cartReviewDiv">
      {/* {cart && cart.length === 0 ? (
            "Your cart is empty. Check out our Products page to find your perfect DinGo!"
          ) : ( */}
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
      {/* )} */}
    </div>
  );
};

export default GuestCart;
