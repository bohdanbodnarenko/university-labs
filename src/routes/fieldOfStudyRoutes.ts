import { Router } from "express";
import { getFieldsOfStudy, createFieldOfStudy } from "../controllers/fieldOfStudyControllers/fieldOfStudyController";

export const fieldOfStudyRouter = Router();


/**
 * @api {get} /fos/all List all field of studies
 * @apiGroup fos
 * @apiSuccess {FieldOfStudy[]} Field of study list
 * @apiSuccess {Number} id Field of study id
 * @apiSuccess {String} name Field of study name
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 {
        "id": 1,
        "name": "blabla",
    },
 {
        "id": 2,
        "name": "blabla1",
    }
 ]
 */
fieldOfStudyRouter.get('/all', getFieldsOfStudy)

/**
 * @api {post} /fos Create a new field of study
 * @apiGroup fos
 * @apiParam {String} name Field of study's name
 * @apiSuccess {FieldOfStudy} Field of study
 * @apiSuccess {Number} id Field of study id
 * @apiSuccess {String} name Field of study name
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 {
        "id": 1,
        "name": "blabla",
    }
 */
fieldOfStudyRouter.post('/', createFieldOfStudy)