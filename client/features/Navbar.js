import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { selectCart } from "./cart/cartSlice";
import { logout } from "../app/store";
// import DinGo from "../../public/images/DinGo.webp";

import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Dehaze from "@mui/icons-material/Dehaze";

const navLinks = [
  {
    id: "products",
    title: "Products",
  },
  {
    id: "cart",
    title: "Cart",
  },
  {
    id: "login",
    title: "Login",
  },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const logout = () => {
    dispatch(logout());
    dispatch(navigate("/login"));
  };

  return (
    <nav className="w-full">
      <div className="flex object-contain">
        <Link to="/home">
          <img
            src="../../images/DinGo.png"
            alt="logo"
            width={200}
            height={50}
          />
        </Link>
      </div>
      <div className="sideNav list-none hidden sm:flex flex-row gap-10">
        {isLoggedIn ? (
          <div>
            <Link to="/cart">
              <ShoppingCartIcon fontSize="small" />
            </Link>
            <div className="dropdown">
              <Dehaze fontSize="medium" />
              <div className="dropdown-content">
                <Link to="/products">Products</Link>
                {isAdmin ? <Link to="/users">Users</Link> : ""}
                <Link to="#" onClick={logout}>
                  Log Out
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/cart/guest">
              <ShoppingCartIcon fontSize="medium" />
            </Link>
            <div className="dropdown">
              <Dehaze fontSize="medium" />
              <div className="dropdown-content">
                <Link to="/products">Products</Link>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
