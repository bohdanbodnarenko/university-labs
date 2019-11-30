import { Router } from "express";

import {
  createChannel,
  channelById,
  getChannel,
  getChannels
} from "../controllers";
import { authMiddleware } from "../middlewares/authMiddleware";
import { teacherMiddleware } from "../middlewares/teacherMiddleware";

export const channelRouter = Router();

channelRouter.param("channelId", channelById);

/**
 * @api {post} /channel/ Create a new channel
 * @apiGroup channel
 * @apiParam {String} name Channel name
 * @apiParam {String} description Channel description
 * @apiParam {String} fieldOfStudyId Id of channel's field of study
 * @apiSuccessExample {json} New channel
 *    HTTP/1.1 200 OK
 *       {
        "id": 7,
        "name": "new Channel",
        "description": "",
        "ownerId": 2,
        "fieldOfStudyId": 1
    }
 * @apiErrorExample {json} List error
 * HTTP/1.1 403 FAIl
 { error: "You haven't permission to access this resource" }
 *@apiErrorExample {json} List error
 * HTTP/1.1 400 FAIl
 * [
 {
        path: "name",
        message: "The channel with the same name exists already, change name"
      }
 ]
 *
 */
channelRouter.post("/", authMiddleware, teacherMiddleware, createChannel);

/**
 * @api {get} /channel/all List all channel
 * @apiGroup channel
 * @apiSuccess {Channel[]} List of channels
 * @apiSuccess {Number} id Channel id
 * @apiSuccess {String} name Channel name
 * @apiSuccess {String} description Channel's description
 * @apiSuccess {Number} ownerId The id of the owner of channel
 * @apiSuccess {FieldOfStudy} FieldOfStudy The fieldOfStudyId of channel
 * @apiHeader {String} Authorization Channels unique token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxNjQ2NTkwLCJleHAiOjE1NzE4MTkzOTB9.NH1AdNE5SVR7yHSo5aDcOLq_8z_XcOh7iM8mn3rNCgo"
 *     }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 {
        "id": 7,
        "name": "Cool Channel",
        "description": "This is my cool channel",
        "ownerId": 2,
        "fieldOfStudyId": 1
    },
 {
        "id": 8,
        "name": "Cool Channel 1",
        "description": "This is my cool channel",
        "ownerId": 2,
        "fieldOfStudyId": 1
    }
 ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 403 FAIL
 *    {
        "error": "Not authorized to access this resource"
      }
 */
channelRouter.get("/all", authMiddleware, getChannels);

/**
 * @api {get} /channel/:channelId Find a channel by channelId
 * @apiGroup channel
 * @apiSuccess {Channel} channel Target channel
 * @apiSuccess {Number} id Channel id
 * @apiSuccess {String} name Channel name
 * @apiSuccess {String} description Channel's description
 * @apiSuccess {Number} ownerId The id of the owner of channel
 * @apiSuccess {FieldOfStudy} FieldOfStudy The fieldOfStudyId of channel

 * @apiHeader {String} Authorization User's unique token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxNjQ2NTkwLCJleHAiOjE1NzE4MTkzOTB9.NH1AdNE5SVR7yHSo5aDcOLq_8z_XcOh7iM8mn3rNCgo"
 *     }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
        "id": 8,
        "name": "Cool Channel 1",
        "description": "This is my cool channel",
        "ownerId": 2,
        "fieldOfStudyId": 1
    }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 *    { error: "Channel not found" }
 */
channelRouter.get("/:channelId", authMiddleware, getChannel);
