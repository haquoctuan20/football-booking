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

  const handleMessageError = (error: any) => {
    const errorsList = error?.response?.data?.errors?.body;

    if (errorsList) {
      return toast.error(errorsList.join(" "));
    }
    return toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
  };

  return {
    messageSuccess,
    messageInfo,
    messageError,
    messageWarning,
    messageDefault,
    handleMessageError,
  };
};

export default useNotification;
