import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirm_password: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match"),
});

export const inputs = [
  {
    name: "username",
    label: "username",
    type: "text",
    placeholder: "Enter your username",
  },
  {
    name: "email",
    label: "email",
    type: "email",
    placeholder: "example@example.com",
  },
  {
    name: "password",
    label: "password",
    type: "password",
    placeholder: "*****",
  },
  {
    name: "confirm_password",
    label: "confirm password",
    type: "password",
    placeholder: "*****",
  },
];
