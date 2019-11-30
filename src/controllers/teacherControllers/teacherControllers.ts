import { Request, Response } from "express";

import { validUserSchema, validTeacherSchema } from "../../validations";
import { formatYupError } from "../../utils/formatYupError";
import { User, UserRoles } from "../../entity/User";
import { Teacher } from "../../entity/Teacher";
import { NextFunction } from "connect";

export const teacherById = async (
  req: Request & any,
  res: Response,
  next: NextFunction,
  id: string
) => {
  const teacher = await Teacher.findOne({ id: +id }, { relations: ["user"] });
  if (!teacher) {
    res.status(404).json({ error: "Teacher not found" });
  }
  teacher.user.password = undefined;
  req.teacherById = teacher;
  next();
};

export const registerTeacher = async (req: Request, res: Response) => {
  let { user, ...teacher } = req.body;

  try {
    await validUserSchema.validate(user, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(formatYupError(err));
  }

  const { email } = user;
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
  const newUser: User = User.create({ ...user, role: UserRoles.teacher });

  try {
    await validTeacherSchema.validate(teacher, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(formatYupError(err));
  }
  await newUser.save();
  teacher.userId = newUser.id;
  await Teacher.create(teacher).save();

  res.json({ message: "Teacher registered successfully" });
};

export const getTeacher = (req: Request & any, res: Response) => {
  res.json(req.teacherById);
};

export const getTeachers = async (req: Request, res: Response) => {
  const teachers = await Teacher.find({ relations: ["user"] });
  teachers.forEach(({ user }) => (user.password = undefined));
  res.json(teachers);
};
