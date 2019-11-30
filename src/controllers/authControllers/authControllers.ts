import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

import { validLoginSchema } from "../../validations";
import { formatYupError } from "../../utils/formatYupError";
import { User, UserRoles } from "../../entity/User";
import { Student } from "../../entity/Student";

export const login = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    await validLoginSchema.validate(body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(formatYupError(err));
  }
  const { email, password } = body;
  let user: User & any = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      path: "email",
      message: "User with this email does not exits, please sign up"
    });
  }
  const isValid = await compare(password, user.password);

  if (!isValid) {
    return res
      .status(400)
      .json({ path: "password", message: "Wrong password" });
  }

  if (user.role === UserRoles.student) {
    const student = await Student.findOne({ userId: user.id });
    user = { ...user, student };
  }
  user.password = undefined;
  const token = jwt.sign(
    {
      id: user.id
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "2 days" }
  );
  res.json({
    user,
    token
  });
};
