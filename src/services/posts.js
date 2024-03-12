import axios from "axios";
import { baseURL, headersFormData, request } from "./axios-utils";

export const getPostByID = (id) => {
  return request({ url: `/v1/post/${id}`, method: "GET" });
};
export const deletePostByID = (id) => {
  return request({ url: `/v1/post/${id}`, method: "Delete" });
};

export const addPost = (data) => {
  return axios({
    url: `${baseURL}/v1/post`,
    method: "POST",
    headers: headersFormData(),
    data,
  })
    .then((res) => res)
    .catch((err) => err);
};
export const editPost = (id, data) => {
  return axios({
    url: `${baseURL}/v1/post/${id}`,
    method: "PATCH",
    headers: headersFormData(),
    data,
  })
    .then((res) => res)
    .catch((err) => err);
};

export const getPosts = (limit) => {
  return request({
    url: `/v1/post`,
    method: "GET",
  });
};
