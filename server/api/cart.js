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

router.put("/:orderId/:productId", async (req, res, next) => {
  try {
    const productInCart = await Cart.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
      include: [Product],
    });
    res.send(await productInCart.update(req.body));
  } catch (error) {
    next(error);
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
    res.send(deletedProduct);
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteItem/:orderId/:productId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    const deleted = await Cart.findMatchingOrder(productId, orderId);
    //destroy the cart that matches the specified row
    await deleted.destroy();
    res.send(deleted);
  } catch (error) {
    next(error);
  }
});
