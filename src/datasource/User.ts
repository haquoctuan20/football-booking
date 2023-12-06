import { axiosUser } from "./IntercepterUser";

export const UserService = {
  getInfoUserById: (id: string) => {
    return axiosUser.post("/getById", { id });
  },
};
