/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AccountServices } from "./Account";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 100000,
});

const requestHandler = (request: any) => {
  const authToken = AccountServices.getAccessToken();

  request.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    Authorization: `Bearer ${authToken}`,
  };
  return request;
};

const redirectToLogin = (response: any) => {
  if (response?.status === 401 || response?.status === 403) {
    //handle remove token
    window.location = <any>"/login";
  }
};

const errorHandler = (error: any) => {
  const { response } = error;
  redirectToLogin(response);
  return Promise.reject(error);
};

const responseHandler = (response: any) => {
  return response;
};

axiosClient.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

const postFormData = (url: string, params: any) => {
  return axiosClient.post(`/${url}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const putFormData = (url: string, params: any) => {
  return axiosClient.put(`/${url}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { axiosClient, postFormData, putFormData };
