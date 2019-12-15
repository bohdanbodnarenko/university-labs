import { Request, Response } from "express";
import { FieldOfStudy } from "../../entity/FieldOfStudy";

export const getFieldsOfStudy = async(req:Request,res:Response) => {
     res.json(await FieldOfStudy.find())
}