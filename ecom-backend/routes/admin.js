import express from "express";
import { addProduct, deleteProduct, getProductById, getProductsByAdmin, updateProduct ,Orders } from "../controllers/admin/admin";
import { login } from "../controllers/users";
import { uploadMiddleware } from "../helpers/uploadFile";
import { VerifyUserAndRole } from "../middlewares/verifyUser";

const adminRoutes = express.Router();

adminRoutes.post("/add-product/:userId", VerifyUserAndRole("admin"), uploadMiddleware, addProduct);
adminRoutes.get("/all-products", VerifyUserAndRole("user"), getProductsByAdmin);
adminRoutes.post("/admin-login", login);
adminRoutes.get("/product/:productId", VerifyUserAndRole("user"), getProductById);
adminRoutes.put('/update-product/:productId', VerifyUserAndRole("admin"), uploadMiddleware, updateProduct);
adminRoutes.delete("/delete-product/:productId", VerifyUserAndRole("admin"), deleteProduct);
adminRoutes.get("/allorders", Orders);

export default adminRoutes;
