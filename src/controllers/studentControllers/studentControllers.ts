import { Request, Response, NextFunction } from "express";

import { User, UserRoles } from "../../entity/User";
import { Student } from "../../entity/Student";
import { validUserSchema, validStudentSchema } from "../../validations";
import { formatYupError } from "../../utils/formatYupError";

export const studentById = async (
  req: Request & any,
  res: Response,
  next: NextFunction,
  id: string
) => {
  const student = await Student.findOne({ id: +id }, { relations: ["user"] });
  if (!student) {
    res.status(404).json({ error: "Student not found" });
  }
  student.user.password = undefined;
  req.studentById = student;
  next();
};

export const registerStudent = async (req: Request, res: Response) => {
  let { user, ...student } = req.body;

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
  const newUser: User = User.create({ ...user, role: UserRoles.student });
  await newUser.save();

  try {
    await validStudentSchema.validate(student, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(formatYupError(err));
  }
  student.userId = newUser.id;
  await Student.create(student).save();

  res.json(true);
};

export const getStudent = (req: Request & any, res: Response) => {
  res.json(req.studentById);
};

export const getStudents = async (req: Request, res: Response) => {
  const students = await Student.find({ relations: ["user"] });
  students.forEach(({ user }) => (user.password = undefined));
  res.json(students);
};

// export const deleteStudent = async (req: Request & any, res: Response) => {
//     const {studentById} = req;
//     const {user} = studentById;
//     await User.delete({id: user.id});
//     await Student.delete({id: studentById.id});
//     res.json({success: true});
// };
