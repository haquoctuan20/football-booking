import { axiosNotification } from "./IntercepterAPI";

export const NotificationService = {
  getAllNotification: () => {
    return axiosNotification.get(`/notification`);
  },

  readOneNotification: (id: string) => {
    return axiosNotification.put(`/notification/read/${id}`);
  },

  getCountUnread: () => {
    return axiosNotification.get(`/notification/count-unread`);
  },
};
