import { Request, Response } from "express";
import { FieldOfStudy } from "../../entity/FieldOfStudy";

export const getFieldsOfStudy = (req:Request,res:Response) => {
    return FieldOfStudy.find()
}