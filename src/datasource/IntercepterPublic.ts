/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

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

const axiosFacilityPublic = createAxios({
  baseURL: import.meta.env.VITE_BASE_URL_FACILITY,
  timeout: 100000,
});

const axiosBookingPublic = createAxios({
  baseURL: import.meta.env.VITE_BASE_URL_BOOKING,
  timeout: 100000,
});

export { axiosFacilityPublic, axiosBookingPublic };
