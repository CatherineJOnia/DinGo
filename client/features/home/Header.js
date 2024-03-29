import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = (props) => {
  const name = useSelector((state) => state.auth.me.firstName);

  return (
    <header id="header" className="w-full">
      <div className="heroText">
        {name ? (
          <h2 className="justify-center">Indulge, {name}.</h2>
        ) : (
          <h2>Indulge.</h2>
        )}
        <Link to="/products">
          <center>
            <button>Shop Now</button>
          </center>
        </Link>
      </div>
    </header>
  );
};

export default Header;
