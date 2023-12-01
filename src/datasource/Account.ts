import { ACCESS_TOKEN_KEY } from "../constants/constants";
import { axiosClient } from "./Intercepter";
import { axiosAuth } from "./IntercepterAuth";

export interface accountRegister {
  username: string;
  email: string;
  password: string;
  role: string;
}

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

    return axiosAuth.post("/api/users/login", { user });
  },

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  getInfoUser: () => {
    return axiosClient.get("/api/user");
  },

  register: (account: accountRegister) => {
    return axiosAuth.post("/api/users", {
      user: account,
    });
  },

  verifyRegister: (email: string, otp: string) => {
    return axiosAuth.post("/api/users/verify?action=VERIFY_EMAIL", {
      user: {
        email,
        otp,
      },
    });
  },

  resendOtp: (email: string) => {
    return axiosAuth.post(
      `/api/users/send-otp?action=VERIFY_EMAIL&email=${email}`
    );
  },
};
