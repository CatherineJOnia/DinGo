const router = require("express").Router();

const { Cart, Order, Product } = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({ include: Product });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.put("/cart", async (req, res, next) => {
  try {
    const currentOrder = await Cart.findAll();
    if (currentOrder) {
      console.log("Your order has been completed!");
    } else {
      console.log("Oops, looks like your cart is empty!");
    }
  } catch (err) {
    next(err);
  }
});

router.put("/addToCart/:userId/:productId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    let quantity = 1;
    let cart = await Order.findCart(userId);
    let product = await Product.findByPk(productId);
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

router.delete("/:productId", async (req, res, next) => {
  try {
    const deletedProduct = await Cart.destroy({
      where: { productId: req.params.productId },
    });
    res.json(deletedProduct);
  } catch (err) {
    next(err);
  }
});
