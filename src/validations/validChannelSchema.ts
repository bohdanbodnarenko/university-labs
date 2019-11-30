import * as yup from "yup";

export const validChannelSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(30),
  description: yup.string().min(5),
  fieldOfStudyId: yup.number().required()
});
