import { toast } from "react-toastify";

const useNotification = () => {
  const messageInfo = (msg: string) => {
    toast.info(msg);
  };

  const messageSuccess = (msg: string) => {
    toast.success(msg);
  };

  const messageError = (msg: string) => {
    toast.error(msg);
  };

  const messageWarning = (msg: string) => {
    toast.warning(msg);
  };

  const messageDefault = (msg: string) => {
    toast(msg);
  };

  return {
    messageSuccess,
    messageInfo,
    messageError,
    messageWarning,
    messageDefault,
  };
};

export default useNotification;
