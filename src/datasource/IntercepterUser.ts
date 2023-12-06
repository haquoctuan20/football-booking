/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AccountServices } from "./Account";

const axiosUser = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_USER,
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
  if (response?.status === 401) {
    //handle remove token
    window.location = <any>"/login";
    AccountServices.logout();
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

axiosUser.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosUser.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export { axiosUser };
