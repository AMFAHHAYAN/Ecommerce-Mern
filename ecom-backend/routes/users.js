import express from "express";
import {
    createUser,
    getAllProducts,
    getAllUsers,
    login
} from "../controllers/users";
import { addToCart, deleteCart, getCart, removeAllQuantity, removeFromCart, } from "../controllers/cart";
import { createOrder, getOrderData } from "../controllers/order";
import { VerifyUserAndRole } from "../middlewares/verifyUser";
const userRoutes = express.Router();

// Public routes
userRoutes.post("/register", createUser);
userRoutes.post("/login", login);
userRoutes.get("/products", getAllProducts);

userRoutes.post("/add-to-cart", VerifyUserAndRole(), addToCart);
userRoutes.patch("/dec-item", VerifyUserAndRole(), removeFromCart);
userRoutes.delete("/delete-item", VerifyUserAndRole(), removeAllQuantity);
userRoutes.get("/cart/:userId", VerifyUserAndRole(), getCart);
userRoutes.post("/order", VerifyUserAndRole(), createOrder);
userRoutes.delete("/delete-cart", VerifyUserAndRole(), deleteCart);

userRoutes.get("/users", VerifyUserAndRole("admin"), getAllUsers);
userRoutes.get("/orders/:userId",VerifyUserAndRole(), getOrderData)

export default userRoutes;
