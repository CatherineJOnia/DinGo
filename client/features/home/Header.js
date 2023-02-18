import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="header">
      <div className="heroText">
        <h2>Indulge.</h2>
        <Link to="/products">
          <center>
            <button>Shop All</button>
          </center>
        </Link>
      </div>
    </header>
  );
};

export default Header;
