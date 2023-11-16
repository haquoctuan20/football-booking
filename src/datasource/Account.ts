import { axiosClient } from "./Intercepter";

const getAllAccount = () => {
  return axiosClient.get("/todos/1");
};

export { getAllAccount };
