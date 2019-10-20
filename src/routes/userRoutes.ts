import { Router } from "express";
import {
  register,
  userById,
  getUser,
  getUsers,
  deleteUser
} from "../controllers/";

export const userRouter = Router();

userRouter.post("/", register);
userRouter.get("/all", getUsers);
userRouter.get("/:userId", getUser);
userRouter.delete("/:userId", deleteUser);

userRouter.param("userId", userById);
