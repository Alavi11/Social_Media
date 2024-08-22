import express from "express";
import {
  accountVerification,
  blockUser,
  deleteUser,
  detailUser,
  findFollower,
  followingUser,
  forgetPasswordToken,
  getUsers,
  getUsersPopular,
  logoutUser,
  passwordReset,
  profilePhotoUser,
  profileUser,
  sendEmailMsg,
  unBlockUser,
  unfollowUser,
  updatePassword,
  updateUser,
  userLogin,
  userRegister,
  verifyUserEmail,
} from "../controllers/users/Usercontroller.js";
import { verifyToken } from "../middleware/token/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken/RefreshToken.js";
import { photoUpload, profilePhotoResize } from "../middleware/upload/photoUpload.js";

const router = express.Router();

router.get("/token", refreshToken);
router.post("/api/email", verifyToken, sendEmailMsg);

router.post("/api/users/register", userRegister);
router.post("/api/users/login", userLogin);
router.post("/api/users/findFollower", verifyToken, findFollower)
router.get("/api/users/popular", verifyToken, getUsersPopular)
router.delete("/api/users/logout", logoutUser);
router.get("/api/users/:id", verifyToken, detailUser);
router.get("/api/users/profile/:id", verifyToken, profileUser);
router.put("/api/users/password", verifyToken, updatePassword);
router.put("/api/users/follow", verifyToken, followingUser);
router.put("/api/users/unfollow", verifyToken, unfollowUser);
router.put("/api/users/block-user/:id", verifyToken, blockUser);
router.put("/api/users/unblock-user/:id", verifyToken, unBlockUser);
router.post("/api/users/generate-verify-email-token",verifyToken,verifyUserEmail);
router.put("/api/users/verify-account", verifyToken, accountVerification);
router.post("/api/users/forget-password-token", forgetPasswordToken);
router.put("/api/users/reset-password", passwordReset);
router.put("/api/users/profilephoto-upload", verifyToken,photoUpload.single("image"),profilePhotoResize,profilePhotoUser);

router.get("/api/users", verifyToken, getUsers);
router.delete("/api/users/:id", verifyToken, deleteUser);
router.put("/api/users/:id", verifyToken, updateUser);

export default router;
