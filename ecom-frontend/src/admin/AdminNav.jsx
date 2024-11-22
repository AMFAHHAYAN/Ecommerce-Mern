import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import resetAllStates from "../app/reducers/resetAllStates";

const AdminNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(resetAllStates());
    navigate("/");
  };
  return (
    <div className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700">
      {/* Top Navigation Bar */}
      <div className="w-full p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex justify-between items-center shadow-lg">
        <Link to={"/admin-dashboard"}>
          <h2 className="text-3xl font-extrabold hover:text-teal-300 transition-all duration-300">
            Admin Dashboard
          </h2>
        </Link>

        {/* User Profile or Logout */}
        <button
          onClick={handleLogout}
          className="text-lg hover:text-teal-300 transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Navbar Links */}
      <div className="w-full bg-gray-800 text-white flex justify-center space-x-6 py-2 shadow-md">
        <Link
          to="/admin-dashboard"
          className="flex items-center space-x-2 hover:bg-cyan-500 p-2 rounded-lg transition-all duration-300"
        >
          <i className="fas fa-tachometer-alt text-lg"></i>
          <span className="text-sm">Dashboard</span>
        </Link>

        <Link
          to="/dashboard/users"
          className="flex items-center space-x-2 hover:bg-cyan-500 p-2 rounded-lg transition-all duration-300"
        >
          <i className="fas fa-users text-lg"></i>
          <span className="text-sm">Users</span>
        </Link>

        <Link
          to="/dashboard/products"
          className="flex items-center space-x-2 hover:bg-cyan-500 p-2 rounded-lg transition-all duration-300"
        >
          <i className="fas fa-boxes text-lg"></i>
          <span className="text-sm">Products</span>
        </Link>

        <Link
          to="/add-product"
          className="flex items-center space-x-2 hover:bg-cyan-500 p-2 rounded-lg transition-all duration-300"
        >
          <i className="fas fa-plus text-lg"></i>
          <span className="text-sm">Add Product</span>
        </Link>

        <Link
          to="/dashboard/settings"
          className="flex items-center space-x-2 hover:bg-cyan-500 p-2 rounded-lg transition-all duration-300"
        >
          <i className="fas fa-cogs text-lg"></i>
          <span className="text-sm">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminNav;
