const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://www.firstforwomen.com/wp-content/uploads/sites/2/2019/03/adult-lunch-box-e1581541112542.jpg",
  },
  featured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  size: Sequelize.STRING,
  inventoryQty: Sequelize.INTEGER,
});

module.exports = Product;
