const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const User = require("./User");

const Order = db.define("order", {
  orderTotal: Sequelize.INTEGER,
  totalQty: Sequelize.INTEGER,
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  datePlaced: Sequelize.DATEONLY,
  dateShipped: Sequelize.DATEONLY,
});

//this method will find a cart - the open order associated with a userId passed into the method
Order.findCart = async function (userId) {
  try {
    let cart = await this.findOne({
      where: {
        userId: userId,
        isComplete: false,
      },
    });

    return cart;
  } catch (ex) {
    const error = Error("Error finding cart");
    throw error;
  }
};

// this method creates a new cart and creates the association between user and order
Order.createCart = async (userId, user) => {
  if (user === null) return null;
  const cart = await Order.create();
  await user.addOrder(cart);
  await cart.save();
  return cart;
};

//find the contents of a cart , aka an order that matches the orderId passed in ... and include details on the related products
Order.findCartContents = async function (orderId) {
  try {
    const cartContents = this.findAll({
      where: {
        id: orderId,
      },
      include: [
        {
          model: Product,
        },
        {
          model: Cart,
        },
      ],
    });
    return cartContents;
  } catch (ex) {
    const error = Error("Error finding cart contents");
    throw error;
  }
};

Order.prototype.findTotalPrice = function (itemPrices) {
  try {
    let sum = 0;
    itemPrices.forEach((item) => {
      sum += item.dataValues.totalPrice;
    });
    this.orderTotal = sum;
    return sum;
  } catch (ex) {
    const error = Error("Error finding total cost");
    throw error;
  }
};

Order.prototype.findTotalQuantity = function (items) {
  try {
    let total = 0;
    items.forEach((item) => {
      total += item.dataValues.quantity;
    });
    this.totalQty = total;
    return total;
  } catch (e) {
    const error = Error("Error finding total quantity");
    throw error;
  }
};

module.exports = Order;
