import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NAME_ACCOUNT_STORE } from "../constants/constants";

export interface Account {
  bio: string | null;
  email: string;
  id: string;
  image: string;
  roles: string | null;
  username: string;
  accessToken: string | null;
}

const initAccount: Account = {
  bio: "",
  email: "",
  id: "",
  image: "",
  roles: "",
  username: "",
  accessToken: null,
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
