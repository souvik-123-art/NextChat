import { Router } from "express";
import {
  getAllUsers,
  getUser,
  loginUser,
  myProfile,
  updateUser,
  verifyUser,
} from "../controllers/user.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router();
router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.get("/me", isAuth, myProfile);
router.get("/user/all", isAuth, getAllUsers);
router.get("/user/:id", getUser);
router.post("/update/user", isAuth, updateUser);
export default router;
