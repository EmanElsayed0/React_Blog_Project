import * as yup from "yup";

export const createPost = yup.object({
  title: yup.string().min(3).required(),
  content: yup.string().min(6).required(),
});

export const inputs = [
  {
    name: "title",
    label: "title",
    type: "text",
    placeholder: "Enter Post Title",
  },
  {
    name: "content",
    label: "content",
    type: "text",
    placeholder: "Enter Post Content",
  },
];
