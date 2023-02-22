const { green, red } = require("chalk");
const { db, User, Order, Product } = require("../server/db");

const users = [
  {
    email: "scottdal@gmail.com",
    password: "123scott",
    firstName: "Scott",
    lastName: "D'Alessandro",
    isAdmin: false,
    address1: "204 Test Street",
    city: "New York City",
    country: "USA",
  },
  {
    email: "nimit@gmail.com",
    password: "123nimit",
    firstName: "Nimit",
    lastName: "Maru",
    isAdmin: false,
    address1: "208 Test Street",
    city: "New York City",
    country: "USA",
  },
  {
    email: "david@gmail.com",
    password: "123david",
    firstName: "David",
    lastName: "Yang",
    isAdmin: false,
    address1: "209 Test Street",
    city: "New York City",
    country: "USA",
  },
  {
    email: "cat@dingo.com",
    password: "123cat",
    firstName: "Catherine",
    lastName: "Onia",
    isAdmin: true,
    address1: "1456 Main Street",
    city: "Atlanta",
    country: "USA",
  },
  {
    email: "mae@dingo.com",
    password: "123mae",
    firstName: "Mae",
    lastName: "May",
    isAdmin: true,
    address1: "1938 Hoover Avenue",
    city: "New York",
    country: "USA",
  },
  {
    email: "amy@dingo.com",
    password: "123amy",
    firstName: "Amy",
    lastName: "Chun",
    isAdmin: true,
    address1: "1064 Star Street",
    city: "San Francisco",
    country: "USA",
  },
  {
    email: "kara@dingo.com",
    password: "123kara",
    firstName: "Kara",
    lastName: "Cavanaugh",
    isAdmin: true,
    address1: "1008 Washington Street",
    city: "Tacoma",
    country: "USA",
  },
  {
    email: "maxiel@dingo.com",
    password: "123maxiel",
    firstName: "Maxiel",
    lastName: "Mrvaljevic",
    isAdmin: true,
    address1: "001 Mallard Street",
    city: "Montenegro",
    country: "Montenegro",
  },
  {
    email: "guest@dingo.com",
    password: "123",
    firstName: "guest",
    lastName: "account",
    isAdmin: false,
    address1: "123 Test Street",
    city: "New York City",
    country: "USA",
  },
];

