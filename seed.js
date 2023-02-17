const { green, red } = require("chalk");
const {
  db,
  models: { User, Order, Product },
} = require("./server/db");

const users = [
  {
    email_address: "cat@dingo.com",
    password: "123cat",
    first_name: "Catherine",
    last_name: "Onia",
    is_admin: true,
    address_line_1: "1456 Main Street",
    city: "Atlanta",
    country: "USA",
  },
  {
    email_address: "mae@dingo.com",
    password: "123mae",
    first_name: "Mae",
    last_name: "May",
    is_admin: true,
    address_line_1: "1938 Hoover Avenue",
    city: "New York",
    country: "USA",
  },
  {
    email_address: "amy@dingo.com",
    password: "123amy",
    first_name: "Amy",
    last_name: "Chun",
    is_admin: true,
    address_line_1: "1064 Star Street",
    city: "San Francisco",
    country: "USA",
  },
  {
    email_address: "kara@dingo.com",
    password: "123kara",
    first_name: "Kara",
    last_name: "Cavanaugh",
    is_admin: true,
    address_line_1: "1008 Washington Street",
    city: "Tacoma",
    country: "USA",
  },

  {
    email_address: "maxiel@dingo.com",
    password: "123maxiel",
    first_name: "Maxiel",
    last_name: "Mrvaljevic",
    is_admin: true,
    address_line_1: "001 Mallard Street",
    city: "Montenegro",
    country: "Montenegro",
  },
  {
    email_address: "guest@dingo.com",
    password: "123",
    first_name: "guest",
    last_name: "account",
    is_admin: false,
    address_line_1: "123 Test Street",
    city: "New York City",
    country: "USA",
  },
  {
    email_address: "scottdal@gmail.com",
    password: "123scott",
    first_name: "Scott",
    last_name: "D'Alessandro",
    is_admin: false,
    address_line_1: "204 Test Street",
    city: "New York City",
    country: "USA",
  },
  {
    email_address: "nimit@gmail.com",
    password: "123nimit",
    first_name: "Nimit",
    last_name: "Maru",
    is_admin: false,
    address_line_1: "208 Test Street",
    city: "New York City",
    country: "USA",
  },
  {
    email_address: "david@gmail.com",
    password: "123david",
    first_name: "David",
    last_name: "Yang",
    is_admin: false,
    address_line_1: "209 Test Street",
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
    inventory_quantity: 4,
    image_url: "/images/bento2.png",
  },
  {
    name: "Wagyu-Uni Pairing",
    price: 110,
    description:
      "Freshly torched A5 wagyu nigiri is paired with freshly-cut radishes, topped with creamy Hokkaido uni.",
    size: "Medium",
    inventory_quantity: 6,
    image_url: "/images/bento3.png",
  },
  {
    name: "Daily Bento",
    price: 40,
    description:
      "Surprise yourself with our house bento, featuring sashimi from the freshest fish, caught daily",
    size: "Large",
    featured: true,
    inventory_quantity: 20,
    image_url: "/images/bento4.png",
  },
  {
    name: "Udon Duo",
    price: 40,
    description:
      "Garlic shrimp and stir-fried udon with a fresh radish and egg salad",
    size: "Large",
    inventory_quantity: 20,
    image_url: "/images/bento1.png",
  },
  {
    name: "Sushi and Tempura Pairing",
    price: 30,
    description:
      "Tempura shrimp with fresh salmon nigiri, spicy tuna roll, and accoutrements",
    size: "Large",
    inventory_quantity: 30,
    image_url: "/images/bento5.png",
  },
  {
    name: "Bouquet Bento",
    price: 60,
    description:
      "Beautifully arranged edible flowers atop a fresh, organic salad",
    size: "Medium",
    inventory_quantity: 15,
    featured: true,
    image_url: "/images/bento6.png",
  },
  {
    name: "Sashimi Special",
    price: 60,
    description:
      "Expertly cut scottish salmon belly, aged bluefin tuna, buttery yellowtail, young yellowtail, striped jack and sea urchin and placed artfully in this bento box.",
    size: "Small",
    inventory_quantity: 6,
    image_url: "/images/bento7.png",
  },
  {
    name: "Izakaya Bento",
    price: 20,
    description:
      "Ffeatures grilled shrimp, teriyaki Jidori chicken wing, grilled salmon, Hokkaido scallop sashimi salad, a sushi roll with albacore, shrimp, avocado, and cucumber, and loads of other hidden specialties.",
    size: "Medium",
    inventory_quantity: 20,
    image_url: "/images/bento8.png",
  },
  {
    name: "Vegetarian Bento",
    price: 20,
    description: "An assortment of pickled vegetables and house-made tofu.",
    size: "Medium",
    inventory_quantity: 6,
    image_url: "/images/bento9.png",
  },
  {
    name: "Pesto Party",
    price: 30,
    description:
      "House basil pesto with our daily pasta is served with a fruits, salad, and dessert",
    size: "Large",
    inventory_quantity: 6,
    image_url: "/images/bento10.png",
  },
  {
    name: "Katsu Chicken Bento",
    price: 25,
    description:
      "Crispy panko-fried chicken, salad, and rice in fun character shapes.",
    size: "Small",
    inventory_quantity: 15,
    image_url: "/images/bento11.png",
  },
  // {
  //   name: "Fishcake Ensemble",
  //   price: 25,
  //   description:
  //     "Fishcakes in assorted shapes and flavors with character-cut sausages",
  //   size: "Small",
  //   inventory_quantity: 15,
  //   image_url: "/images/bento12.png",
  // },
  {
    name: "Spring Rolls",
    price: 25,
    description:
      "Crystal rice paper wraps thinly-cut shrimp, rice noodles, cucumber strips, and edible flowers.",
    size: "Small",
    featured: true,
    inventory_quantity: 20,
    image_url: "/images/bento13.png",
  },
  {
    name: "Picky Kiddies",
    price: 25,
    description:
      "Picky eaters at home? Enamour them with character-shaped egg and fish cakes with salmon roe and rice",
    size: "Small",
    inventory_quantity: 30,
    image_url: "/images/bento14.png",
  },
  {
    name: "Grilled Salmon",
    price: 25,
    description:
      "Perfectly-grilled salmon with a consistent crisp and char, accompanied with steamed vegetables and rice pilaf ",
    size: "Medium",
    featured: true,
    inventory_quantity: 15,
    image_url: "/images/bento15.png",
  },
];

const orders = [
  {
    order_total: 260,
    total_quantity: 2,
    date_placed: "02-17-2023",
  },
  {
    order_total: 110,
    total_quantity: 5,
    is_completed: false,
    date_placed: "05-21-2021",
  },
  {
    order_total: 80,
    total_quantity: 1,
    is_completed: true,
    date_placed: "04-21-2021",
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
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
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
