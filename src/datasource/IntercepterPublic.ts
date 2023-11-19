/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosPublic = axios.create({
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

axiosPublic.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosPublic.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export { axiosPublic };
