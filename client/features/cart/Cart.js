import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.setCartToState = this.setCartToState.bind(this);
  }

  async componentDidMount() {
    const cart = JSON.parse(window.localStorage.cart);
    try {
      this.setCartToState(cart);
    } catch (error) {
      console.error(error);
    }
  }

  setCartToState(cart) {
    this.setState({
      products: cart,
    });
  }

  render() {
    if (!window.localStorage.cart) {
      window.localStorage.cart = JSON.stringify([]);
    }
    let guestCart = JSON.parse(window.localStorage.cart);
    const productsInCart = this.state.products;

    const total = productsInCart.reduce((subtotal, product) => {
      subtotal += product.price * product.quantity;
      return subtotal;
    }, 0);

    return (
      <div className="cartReviewDiv">
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          <List disablePadding>
            {guestCart.map((product) => (
              <ListItem key={product.productId} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.name} />
                <ButtonGroup
                  size="small"
                  aria-label="small outlined button group"
                >
                  <Button
                    onClick={() => {
                      if (product.quantity >= 1) {
                        const _product = guestCart.filter((prod) => {
                          return +prod.productId === product.id;
                        })[0];
                        const index = guestCart.indexOf(_product);
                        product.quantity += 1;
                        guestCart[index] = _product;
                        window.localStorage.cart = JSON.stringify(guestCart);
                        this.setCartToState(guestCart);
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
                          product.price = product.price;
                        } else if (product.quantity > 1) {
                          product.quantity -= 1;
                          window.localStorage.cart = JSON.stringify(guestCart);
                          this.setCartToState(guestCart);
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
                      let cartState = productsInCart.filter((cartItem) => {
                        return cartItem.productId !== product.productId;
                      });
                      let newCart = JSON.stringify(cartState);
                      window.localStorage.setItem("cart", newCart);
                      this.setCartToState(cartState);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </ListItem>
            ))}
            <hr />

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                ${total.toFixed(2)}
              </Typography>
            </ListItem>
          </List>
        </React.Fragment>
      </div>
    );
  }
}

export default Cart;
