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
    name: "Sushi and Tempura",
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
    name: "Katsu Chicken",
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
  {
    name: "Fishcake Fun",
    price: 20,
    description:
      "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
    imageUrl: "/images/bento16.png",
    featured: false,
    size: "Small",
    inventoryQty: 40,
  },
  {
    name: "Dessert Basket",
    price: 30,
    description:
      "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
    imageUrl: "/images/bento17.png",
    featured: false,
    size: "Extra Small",
    inventoryQty: 50,
  },
  {
    name: "Double Double",
    price: 20,
    description:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    imageUrl: "/images/bento18.png",
    featured: false,
    size: "Small",
    inventoryQty: 15,
  },
  {
    name: "Togarashi Bento",
    price: 30,
    description:
      "Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    imageUrl: "/images/bento19.png",
    featured: false,
    size: "Medium",
    inventoryQty: 20,
  },
  {
    name: "Veggie Duo",
    price: 40,
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    imageUrl: "/images/bento20.png",
    featured: false,
    size: "Small",
    inventoryQty: 20,
  },
  {
    name: "Salmon Party",
    price: 25,
    description:
      "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    imageUrl: "/images/bento21.png",
    featured: false,
    size: "Medium",
    inventoryQty: 18,
  },
  {
    name: "Family Fiesta",
    price: 200,
    description: "Etiam justo.",
    imageUrl: "/images/bento22.png",
    featured: false,
    size: "Large",
    inventoryQty: 10,
  },
  {
    name: "Double Quad",
    price: 80,
    description:
      "Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla.",
    imageUrl: "/images/bento23.png",
    featured: false,
    size: "Large",
    inventoryQty: 25,
  },
  {
    name: "Soup Combo",
    price: 30,
    description: "Suspendisse potenti.",
    imageUrl: "/images/bento24.png",
    featured: false,
    size: "Medium",
    inventoryQty: 8,
  },
  {
    name: "Vegan Bento",
    price: 25445,
    description: "Integer ac leo.",
    imageUrl: "/images/bento25.png",
    featured: false,
    size: "Small",
    inventoryWty: 24,
  },
  {
    name: "Katsu Quad",
    price: 20,
    description:
      "Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.",
    imageUrl: "/images/bento26.png",
    featured: false,
    size: "Medium",
    inventoryQty: 10,
  },
  {
    name: "Sushi Combo",
    price: 25,
    description:
      "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.",
    imageUrl: "/images/bento27.png",
    featured: false,
    size: "Small",
    inventoryQty: 18,
  },
  {
    name: "Tuna Tataki",
    price: 20,
    description:
      "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.",
    imageUrl: "/images/bento28.png",
    featured: false,
    size: "Small",
    inventoryQty: 14,
  },
  {
    name: "Homestyle Hero",
    price: 15,
    description: "Nulla ac enim.",
    imageUrl: "/images/bento29.jpeg",
    featured: false,
    size: "Small",
    inventoryQty: 29,
  },
  {
    name: "Skinny Dinner",
    price: 15,
    description: "Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    imageUrl: "/images/bento30.png",
    featured: false,
    size: "Small",
    inventoryQty: 90,
  },
  {
    name: "Homey Meal",
    price: 15,
    description:
      "Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.",
    imageUrl: "/images/bento31.png",
    featured: false,
    size: "Small",
    inventoryQty: 70,
  },
  {
    name: "Karaage Chicken",
    price: 25,
    description:
      "Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.",
    imageUrl: "/images/bento32.png",
    featured: false,
    size: "Small",
    inventoryQty: 65,
  },
  {
    name: "Whitefish Duo",
    price: 30,
    description: "Duis consequat dui nec nisi volutpat eleifend.",
    imageUrl: "/images/bento33.png",
    featured: false,
    size: "Small",
    inventoryQty: 41,
  },
  {
    name: "Kiddie Surprise",
    price: 40,
    description: "Morbi quis tortor id nulla ultrices aliquet.",
    imageUrl: "/images/bento34.png",
    featured: false,
    size: "Large",
    inventoryQty: 80,
  },
  {
    name: "Picky Pandas",
    price: 35,
    description:
      "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.",
    imageUrl: "/images/bento35.png",
    featured: false,
    size: "Small",
    inventoryQty: 18,
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
