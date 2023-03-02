const express = require("express");
const router = express.Router();
const Order = require("../db/models/Order");
const User = require("../db/models/User");
const Cart = require("../db/models/Cart");
const Product = require("../db/models/Product");

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const orderToFulfill = await Order.findOne({
      where: {
        isComplete: false,
        userId: req.params.userId,
      },
    });
    const productCart = await orderToFulfill.getProducts();
    res.status(200).json(productCart);
  } catch (error) {
    next(error);
  }
});

router.put("/checkout/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    let cart = await Order.findCart(userId);
    cart.isComplete = true;
    cart.save();

    const user = await User.findOne({ where: { id: userId } });
    let newCart = await Order.createCart(userId, user);
    let cartContents = await Order.findCartContents(newCart.dataValues.id);
    res.json(cartContents);
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteItem/:orderId/:productId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    const deleted = await Cart.findMatchingOrder(productId, orderId);
    await deleted.destroy();
    res.send(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
