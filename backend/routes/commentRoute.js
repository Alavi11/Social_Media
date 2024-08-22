import express from "express"
import {verifyToken} from "../middleware/token/VerifyToken.js"
import { createComment, deleteComment, getComment, getSingleComment, updateComment } from "../controllers/comment/commentController.js";
const router = express.Router();


router.post("/api/comment",verifyToken, createComment )
router.get("/api/comment",verifyToken, getComment )
router.get("/api/comment/:id",verifyToken, getSingleComment )
router.put("/api/comment/:id",verifyToken, updateComment )
router.delete("/api/comment/:id",verifyToken, deleteComment )

export default router;