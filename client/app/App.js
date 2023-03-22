import React from "react";
import Navbar from "../features/Navbar";
import AppRoutes from "./AppRoutes";
import Footer from "../features/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
};

export default App;
