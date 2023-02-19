import axios from "axios";

//ACTION TYPES
const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";
const DELETE_ITEM_FROM_CART = "DELETE_ITEM";

//ACTION CREATORS
export const setCart = (itemsInCart) => ({
  type: SET_CART,
  itemsInCart,
});
const _addToCart = (itemAdded) => ({
  type: ADD_TO_CART,
  itemAdded,
});
const _updateItemQuantity = (itemAdjusted, totalPriceUpdated) => {
  let order_total = totalPriceUpdated["order_total"];
  return {
    type: UPDATE_ITEM_QUANTITY,
    itemAdjusted,
    order_total,
  };
};

const _deleteItemFromCart = (itemDeleted, totalPriceUpdated) => {
  let order_total = totalPriceUpdated["order_total"];
  return {
    type: DELETE_ITEM_FROM_CART,
    itemDeleted,
    order_total,
  };
};

//THUNKS

export const fetchItemsInCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data: itemsInCart } = await axios.get(
        `/api/orders/cart/${userId}`
      );
      dispatch(setCart(itemsInCart));

      //IF USER IS LOGGED IN GET DATA FROM BACKEND IF NOT GET IT FROM LOCAL STORAGE
    } catch (error) {
      console.log("An error occurred in the fetchItemsInCart thunk");
    }
  };
};

export const addItemToCart = (userId, productId) => {
  return async (dispatch) => {
    try {
      const { data: itemAdded } = await axios.put(
        `/api/orders/addToCart/${userId}/${productId}`
      );
      dispatch(_addToCart(itemAdded));
    } catch (error) {
      console.log("An error occurred in the addItemToCart thunk: ", error);
    }
  };
};

export const updateItemQuantity = (cartId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const { data: itemUpdated } = await axios.put(
        `/api/orders/cart/updateItemQuantity/${cartId}/${productId}`,
        { quantity }
      );
      const { data: totalPriceUpdated } = await axios.get(
        `api/orders/cart/updateTotals/${cartId}`
      );
      dispatch(_updateItemQuantity(itemUpdated, totalPriceUpdated));
    } catch (error) {
      console.log("An error occurred in the updateItemQuantity thunk: ", error);
    }
  };
};

export const checkoutCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data: newCart } = await axios.put(
        `/api/orders/cart/checkout/${userId}`
      );
      dispatch(setCart(newCart));
    } catch (error) {
      console.log("An error occurred in the checkoutCart thunk: ", error);
    }
  };
};

export const deleteItemFromCart = (orderId, productId) => {
  return async (dispatch) => {
    try {
      const { data: deletedItem } = await axios.delete(
        `api/orders/cart/deleteItem/${orderId}/${productId}`
      );
      const { data: totalPriceUpdated } = await axios.get(
        `api/orders/cart/updateTotals/${orderId}`
      );
      dispatch(_deleteItemFromCart(deletedItem, totalPriceUpdated));
    } catch (error) {
      console.log("An error occurred in the deleteItemFromCart thunk: ", error);
    }
  };
};

//SUBREDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.itemsInCart;
    case ADD_TO_CART:
      return [
        {
          ...state[0],
          order_details: [...state[0].order_details, action.itemAdded],
        },
      ];
    case UPDATE_ITEM_QUANTITY:
      return [
        {
          ...state[0],
          order_total: action.order_total,
          order_details: state[0].order_details.map((item) =>
            item.productId === action.itemAdjusted.productId &&
            item.orderId === action.itemAdjusted.orderId
              ? action.itemAdjusted
              : item
          ),
        },
      ];
    case DELETE_ITEM_FROM_CART:
      return [
        {
          ...state[0],
          order_total: action.order_total,
          order_details: state[0].order_details.filter(
            (item) => item.productId !== action.itemDeleted.productId
          ),
        },
      ];
    default:
      return state;
  }
}
