import { axiosNotification } from "./IntercepterAPI";

export const NotificationService = {
  getAllNotification: () => {
    return axiosNotification.get(`/notifications`);
  },
};
