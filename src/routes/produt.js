import express from "express";
import { getProducts, getProduct , getRoles, getPermissions, role_permission,getallpermrole} from "../controllers/product.js";

const router = express.Router();
router.get("/products", getProducts);
router.get("/products/search", getProduct);
router.get("/permissions",getPermissions);
router.get("/roles",getRoles);
router.post('/assignpermissionstorole', role_permission);
router.get('/roles/:roleId/permissions', getallpermrole);

export default router;
