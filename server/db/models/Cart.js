const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
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

Cart.prototype.adjustItemOrder = function (price, quantity) {
  this.quantity = quantity;
  this.totalPrice = price * quantity;
  return this;
};

module.exports = Cart;
