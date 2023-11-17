import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NAME_REGISTER_STORE } from "./constants";

export interface AuthState {
  mailVerify: string | null;
  setMailVerify: (mail: string) => void;
  resetMailVerify: () => void;
}

export const useRegisterStore = create<AuthState>()(
  persist(
    (set) => ({
      // states
      mailVerify: null,

      // methods
      setMailVerify: (mail: string) =>
        set((state) => {
          console.log("🚀 - state: ", state);
          return { mailVerify: mail };
        }),

      resetMailVerify: () => set(() => ({ mailVerify: null })),
    }),
    { name: NAME_REGISTER_STORE }
  )
);
