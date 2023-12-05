import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NAME_ACCOUNT_STORE } from "../constants/constants";

export interface Account {
  age: null | string | number;
  email: string;
  gender: string | null;
  id: string;
  image: string;
  roles: string[];
  username: string;
  accessToken: string | null;
  status: string;
}

const initAccount: Account = {
  age: null,
  email: "",
  gender: null,
  id: "",
  image: "",
  roles: [],
  username: "",
  accessToken: null,
  status: "",
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
