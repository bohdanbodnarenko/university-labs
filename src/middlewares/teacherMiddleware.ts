import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { Teacher } from "../entity/Teacher";

export const teacherMiddleware = async (
  req: Request & any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const teacher = await Teacher.findOne({ where: { userId } });
    if (!teacher) {
      res
        .status(403)
        .json({ error: "You haven't permission to access this resource" });
    }
    req.user.teacher = teacher;
    next();
  } catch (error) {
    return res.status(500).send({ error: "Server error" });
  }
};
