import { Request, Response, NextFunction } from "express";
import { User } from "../../entity/User_account";
import { validUserSchema } from "../../validations";
import { formatYupError } from "../../utils/formatYupError";

export const userById = async (
  req: Request & any,
  res: Response,
  next: NextFunction,
  id: string
) => {
  const user = await User.findOne({ id: +id });
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }
  user.password = undefined;
  req.userById = user;
  next();
};

export const register = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    await validUserSchema.validate(body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(formatYupError(err));
  }
  const { email } = body;
  const userAlreadyExists = await User.findOne({
    where: { email },
    select: ["id"]
  });
  if (userAlreadyExists) {
    return res.status(403).json([
      {
        path: "email",
        message: "This email is already taken"
      }
    ]);
  }
  const user = User.create(body);
  await user.save();

  user.password = undefined;
  res.json(user);
};

export const getUser = (req: Request & any, res: Response) => {
  res.json(req.userById);
};

export const deleteUser = async (req: Request & any, res: Response) => {
  const { id } = req.userById;
  await User.delete({ id });
  res.json({ success: true });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  users.forEach(user => (user.password = undefined));
  res.json(users);
};
