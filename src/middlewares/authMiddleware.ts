import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";

export const authMiddleware = async (
  req: Request & any,
  res: Response,
  next: NextFunction
) => {
  if (!req.header("Authorization")) {
    res.status(403).json({ error: "Not authenticated" });
  }
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(403).json({ error: "Wrong access token" });
    }
    user.password = undefined;
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Not authorized to access this resource" });
  }
};
