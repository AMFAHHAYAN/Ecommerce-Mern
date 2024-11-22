import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminNav from "../admin/AdminNav";

const AdminPrivateLayout = ({ children }) => {
  const navigate = useNavigate();
  const { token, role } = useSelector((state) => state.loggedInData);

  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/");
    }
  }, [token, role, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNav />
          <div>
            {children}
          </div>
    </div>
  );
};

export default AdminPrivateLayout;
