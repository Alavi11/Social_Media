import express from "express"
import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from "../controllers/category/CategoryController.js";
import { verifyToken } from "../middleware/token/VerifyToken.js";

const router = express.Router();

router.post("/api/category", verifyToken ,createCategory)
router.get("/api/category", verifyToken ,getAllCategory)
router.get("/api/category/:id", verifyToken ,getSingleCategory)
router.put("/api/category/:id", verifyToken ,updateCategory)
router.delete("/api/category/:id", verifyToken ,deleteCategory)

export default router;