import * as yup from "yup";

export const validUserSchema = yup.object().shape({
  email: yup
    .string()
    .min(3)
    .max(255)
    .email()
    .required(),
  password: yup
    .string()
    .min(3)
    .max(255)
    .required(),
  name: yup
    .string()
    .required()
    .min(3)
    .max(20),
  surname: yup
    .string()
    .required()
    .min(3)
    .max(25),
  date_of_birth: yup.date()
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3)
    .max(255)
    .email()
    .required(),
  password: yup
    .string()
    .min(3)
    .max(255)
    .required()
});
