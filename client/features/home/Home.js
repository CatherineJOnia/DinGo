import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import About from "./About";
import FeaturedProducts from "./FeaturedProducts";

export const Home = (props) => {
  const firstName = useSelector((state) => state.auth.me.first);

  return (
    <div id="home">
      <Header firstName={props.firstName} />
      <About />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
