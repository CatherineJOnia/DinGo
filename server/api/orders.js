const express = require("express");
const router = express.Router();
const Order = require("../db/models/Order");
const User = require("../db/models/User");
const Cart = require("../db/models/Cart");
const Product = require("../db/models/Product");

router.get("/cart/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    let cart = await Order.findCart(userId);
    let cartContents = await Order.findCartContents(cart.dataValues.id);
    let orderTotal = cart.findTotalPrice(cartContents[0].dataValues.order);
    let totalQty = cart.findTotalQuantity(cartContents[0].dataValues.order);
    cartContents[0].dataValues.orderTotal = orderTotal;
    cartContents[0].dataValues.totalQuantity = totalQty;
    cart.save();
    res.send(cartContents);
  } catch (error) {
    next(error);
  }
});

router.put("/cart/addToCart/:userId/:productId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    let quantity = 1;
    let cart = await Order.findOne(userId);
    let product = await Product.findOne(productId);
    let matchingOrder = await Cart.findMatchingOrder(productId, cart.id);

    if (matchingOrder) {
      matchingOrder.adjustItemOrder(product.price, matchingOrder.quantity + 1);
      await matchingOrder.save();
      res.send(matchingOrder);
    } else {
      let totalPrice = quantity * product.price;

      await cart.addProduct(product, {
        through: {
          quantity,
          totalPrice,
        },
      });

      let newOrder = await Cart.findMatchingOrder(productId, cart.id);
      res.send(newOrder);
    }
  } catch (error) {
    next(error);
  }
});

router.put(
  "/cart/updateItemQuantity/:cartId/:productId",
  async (req, res, next) => {
    try {
      const cartId = req.params.cartId;
      let productId = req.params.productId;
      let quantity = req.body.quantity;
      let product = await Product.findByPk(productId);
      let matchingOrder = await Cart.findMatchingOrder(productId, cartId);

      await matchingOrder.adjustItemOrder(product.price, quantity);
      await matchingOrder.save();
      res.send(matchingOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/cart/updateTotals/:cartId", async (req, res, next) => {
  let cartId = req.params.cartId;
  let cart = await Order.findByPk(cartId);
  let cartContents = await Order.findCartContents(cartId);
  let orderTotal = cart.findTotalPrice(
    cartContents[0].dataValues.order_details
  );
  cartContents[0].dataValues.orderTotal = orderTotal;
  cart.save();
  res.send({ orderTotal });
});

router.put("/cart/checkout/:userId", async (req, res, next) => {
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

router.delete(
  "/cart/deleteItem/:orderId/:productId",
  async (req, res, next) => {
    try {
      const orderId = req.params.orderId;
      const productId = req.params.productId;
      const deleted = await Cart.findMatchingOrder(productId, orderId);
      await deleted.destroy();
      res.send(deleted);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
