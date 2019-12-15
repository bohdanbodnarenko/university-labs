import { Request, Response } from "express";
import { FieldOfStudy } from "../../entity/FieldOfStudy";

export const getFieldsOfStudy = async(req:Request,res:Response) => {
     res.json(await FieldOfStudy.find())
}

export const createFieldOfStudy = async(req:Request,res:Response) => {
    const {name} = req.body;
    const names = await FieldOfStudy.find({select:['name']})
    
    if (names.includes(name)) {
        return res.status(404).json({error:'This field of study already exists'})
    }

    const newFieldOfStudy = await FieldOfStudy.create({name}).save()
    res.status(200).json(newFieldOfStudy)
}