import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivateLayout = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.loggedInData);

  // Redirect to login if no token exists
  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to home or login page
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
        <div>
          {children}
        </div>
      <Footer />
    </div>
  );
};

export default PrivateLayout;
