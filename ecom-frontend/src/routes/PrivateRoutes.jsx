import React from "react";
import PrivateLayout from "../layout/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AdminPrivateLayout from "../layout/AdminPrivateLayout";
import AddProductForm from "../admin/AddProductForm";
import ProductTable from "../admin/ProductTable";
import UserTable from "../admin/UserTable";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import UpdateProduct from "../admin/UpdateProduct";
import PageNotFound from "../pages/PageNotFound";
import MyOrder from "../pages/MyOrder";
import UserProfile from "../pages/UserProfile";

const PrivateRoutes = [
  {
    path: "/dashboard",
    element: (
      <PrivateLayout>
        <Dashboard />
      </PrivateLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateLayout>
        <UserProfile />
      </PrivateLayout>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <AdminPrivateLayout>
        <AdminDashboard />
      </AdminPrivateLayout>
    ),
  },
  {
    path: "/add-product",
    element: (
      <AdminPrivateLayout>
        <AddProductForm />
      </AdminPrivateLayout>
    ),
  },
  {
    path: "/update-product/:productId",
    element: (
      <AdminPrivateLayout>
        {" "}
        <UpdateProduct />{" "}
      </AdminPrivateLayout>
    ),
  },
  {
    path: "/dashboard/products",
    element: (
      <AdminPrivateLayout>
        {" "}
        <ProductTable />{" "}
      </AdminPrivateLayout>
    ),
  },
  {
    path: "/dashboard/users",
    element: (
      <AdminPrivateLayout>
        <UserTable />
      </AdminPrivateLayout>
    ),
  },
  {
    path: "/products",
    element: (
      <PrivateLayout>
        <Products />
      </PrivateLayout>
    ),
  },
  {
    path: "/cart",
    element: (
      <PrivateLayout>
        <Cart />
      </PrivateLayout>
    ),
  },
  {
    path: "/my-order",
    element: (
      <PrivateLayout>
        <MyOrder />
      </PrivateLayout>
    ),
  },
  {
    path: "*",
    element: (
      <PrivateLayout>
        <PageNotFound />
      </PrivateLayout>
    ),
  },
];

export default PrivateRoutes;
