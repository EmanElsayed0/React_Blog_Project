import axios from "axios";
import { baseURL, headersFormData, request } from "./axios-utils";

export const signIn = (data) => {
  return request({
    url: "/v1/users/sign-in",
    method: "POST",
    data,
  });
};

export const signUp = (data) => {
  return request({
    url: "/v1/users/sign-up",
    method: "POST",
    data,
  });
};

export const getUserByID = (id) => {
  return request({ url: `/v1/user/profile/${id}`, method: "GET" });
};

export const updateOneUser = (data) => {
  return axios({
    url: `${baseURL}/v1/user/profile`,
    method: "PATCH",
    headers: headersFormData(),
    data,
  })
    .then((res) => res)
    .catch((err) => err);
};
