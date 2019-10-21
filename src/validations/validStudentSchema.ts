import * as yup from "yup";

export const validStudentSchema = yup.object().shape({
    specialization: yup
        .string()
        .required()
        .min(3)
        .max(30),
    group: yup
        .string()
        .required()
        .min(3)
        .max(10),
    faculty: yup.string()
        .required()
        .min(3)
        .max(20),
});