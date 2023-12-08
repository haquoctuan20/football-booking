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

  getAllBooking: (params?: any) => {
    return axiosBooking.post("/booking/getBooking", params ? params : {});
  },

  matchingRequest: (bookingId: string) => {
    return axiosBooking.post("/matching/request", { bookingId });
  },

  getMatchingRequest: (params?: any) => {
    return axiosBooking.post("/matching/getMatchingRequest", params ? params : {});
  },

  responseMatchingRequest: (matchRequestId: string, action: "ACCEPTED" | "DENIED") => {
    return axiosBooking.post("/matching/respond", { matchRequestId, action });
  },

  cancelRequest: (id: string) => {
    return axiosBooking.post("/matching/delete", { id });
  },
};
