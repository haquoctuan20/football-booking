import { axiosBooking } from "./IntercepterBooking";

export const BookingService = {
  getAvailableFields: (data: any) => {
    return axiosBooking.post("/booking/getAvailableFields", data);
  },

  createBooking: (createBookingRequest: any) => {
    return axiosBooking.post("/booking/createBooking", createBookingRequest);
  },
};