const products = [
  {
    name: "Michelin Madness",
    price: 150,
    description:
      "Six-course meal by Michelin Chef Boyardee. Featuring miso marinated black cod, aged A5 wagyu, and fresh farm-to-table vegetables.",
    size: "Large",
    inventoryQty: 4,
    imageUrl: "/images/bento2.png",
  },
  {
    name: "Wagyu-Uni Pairing",
    price: 110,
    description:
      "Freshly torched A5 wagyu nigiri is paired with freshly-cut radishes, topped with creamy Hokkaido uni.",
    size: "Medium",
    inventoryQty: 6,
    imageUrl: "/images/bento3.png",
  },
  {
    name: "Daily Bento",
    price: 40,
    description:
      "Surprise yourself with our house bento, featuring sashimi from the freshest fish, caught daily",
    size: "Large",
    featured: true,
    inventoryQty: 20,
    imageUrl: "/images/bento4.png",
  },
  {
    name: "Udon Duo",
    price: 40,
    description:
      "Garlic shrimp and stir-fried udon with a fresh radish and egg salad",
    size: "Large",
    inventoryQty: 20,
    imageUrl: "/images/bento1.png",
  },
  {
    name: "Sushi and Tempura Pairing",
    price: 30,
    description:
      "Tempura shrimp with fresh salmon nigiri, spicy tuna roll, and accoutrements",
    size: "Large",
    inventoryQty: 30,
    imageUrl: "/images/bento5.png",
  },
  {
    name: "Bouquet Bento",
    price: 60,
    description:
      "Beautifully arranged edible flowers atop a fresh, organic salad",
    size: "Medium",
    inventoryQty: 15,
    featured: true,
    imageUrl: "/images/bento6.png",
  },
  {
    name: "Sashimi Special",
    price: 60,
    description:
      "Expertly cut scottish salmon belly, aged bluefin tuna, buttery yellowtail, young yellowtail, striped jack and sea urchin and placed artfully in this bento box.",
    size: "Small",
    inventoryQty: 6,
    imageUrl: "/images/bento7.png",
  },
  {
    name: "Izakaya Bento",
    price: 20,
    description:
      "Featuring grilled shrimp, teriyaki Jidori chicken wing, grilled salmon, Hokkaido scallop sashimi salad, a sushi roll with albacore, shrimp, avocado, and cucumber, and loads of other hidden specialtie, this bento is sure to be an exciting meal.",
    size: "Medium",
    inventoryQty: 20,
    imageUrl: "/images/bento8.png",
  },
  {
    name: "Vegetarian Bento",
    price: 20,
    description: "An assortment of pickled vegetables and house-made tofu.",
    size: "Medium",
    inventoryQty: 6,
    imageUrl: "/images/bento9.png",
  },
  {
    name: "Pesto Party",
    price: 30,
    description:
      "House basil pesto with our daily pasta is served with a fruits, salad, and dessert",
    size: "Large",
    inventoryQty: 6,
    imageUrl: "/images/bento10.png",
  },
  {
    name: "Katsu Chicken Bento",
    price: 25,
    description:
      "Crispy panko-fried chicken, salad, and rice in fun character shapes.",
    size: "Small",
    inventoryQty: 15,
    imageUrl: "/images/bento11.png",
  },
  {
    name: "Fishcake Ensemble",
    price: 25,
    description:
      "Fishcakes in assorted shapes and flavors with character-cut sausages",
    size: "Small",
    inventoryQty: 15,
    imageUrl: "/images/bento12.png",
  },
  {
    name: "Spring Rolls",
    price: 25,
    description:
      "Crystal rice paper wraps thinly-cut shrimp, rice noodles, cucumber strips, and edible flowers.",
    size: "Small",
    featured: true,
    inventory_quantity: 20,
    imageUrl: "/images/bento13.png",
  },
  {
    name: "Picky Kiddies",
    price: 25,
    description:
      "Picky eaters at home? Enamour them with character-shaped egg and fish cakes with salmon roe and rice",
    size: "Small",
    inventory_quantity: 30,
    imageUrl: "/images/bento14.png",
  },
  {
    name: "Grilled Salmon",
    price: 25,
    description:
      "Perfectly-grilled salmon with a consistent crisp and char, accompanied with steamed vegetables and rice pilaf ",
    size: "Medium",
    featured: true,
    inventory_quantity: 15,
    imageUrl: "/images/bento15.png",
  },
];

const orders = [
  {
    orderTotal: 260,
    totalQty: 2,
    datePlaced: "02-17-2023",
  },
  {
    orderTotal: 110,
    totalQty: 5,
    isComplete: false,
    datePlaced: "05-21-2021",
  },
  {
    orderTotal: 80,
    totalQty: 1,
    isComplete: true,
    datePlaced: "04-21-2021",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    // seed your database here!
    const userModels = await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    const productModels = await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    );

    const orderModels = await Promise.all(
      orders.map((order) => {
        return Order.create(order);
      })
    );

    const [scott, nimit, david] = userModels;
    await scott.addOrders([orderModels[0]]);
    await nimit.addOrders([orderModels[1]]);
    await david.addOrders([orderModels[2]]);

    const [order1, order2, order3] = orderModels;
    await order1.addProducts([productModels[0], productModels[1]]);
    await order2.addProducts([productModels[2]], [productModels[3]]);
    await order3.addProducts([productModels[4]], [productModels[5]]);

    console.log(green("Seeding success!"));
    db.close();
  } catch (err) {
    console.log(red("Error seeding database:", err));
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Error seeding database!"));
      console.error(err);
      db.close();
    });
}
