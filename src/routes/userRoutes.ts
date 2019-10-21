import { Router } from "express";
import {
  register,
  userById,
  getUser,
  getUsers,
  deleteUser,
  login
} from "../controllers/";
import { authMiddleware } from "../middlewares/authMiddleware";

export const userRouter = Router();

/**
 * @api {post} /user/ Register a new user
 * @apiGroup user
 * @apiParam {String} name User name
 * @apiParam {String} surname User surname
 * @apiParam {String} email User email
 * @apiParam {String} password User password 
 * @apiParam {Date} date_of_birth Users date_of_birth 
 * @apiSuccess {Boolean} registered?
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
userRouter.post("/", register);

/**
 * @api {post} /user/ Login user
 * @apiGroup user
 * @apiParam {String} email User email
 * @apiParam {String} password User password 
 * @apiSuccess {User} registered
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} name User name
 * @apiSuccess {String} surname User surname
 * @apiSuccess {String} email User email
 * @apiSuccess {Date} date_of_birth Users date_of_birth
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    true
 * @apiErrorExample {json} List error
 *    {
            "id": 1,
            "name": "testName",
            "surname": "testSurname",
            "date_of_birth": null,
            "email": "test1@test.com"
        }
 */
userRouter.post("/login", login);

/**
 * @api {get} /user/all List all users
 * @apiGroup user
 * @apiSuccess {User[]} User's list
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} name User name
 * @apiSuccess {String} surname User surname
 * @apiSuccess {String} email User email
 * @apiSuccess {Date} date_of_birth Users date_of_birth
 * @apiHeader {String} Authorization Users unique token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxNjQ2NTkwLCJleHAiOjE1NzE4MTkzOTB9.NH1AdNE5SVR7yHSo5aDcOLq_8z_XcOh7iM8mn3rNCgo"
 *     }
 * @apiPrivate 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [[
        {
            "id": 1,
            "name": "testName",
            "surname": "testSurname",
            "date_of_birth": null,
            "email": "test1@test.com"
        },
        {
            "id": 2,
            "name": "testName",
            "surname": "testSurname",
            "date_of_birth": null,
            "email": "test@test.com"
        }]
 * @apiErrorExample {json} List error
 *    {
        "error": "Not authorized to access this resource"
      }
 */
userRouter.get("/all", authMiddleware, getUsers);

/**
 * @api {get} /user/:userId Find a user by userId
 * @apiGroup user
 * @apiParam {userId} userId User id
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} name User name
 * @apiSuccess {String} surname User surname
 * @apiSuccess {String} email User email
 * @apiSuccess {Date} date_of_birth Users date_of_birth
 * @apiHeader {String} Authorization Users unique token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxNjQ2NTkwLCJleHAiOjE1NzE4MTkzOTB9.NH1AdNE5SVR7yHSo5aDcOLq_8z_XcOh7iM8mn3rNCgo"
 *     }
 * @apiPrivate
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
        "id": 1,
        "name": "testName",
        "surname": "testSurname",
        "date_of_birth": null,
        "email": "test1@test.com"
      }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 */
userRouter.get("/:userId", authMiddleware, getUser);

/**
 * @api {get} /user/:userId Find a user by userId
 * @apiGroup user
 * @apiParam {userId} userId User id
 * @apiSuccess {Boolean} success Success deleting
 * @apiHeader {String} Authorization Users unique token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxNjQ2NTkwLCJleHAiOjE1NzE4MTkzOTB9.NH1AdNE5SVR7yHSo5aDcOLq_8z_XcOh7iM8mn3rNCgo"
 *     }
 * @apiPrivate
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
        "success":true
      }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 */
userRouter.delete("/:userId", authMiddleware, deleteUser);

userRouter.param("userId", userById);
