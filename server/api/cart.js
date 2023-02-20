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

router.post("/:userId/:productId", async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.params.userId,
        isComplete: false,
      },
    });
    const product = await Product.findOne({
      where: {
        id: req.params.productId,
      },
    });
    await order.addProduct(product);
    res.send(order);
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
