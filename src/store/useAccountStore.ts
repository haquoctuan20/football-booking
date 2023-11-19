import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NAME_ACCOUNT_STORE } from "../constants/constants";

export interface Account {
  email: string;
}

const initAccount: Account = {
  email: "",
};

interface AccountState {
  account: Account;
  setAccount: (account: Account) => void;
  resetAccount: () => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      account: initAccount,

      setAccount: (account: Account) => set(() => ({ account: account })),
      resetAccount: () => set(() => ({ account: initAccount })),
    }),
    { name: NAME_ACCOUNT_STORE }
  )
);
