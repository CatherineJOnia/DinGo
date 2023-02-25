const Sequelize = require("sequelize");
const db = require("../db");

const ProductsInOrders = db.define("productsInOrders", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 50,
    },
  },
});

module.exports = ProductsInOrders;
