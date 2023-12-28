import { useMemo } from "react";
import { useAccountStore } from "../store/useAccountStore";

const useStatusAccount = () => {
  const { account } = useAccountStore();

  const isConnectPayment = useMemo(() => {
    if (!account.merchantId || !account.trackingId) {
      return false;
    }

    return true;
  }, [account]);

  return { isConnectPayment };
};

export default useStatusAccount;
