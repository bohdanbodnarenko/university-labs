import { Router } from "express";

import { login } from "../controllers/";
import { channelRouter } from "./channelRoutes";

export const authRouter = Router();

/**
 * @api {login} /login/ Login student or teacher
 * @apiGroup login
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiSuccess {User} authenticated authenticated Student or Teacher object
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} name User name
 * @apiSuccess {String} surname User surname
 * @apiSuccess {Date} date_of_birth Users date_of_birth
 * @apiSuccess {String} email User email
 * @apiSuccess {String} role User role (student or teacher)
 * @apiSuccess {Student} student if user is student
 * @apiSuccess {Teacher} teacher if user is teacher
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    true
 * @apiErrorExample {json} List error
 *    {
    "user": {
        "id": 1,
        "name": "testName",
        "surname": "testSurname",
        "date_of_birth": null,
        "email": "test@test.com",
        "role": "student",
        "student": {
            "id": 1,
            "specialization": "test",
            "group": "testGroup",
            "faculty": "testFaculty",
            "userId": 1
        }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxNjYxMzEzLCJleHAiOjE1NzE4MzQxMTN9.XHYW2RGRyOv5p-RKlGRZJSoyC8i1nvDrrKLAidfqyF8"
}
 */
authRouter.post("/login", login);

//doc

