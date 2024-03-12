import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const inputs = [
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
];
