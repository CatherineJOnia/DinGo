const Sequelize = require("sequelize");
const db = require("../db");

const ProductsInCarts = db.define("productsInCarts", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 50,
    },
    allowNull: true,
  },
});

module.exports = ProductsInCarts;
