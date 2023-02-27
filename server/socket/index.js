module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id, " has made a persistent connection to the server!");

    socket.on("product/create", (message) => {
      socket.broadcast.emit("product/create", message);
    });

    socket.on("product/edit", (productId) => {
      socket.broadcast.emit("product/edit", productId);
    });

    socket.on("products/deleteProduct", (productId) => {
      socket.broadcast.emit("product/delete", productId);
    });

    socket.on("products/addProduct", (message) => {
      socket.broadcast.emit("product/addProduct", message);
    });

    socket.on("cart/addProduct", (data) => {
      socket.broadcast.emit("cart/delete", data);
    });

    socket.on("cart/editProduct", (productId) => {
      socket.broadcast.emit("cart/editProduct", productId);
    });

    socket.on("cart/deleteProduct", (productId) => {
      socket.broadcast.emit("cart/deleteProduct", productId);
    });
  });
};
