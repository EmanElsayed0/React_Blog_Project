import axios from "axios";

export const baseURL = "https://blog-kn32.onrender.com";

const client = axios.create({ baseURL });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Accept = "application/json";
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "jwt"
  )}`;

  if (options.formData) {
    client.defaults.headers.common["Content-Type"] = "multipart/form-data";
  }
  const onSuccess = (response) => {
    console.log("<<Success>>", response);
    return response;
  };
  const onError = (err) => {
    console.log("<<ERROR>>", err);
    return err;
  };

  return client(options).then(onSuccess).catch(onError);
};

export const headersFormData = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "content-type": "multipart/form-data",
    Accept: "application/json",
  };
};
