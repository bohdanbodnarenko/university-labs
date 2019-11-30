import { Router } from "express";
import {
  createPost,
  deletePost,
  postById,
  postsByChannel,
  updatePost
} from "../controllers/postControllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { teacherMiddleware } from "../middlewares/teacherMiddleware";
import { channelOwnerMiddleware } from "../middlewares/channelOwnerMiddleware";
import { channelById } from "../controllers";
import { channelMemberMiddleware } from "../middlewares/channelMemberMiddleware";

export const postRoutes = Router();

postRoutes.param("channelId", channelById);
postRoutes.param("postId", postById);

/**
 * @api {post} /post/ Create a new post
 * @apiGroup post
 * @apiParam {String} text Post content
 * @apiParam {Number} channelId The id of channel to send post to
 * @apiSuccess {Post} post The new created post
 * @apiSuccess {String} text The content of new created post
 * @apiSuccess {Number} post The timestamp new created post
 * @apiSuccess {Teacher} owner The new created post owner
 * @apiSuccess {FieldOfStudy} fieldOfStudy The fieldOfStudy new created post
 * @apiSuccessExample {json} New channel
 *    HTTP/1.1 200 OK
 *       {
        "id": 1,
        "text": "it's a content of my post!",
        "timestamp":1572963368783
        "ownerId": 2,
        "fieldOfStudyId": 1
    }
 * @apiErrorExample {json} List error
 * HTTP/1.1 403 FAIl
 { error: "You haven't permission to access this resource" }
 *@apiErrorExample {json} List error
 * HTTP/1.1 403 FAIl
 *
 {error: "You aren't owner of this channel"}
 *
 */
postRoutes.post(
  "/",
  authMiddleware,
  teacherMiddleware,
  channelOwnerMiddleware,
  createPost
);

/**
 * @api {get} /post/ Get all posts by channel
 * @apiGroup post
 * @apiParam {String} text Post content
 * @apiParam {Number} channelId The id of target channel
 * @apiParam {Number} limit The limit of posts
 * @apiParam {Number} offset The offset of posts
 * @apiSuccess {Posts[]} posts The array of posts
 * @apiSuccessExample {json} New channel
 *    HTTP/1.1 200 OK
 *       [
 *       {
        "id": 1,
        "text": "it's a content of my post!",
        "timestamp":1572963368783
        "ownerId": 2,
        "fieldOfStudyId": 1
    },{
        "id": 2,
        "text": "it's second post!",
        "timestamp":1572963368983
        "ownerId": 2,
        "fieldOfStudyId": 1
    }
 *       ]
 * @apiErrorExample {json} List error
 * HTTP/1.1 403 FAIl
 { error: "You aren't member of this channel" }
 *@apiErrorExample {json} List error
 * HTTP/1.1 403 FAIl
 *
 {error: "You aren't owner of this channel"}
 *
 */
postRoutes.get(
  "/:channelId",
  authMiddleware,
  channelMemberMiddleware,
  postsByChannel
);

/**
 * @api {delete} /post/:postId Delete post by id
 * @apiGroup post
 * @apiParam {Number} postId The id of target post
 * @apiSuccess {Post} post The deleted post
 * @apiSuccessExample {json} New channel
 *    HTTP/1.1 200 OK
 *       {
            "id": 1,
            "text": "it's a content of my post!",
            "timestamp":1572963368783
            "ownerId": 2,
            "fieldOfStudyId": 1
        }

 * @apiErrorExample {json} List error
 * HTTP/1.1 403 FAIl
 { error: "You haven't permission to access this resource" }
 *@apiErrorExample {json} List error
 * HTTP/1.1 403 FAIl
 *
 {error: "You aren't owner of this channel"}
 *
 */
postRoutes.delete(
  "/:postId",
  authMiddleware,
  teacherMiddleware,
  channelOwnerMiddleware,
  deletePost
);

/**
 * @api {put} /post/:postId Update post by id
 * @apiGroup post
 * @apiParam {Number} postId The id of target post
 * @apiParam {Post} post New post should be like
 * @apiSuccess {Post} post The updated post
 * @apiSuccessExample {json} New channel
 *    HTTP/1.1 200 OK
 *       {
            "id": 1,
            "text": "it's a content of my post!1",
            "timestamp":1572963368783
            "ownerId": 2,
            "fieldOfStudyId": 1
        }

 * @apiErrorExample {json} List error
 * HTTP/1.1 403 FAIl
 { error: "You haven't permission to access this resource" }
 *@apiErrorExample {json} List error
 * HTTP/1.1 403 FAIl
 *
 {error: "You aren't owner of this channel"}
 *
 */
postRoutes.put(
  "/:postId",
  authMiddleware,
  teacherMiddleware,
  channelOwnerMiddleware,
  updatePost
);
