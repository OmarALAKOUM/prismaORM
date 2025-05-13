import express from "express";
import { getProducts, getProduct } from "../controllers/product.js";

const router = express.Router();
router.get("/products", getProducts);
router.get("/products/search", getProduct);
export default router;
