import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();
  const { token, role } = useSelector((state) => state.loggedInData);

  useEffect(() => {
    if (token) {
      navigate(role === "admin" ? "/admin-dashboard" : "/products"); 
    }
  }, [token, role, navigate]);

  return (
    <div>{children}</div>
  );
};

export default PublicLayout;
