import { Router } from "express";
import {
  register,
  userById,
  getUser,
  getUsers,
  deleteUser,
  login
} from "../controllers/";
import { authMiddleware } from "../middlewares/authMiddleware";

export const userRouter = Router();

userRouter.post("/", register);
userRouter.post("/login", login);
userRouter.get("/all", authMiddleware, getUsers);
userRouter.get("/:userId", authMiddleware, getUser);
userRouter.delete("/:userId", authMiddleware, deleteUser);

userRouter.param("userId", userById);
