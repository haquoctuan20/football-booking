import { create } from "zustand";
import { NotificationService } from "../datasource/Notification";

export interface INotification {
  detailId: string | null;
  fromUserId: string | null;
  id: string | null;
  isRead: boolean;
  message: string | null;
  timeStamp: string | null;
  toUserId: string | null;
  type: string | null;
  [key: string]: any;
}

interface NotificationState {
  count: number;
  notifications: INotification[];

  fetchNotifications: () => Promise<void>;
  fetchCount: () => Promise<void>;

  increaseNotification: (noti: INotification) => void;
  decreaseNotification: (noti: INotification) => void;

  resetCount: () => void;
}

// const initNotificationState: NotificationState = {
//   count: 0,
// };

export const useNotificationStore = create<NotificationState>()((set) => ({
  count: 0,
  notifications: [],

  fetchCount: async () => {
    const { data } = await NotificationService.getCountUnread();
    set({ count: data });
  },

  fetchNotifications: async () => {
    const { data } = await NotificationService.getAllNotification();
    set({ notifications: data });
  },

  increaseNotification: (noti) => {
    set((state) => {
      return { count: state.count + 1, notifications: [noti, ...state.notifications] };
    });
  },

  decreaseNotification: (noti) => {
    set((state) => {
      const newNotifications = state.notifications.map((n: INotification) => {
        if (n.id === noti.id) {
          return { ...n, isRead: true };
        }

        return n;
      });

      return { count: state.count - 1, notifications: newNotifications };
    });
  },

  resetCount: () => {
    set((state) => {
      const listNotification = state.notifications.map((n: INotification) => ({
        ...n,
        isRead: true,
      }));

      return { count: 0, notifications: listNotification };
    });
  },
}));
