/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 100000,
});

const requestHandler = (request: any) => {
  request.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
  };
  return request;
};

const errorHandler = (error: any) => {
  return error;
};

const responseHandler = (response: any) => {
  return response;
};

axiosAuth.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosAuth.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export { axiosAuth };
