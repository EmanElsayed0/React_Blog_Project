import * as yup from "yup";

export const userSchema = yup.object({
  username: yup.string().required(),
  bio: yup.string(),
  new_password: yup.string().min(6).optional(),
  curr_password: yup.string().min(6).optional(),
  confirm_curr_password: yup
    .string()
    .optional()
    .oneOf([yup.ref("curr_password")], "Your passwords do not match"),
});

export const inputs = [
  {
    name: "username",
    label: "username",
    type: "text",
    placeholder: "Enter username",
  },
  {
    name: "bio",
    label: "Bio",
    type: "text",
    placeholder: "Enter Bio",
  },
  {
    name: "curr_password",
    label: "current password",
    type: "password",
    placeholder: "******",
  },
  {
    name: "confirm_curr_password",
    label: "confirm current Password",
    type: "password",
    placeholder: "******",
  },
  {
    name: "new password",
    label: "new Password",
    type: "password",
    placeholder: "******",
  },
];
