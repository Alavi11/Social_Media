import express from "express";
import { createPost, deletePost, getAllPosts, getSinglePosts, popularPost, toggleDisLikePost, toggleLikePost, updatePost } from "../controllers/posts/PostController.js";
import {verifyToken} from "../middleware/token/VerifyToken.js"
import { photoUpload, postImageResize } from "../middleware/upload/photoUpload.js";

const router = express.Router();

router.put("/api/post/likes", verifyToken, toggleLikePost)
router.put("/api/post/dislikes", verifyToken, toggleDisLikePost)
router.get("/api/post/popular", verifyToken, popularPost)
router.post("/api/post",verifyToken,photoUpload.single("image"),postImageResize, createPost)
router.get("/api/post",verifyToken, getAllPosts)
router.get("/api/post/:id",verifyToken, getSinglePosts)
router.put("/api/post/:id",verifyToken, updatePost)
router.delete("/api/post/:id",verifyToken, deletePost)


export default router