import * as yup from "yup";

const email = yup
  .string()
  .min(3)
  .max(255)
  .email()
  .required();

const password = yup
  .string()
  .min(3)
  .max(255)
  .required();

export const validUserSchema = yup.object().shape({
  email,
  password,
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

export const validLoginSchema = yup.object().shape({
  email,
  password
});
