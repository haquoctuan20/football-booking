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

  merchantId: string | null;
  trackingId: string | null;
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
  merchantId: null,
  trackingId: null,
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
        try {
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
              merchantId: user.merchantId ? user.merchantId : null,
              trackingId: user.trackingId ? user.trackingId : null,
            };

            return { account: userData };
          });
        } catch (error) {
          console.log("🚀 - fetchingUser: - error: ", error);

          set(() => {
            return { account: initAccount };
          });
        }
      },
    }),
    { name: NAME_ACCOUNT_STORE }
  )
);
