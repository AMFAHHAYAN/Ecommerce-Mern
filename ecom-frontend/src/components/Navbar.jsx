import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import resetAllStates from "../app/reducers/resetAllStates.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartSlice);
  const cartItemCount = cart.length;
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(resetAllStates());
    navigate("/");
  };

  return (
      <nav className="header__menu mobile-menu">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link to="/home">
              <img
                src="/static/img/logo.png"
                alt="Logo"
                className="h-10"
              />
            </Link>
          </div>

          {/* Navigation Menu */}
          <ul className="flex gap-6 font-semibold">
            <li>
              <Link to="/dashboard" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link to="/my-order" className="hover:underline">
                My Orders
              </Link>
            </li>
            <li onClick={handleLogout} className="hover:underline">
              Logout
            </li>
          </ul>

          {/* Right Actions Section */}
          <div className="flex items-center gap-6">
            {/* Search Icon */}
            <button className="text-white">
              <img
                src="/static/img/icon/search.png"
                alt="Search"
                className="h-5"
              />
            </button>

            {/* Wishlist Icon */}
            <button className="text-white">
              <img
                src="/static/img/icon/heart.png"
                alt="Wishlist"
                className="h-5"
              />
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="relative text-white font-semibold">
              <img src="/static/img/icon/cart.png" alt="Cart" className="h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-xs font-bold text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Dropdown Menu */}
            <div
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="text-white font-semibold cursor-pointer"
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        {/* Profile Dropdown */}
        {showProfileDropdown && (
          <div className="absolute top-16 right-4 bg-white shadow-lg border rounded-lg p-4 z-50 w-48">
            <ul>
              <li className="py-2 px-4 text-gray-700 hover:bg-gray-100">
                <Link to="/profile">View Profile</Link>
              </li>
              <li
                onClick={handleLogout}
                className="py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </nav>
  );
};

export default Navbar;
