import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NAME_ACCOUNT_STORE } from "../constants/constants";
import { AccountServices } from "../datasource/Account";

export interface Account {
  age: null | string;
  email: string;
  gender: string | null;
  id: string;
  image: string;
  roles: string[];
  username: string;
  accessToken: string | null;
  status: string;
  name: string;
  phone: string | null;
  birthDate: string | null;
}

const initAccount: Account = {
  age: null,
  phone: null,
  email: "",
  gender: null,
  id: "",
  image: "",
  roles: [],
  username: "",
  accessToken: null,
  status: "",
  name: "",
  birthDate: "",
};

interface AccountState {
  account: Account;
  setAccount: (account: Account) => void;
  resetAccount: () => void;
  fetchingUser: () => Promise<void>;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      account: initAccount,

      setAccount: (account: Account) => set(() => ({ account: account })),

      resetAccount: () => set(() => ({ account: initAccount })),

      fetchingUser: async () => {
        const { data: user } = await AccountServices.getInfoUser();

        set((state) => {
          const userData: Account = {
            age: user.age,
            email: user.email,
            gender: user.gender,
            id: user.id,
            image: user.image,
            roles: user.roles,
            username: user.username,
            status: user.status,
            accessToken: state.account.accessToken,
            name: user.name,
            phone: user.phone,
            birthDate: user.birthDate,
          };

          return { account: userData };
        });
      },
    }),
    { name: NAME_ACCOUNT_STORE }
  )
);
