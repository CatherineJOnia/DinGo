import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { selectCart } from "./cart/cartSlice";
import { logout } from "../app/store";

import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const logout = () => {
    dispatch(logout());
    dispatch(navigate("/login"));
  };

  return (
    <nav className="full-navbar">
      <div className="mainNav">
        <Link to="/home">
          <h1>DinGo</h1>
        </Link>
        <Link to="/products">Products</Link>
      </div>
      <div className="sideNav">
        {isLoggedIn ? (
          <div>
            <Link to="/cart">
              <ShoppingCartIcon fontSize="small" />
            </Link>
            <Link to="#" onClick={logout}>
              Log Out
            </Link>
            {isAdmin ? <Link to="/users">Users</Link> : ""}
          </div>
        ) : (
          <div>
            <Link to="/cart/guest">
              <ShoppingCartIcon fontSize="medium" />
            </Link>
            <div className="dropdown">
              <AccountBoxIcon fontSize="medium" />
              <div className="dropdown-content">
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
