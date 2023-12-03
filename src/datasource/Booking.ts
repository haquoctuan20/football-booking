import { axiosBooking } from "./IntercepterBooking";

export const BookingService = {
  getAvailableFields: (data: any) => {
    return axiosBooking.post("/booking/getAvailableFields", data);
  },

  createBooking: (createBookingRequest: any) => {
    return axiosBooking.post("/booking/createBooking", createBookingRequest);
  },

  getMyBooking: (userId: string) => {
    return axiosBooking.post("/booking/getBooking", { userId });
  },

  switchStatusBooking: (bookingId: string) => {
    return axiosBooking.post("/booking/switchStatus", { bookingId });
  },

  getMatchingRequest: () => {
    return axiosBooking.post("/booking/getBooking", {});
  },

  matchingRequest: (bookingId: string) => {
    return axiosBooking.post("/booking/matchingRequest", { bookingId });
  },
};
