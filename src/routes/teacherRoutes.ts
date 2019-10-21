import { Router } from "express";
import {
  registerTeacher,
  teacherById,
  getTeachers,
  getTeacher
} from "../controllers";

export const teacherRouter = Router();

teacherRouter.param("teacherId", teacherById);

teacherRouter.post("/", registerTeacher);
teacherRouter.get("/all", getTeachers);
teacherRouter.get("/:teacherId", getTeacher);
