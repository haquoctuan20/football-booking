import { axiosPayment } from "./IntercepterAPI";

export const PaymentService = {
  partnerReferral: () => {
    return axiosPayment.get("/payment/partnerReferral");
  },
};
