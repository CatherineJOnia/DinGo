const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("../script/seed");

// const init = async () => {
//   try {
//     if (process.env.SEED === "true") {
//       await seed();
//     } else {
//       await db.sync();
//     }
//     app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
//   } catch (ex) {
//     console.log(ex);
//   }
// };

// init();

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
  } catch (ex) {
    console.log(ex);
  }
};

init();

const server = app.listen(PORT, () =>
  console.log(`Mixing it up on port ${PORT}`)
);
const io = require("socket.io")(server);
require("./socket")(io);
