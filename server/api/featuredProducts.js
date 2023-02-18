const router = require("express").Router();
const Product = require("../db/models/Product");

router.get("/", async (req, res, next) => {
  try {
    const featuredProducts = await Product.findAll({
      where: {
        featured: true,
      },
    });
    res.send(featuredProducts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
