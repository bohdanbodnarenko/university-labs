import * as yup from "yup";

export const validTeacherSchema = yup.object().shape({
  fieldOfStudyId: yup.number().required(),
  position: yup
    .string()
    .required()
    .min(3)
    .max(50)
});
