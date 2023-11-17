import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NAME_REGISTER_STORE } from "../constants/constants";

export interface RegisterState {
  mailVerify: string | null;
  setMailVerify: (mail: string) => void;
  resetMailVerify: () => void;
}

export const useRegisterStore = create<RegisterState>()(
  persist(
    (set) => ({
      // states
      mailVerify: null,

      // methods
      setMailVerify: (mail: string) => set({ mailVerify: mail }),
      resetMailVerify: () => set({ mailVerify: null }),
    }),
    { name: NAME_REGISTER_STORE }
  )
);
