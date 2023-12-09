import { axiosUser } from "./IntercepterAPI";

export const UserService = {
  getInfoUserById: (id: string) => {
    return axiosUser.post("/getById", { id });
  },
};
