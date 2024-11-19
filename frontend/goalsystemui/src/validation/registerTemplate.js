import * as yup from "yup";

export const registerTemplateValidation = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  password: yup.string().required("Password is required"),
});
