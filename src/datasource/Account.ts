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

  login: (email: string, password: string) => {
    const user = {
      email,
      password,
    };

    return axiosClient.post("/api/users/login", { user });
  },

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  getInfoUser: () => {
    return axiosClient.get("/api/user");
  },
};
