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

  const isOwner = useMemo(() => {
    const ownerRole = account.roles.find((r: string) => r === "ROLE_OWNER");

    if (ownerRole) return true;

    return false;
  }, [account]);

  return { isConnectPayment, isOwner };
};

export default useStatusAccount;
