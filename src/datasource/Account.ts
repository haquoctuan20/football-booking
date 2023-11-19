import { ACCESS_TOKEN_KEY } from "../constants/constants";
import { axiosClient } from "./Intercepter";

export const AccountServices = {
  setAccessToken: (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  getAccessToken: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!token) {
      return null;
    }

    return token;
  },

  getAllAccount: () => {
    return axiosClient.get("/todos/1");
  },

  login: () => {
    return {
      email: "test@gmail.com",
      accessToken: "accessToken",
    };
  },

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};
