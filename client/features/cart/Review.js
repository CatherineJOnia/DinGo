import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import {
  deleteItemFromCart,
  fetchItemsInCart,
  updateItemQuantity,
} from "./cartSlice";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const id = this.props.auth.id;
    this.props.fetchItemsInCart(id);
  }

  componentWillUnmount() {
    this.setState({
      loading: true,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.id !== this.props.auth.id) {
      this.props.fetchItemsInCart(this.props.auth.id);
      this.setState({
        loading: false,
      });
    }

    // if (prevProps.cart.id !== this.props.cart.id) {
    //   this.props.fetchItemsInCart(this.props.auth.id);
    //   this.setState({
    //     loading: false,
    //   });
    // }
  }

  handleIncrement(orderId, productId, quantity) {
    let newQuantity = quantity + 1;
    this.props.updateItemQuantity(orderId, productId, newQuantity);
  }

  handleDecrement(orderId, productId, quantity) {
    let newQuantity = quantity - 1;
    this.props.updateItemQuantity(orderId, productId, newQuantity);
  }

  handleDelete(order) {
    this.props.deleteItemFromCart(order.orderId, order.productId);
  }

  render() {
    const { cart } = this.props;
    let productNameMap = {};
    if (cart.length > 0) {
      cart[0].products.forEach((product) => {
        productNameMap[product.id] = product.name;
      });
    }

    return (
      <div className="loadingDiv">
        {this.loading ? (
          CircularLoading()
        ) : (
          <div className="cartReviewDiv">
            {cart.length === 0 ? (
              ""
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
                  {cart[0].order_details.map((orderRow) => (
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
                                this.handleIncrement(
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
                                  this.handleDecrement(
                                    orderRow.orderId,
                                    orderRow.productId,
                                    orderRow.quantity
                                  )
                                }
                              >
                                -
                              </Button>
                            }
                            <Button onClick={() => this.handleDelete(orderRow)}>
                              Delete
                            </Button>
                          </ButtonGroup>
                        }
                      />
                      <Typography variant="body2">
                        ${orderRow.total_price}
                      </Typography>
                    </ListItem>
                  ))}

                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      ${cart[0].order_total}
                    </Typography>
                  </ListItem>
                </List>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Shipping To:
                    </Typography>
                    <Typography gutterBottom>
                      {this.props.auth.first_name} {this.props.auth.last_name}
                    </Typography>
                    {/* <Typography gutterBottom>{addresses.join(', ')}</Typography> */}
                  </Grid>
                  <Grid item container direction="column" xs={12} sm={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ mt: 2 }}
                    ></Typography>
                    {/* <Grid container>
                  {payments.map((payment) => (
                    <React.Fragment key={payment.name}>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.detail}</Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid> */}
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  fetchItemsInCart: (userId) => dispatch(fetchItemsInCart(userId)),
  updateItemQuantity: (orderId, productId, quantity) => {
    dispatch(updateItemQuantity(orderId, productId, quantity));
  },
  deleteItemFromCart: (userId, productId) =>
    dispatch(deleteItemFromCart(userId, productId)),
});

export default connect(mapState, mapDispatch)(Review);
