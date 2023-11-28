import { create } from "zustand";

export interface NavigationState {
  title: string;
  setTitle: (title: string) => void;
}

export const initTitle: string = "Football-booking";

export const useNavigationStore = create<NavigationState>()((set) => ({
  title: initTitle,
  setTitle: (title: string) => set(() => ({ title: title })),
}));
