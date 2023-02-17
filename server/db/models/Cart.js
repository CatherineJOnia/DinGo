const Sequelize = require("sequelize");
const db = require("../db");
const Order = require("./Order");
const Product = require("./Product");

const Cart = db.define("order_detail", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

//take a products id and order id, passed in from route, and return the row in order detail that contains both - if such an order exists
Cart.findMatchingOrder = async function (productId, orderId) {
  try {
    const matchingOrder = this.findOne({
      where: {
        productId: productId,
        orderId: orderId,
      },
    });
    return matchingOrder;
  } catch (ex) {
    const error = Error("Error finding matching order");
    throw error;
  }
};

//take in a product's price and the quantity a user has added to their previous quantity choice
Cart.prototype.adjustItemOrder = function (price, quantity) {
  this.quantity = quantity;
  this.totalPrice = price * quantity;
  return this;
};

module.exports = Cart;
