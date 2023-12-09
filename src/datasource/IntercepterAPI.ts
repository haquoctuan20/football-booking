/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AccountServices } from "./Account";

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

const createAxios = (config: any) => {
  const newInstance = axios.create(config);

  newInstance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
  );

  newInstance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
  );

  return newInstance;
};

const axiosNotification = createAxios({
  baseURL: import.meta.env.VITE_BASE_URL_NOTIFICATION,
  timeout: 100000,
});

const axiosBooking = createAxios({
  baseURL: import.meta.env.VITE_BASE_URL_BOOKING,
  timeout: 100000,
});

const axiosFacility = createAxios({
  baseURL: import.meta.env.VITE_BASE_URL_FACILITY,
  timeout: 100000,
});

const axiosUser = createAxios({
  baseURL: import.meta.env.VITE_BASE_URL_USER,
  timeout: 100000,
});
export { axiosNotification, axiosBooking, axiosFacility, axiosUser };
