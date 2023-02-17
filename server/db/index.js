const Sequelize = require("sequelize");

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const Order = require("./models/Order");

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: Cart });
Product.belongsToMany(Order, { through: Cart });

Cart.belongsTo(Order);
Order.hasMany(Cart);

Cart.belongsTo(Product);
Product.hasMany(Cart);

module.exports = {
  db,
  User,
  Order,
  Product,
  Cart,
};
