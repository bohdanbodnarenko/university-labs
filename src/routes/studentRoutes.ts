import { Router } from "express";

import {
  getStudent,
  getStudents,
  registerStudent,
  studentById
} from "../controllers/";
import { authMiddleware } from "../middlewares/authMiddleware";

export const studentRouter = Router();

studentRouter.param("studentId", studentById);

/**
 * @api {post} /student/ Register a new student
 * @apiGroup student
 * @apiParam {String} name Student name
 * @apiParam {String} surname Student surname
 * @apiParam {String} email Student email
 * @apiParam {String} password Student password
 * @apiParam {String} specialization Student specialization
 * @apiParam {Date} date_of_birth Students date of birth
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
studentRouter.post("/", registerStudent);

/**
 * @api {get} /student/all List all students
 * @apiGroup student
 * @apiSuccess {Student[]} Students list
 * @apiSuccess {Number} id Student id
 * @apiSuccess {String} name Student name
 * @apiSuccess {String} surname Student surname
 * @apiSuccess {String} email Student email
 * @apiSuccess {String} faculty Student faculty
 * @apiSuccess {String} group Student group
 * @apiSuccess {String} specialization Student spesialization
 * @apiSuccess {Date} date_of_birth Students date_of_birth
 * @apiHeader {String} Authorization Students unique token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxNjQ2NTkwLCJleHAiOjE1NzE4MTkzOTB9.NH1AdNE5SVR7yHSo5aDcOLq_8z_XcOh7iM8mn3rNCgo"
 *     }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
    {
        "id": 1,
        "specialization": "test",
        "group": "testGroup",
        "faculty": "testFaculty",
        "userId": 1,
        "user": {
            "id": 1,
            "name": "testName",
            "surname": "testSurname",
            "date_of_birth": null,
            "email": "tes1t@test.com",
            "role": "student"
        }
    },
    {
        "id": 2,
        "specialization": "test",
        "group": "testGroup",
        "faculty": "testFaculty",
        "userId": 2,
        "user": {
            "id": 2,
            "name": "testName",
            "surname": "testSurname",
            "date_of_birth": null,
            "email": "tes1t@te1st.com",
            "role": "student"
        }
    }
]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 403 FAIL
 *    {
        "error": "Not authorized to access this resource"
      }
 */
studentRouter.get("/all", authMiddleware, getStudents);

/**
 * @api {get} /student/:studentId Find a student by studentId
 * @apiGroup student
 * @apiParam {studentId} studentId Teacher id
 * @apiSuccess {Number} id Student id
 * @apiSuccess {String} name Student name
 * @apiSuccess {String} surname Student surname
 * @apiSuccess {String} email Student email
 * @apiSuccess {Date} date_of_birth Students date_of_birth
 * @apiHeader {String} Authorization Students unique token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxNjQ2NTkwLCJleHAiOjE1NzE4MTkzOTB9.NH1AdNE5SVR7yHSo5aDcOLq_8z_XcOh7iM8mn3rNCgo"
 *     }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
        "id": 1,
        "specialization": "test",
        "group": "testGroup",
        "faculty": "testFaculty",
        "userId": 1,
        "user": {
            "id": 1,
            "name": "testName",
            "surname": "testSurname",
            "date_of_birth": null,
            "email": "test@te1st.com",
            "role": "student"
        }
    }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 *    { error: "Student not found" }
 */
studentRouter.get("/:studentId", authMiddleware, getStudent);
