import { create } from "zustand";
import { NotificationService } from "../datasource/Notification";

interface NotificationState {
  count: number;
  fetchCount: () => Promise<void>;
  increaseCount: () => void;
  decreaseCount: () => void;
  resetCount: () => void;
}

// const initNotificationState: NotificationState = {
//   count: 0,
// };

export const useNotificationStore = create<NotificationState>()((set) => ({
  count: 0,

  fetchCount: async () => {
    const { data } = await NotificationService.getCountUnread();
    set({ count: data });
  },

  increaseCount: () => {
    set((state) => ({ count: state.count + 1 }));
  },

  decreaseCount: () => {
    set((state) => {
      if (state.count === 0) {
        return { count: 0 };
      }

      return { count: state.count - 1 };
    });
  },

  resetCount: () => {
    set(() => ({ count: 0 }));
  },
}));
