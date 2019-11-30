import { Router } from "express";
import {
  registerTeacher,
  teacherById,
  getTeachers,
  getTeacher
} from "../controllers";

export const teacherRouter = Router();

teacherRouter.param("teacherId", teacherById);

/**
 * @api {post} /teacher/ Register a new teacher
 * @apiGroup teacher
 * @apiParam {String} name Teacher name
 * @apiParam {String} surname Teacher surname
 * @apiParam {String} email Teacher email
 * @apiParam {String} password Teacher password
 * @apiParam {Date} date_of_birth Teacher's date of birth
 * @apiParam {String} fieldOfStudyId Id of teacher's field of study
 * @apiParam {String} position Teacher position
 * @apiSuccess {Boolean} registered is registration success
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    true
 * @apiErrorExample {json} List error
 *    [
 {
            path: "email",
            message: "This email is already taken"
        }
 ]
 */
teacherRouter.post("/", registerTeacher);

/**
 * @api {get} /teacher/all List all teachers
 * @apiGroup teacher
 * @apiSuccess {Teacher[]} Teachers list
 * @apiSuccess {Number} id Teacher id
 * @apiSuccess {String} name Teacher name
 * @apiSuccess {String} surname Teacher surname
 * @apiSuccess {String} email Teacher email
 * @apiSuccess {Date} date_of_birth Teachers date of birth
 * @apiSuccess {String} fieldOfStudy Teacher's field of study
 * @apiSuccess {String} position Teacher position
 * @apiHeader {String} Authorization Teachers unique token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxNjQ2NTkwLCJleHAiOjE1NzE4MTkzOTB9.NH1AdNE5SVR7yHSo5aDcOLq_8z_XcOh7iM8mn3rNCgo"
 *     }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 {
        "id": 1,
        "position": "blabla",
        "userId": 1,
        "fieldOfStudyId": 1,
        "user": {
            "id": 1,
            "name": "testName",
            "surname": "testSurname",
            "date_of_birth": null,
            "email": "testTeacher@test.com",
            "role": "teacher"
        }
    },
 {
        "id": 2,
        "position": "blabla",
        "userId": 2,
        "fieldOfStudyId": 1,
        "user": {
            "id": 2,
            "name": "testName",
            "surname": "testSurname",
            "date_of_birth": null,
            "email": "test@test.com",
            "role": "teacher"
        }
    }
 ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 403 FAIL
 *    {
        "error": "Not authorized to access this resource"
      }
 */
teacherRouter.get("/all", getTeachers);

/**
 * @api {get} /teacher/:teacherId Find a teacher by teacherId
 * @apiGroup teacher
 * @apiParam {teacherId} teacherId Teacher id
 * @apiSuccess {Number} id Teacher id
 * @apiSuccess {String} name Teacher name
 * @apiSuccess {String} surname Teacher surname
 * @apiSuccess {String} email Teacher email
 * @apiSuccess {Date} date_of_birth Teachers date of birth
 * @apiSuccess {String} fieldOfStudy Teacher's field of study
 * @apiSuccess {String} position Teacher position * @apiHeader {String} Authorization Teacher's unique token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxNjQ2NTkwLCJleHAiOjE1NzE4MTkzOTB9.NH1AdNE5SVR7yHSo5aDcOLq_8z_XcOh7iM8mn3rNCgo"
 *     }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
     *  {
        "id": 1,
        "position": "blabla",
        "userId": 1,
        "fieldOfStudyId": 1,
        "user": {
            "id": 1,
            "name": "testName",
            "surname": "testSurname",
            "date_of_birth": null,
            "email": "testTeacher@test.com",
            "role": "teacher"
        }
    }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 *    { error: "Teacher not found" }
 */
teacherRouter.get("/:teacherId", getTeacher);
