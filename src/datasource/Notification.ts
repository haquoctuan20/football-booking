import { axiosNotification } from "./IntercepterAPI";

export const NotificationService = {
  getAllNotification: () => {
    return axiosNotification.get(`/notification`);
  },

  readOneNotification: (id: string) => {
    return axiosNotification.put(`/notification/read/${id}`);
  },
};
