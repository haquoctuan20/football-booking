import { CreateFacility } from "../constants/facility";
import { axiosFacility } from "./IntercepterFacility";

export const FacilityService = {
  createFacility: (facility: CreateFacility) => {
    return axiosFacility.post("/facility", facility);
  },

  getFacilityByUsername: (username: string) => {
    return axiosFacility.post("/facility/getByUsername", { username });
  },

  getFacilityById: (facilityId: string) => {
    return axiosFacility.post("/facility/getByFacilityId", { facilityId });
  },

  createPrice: (price: any) => {
    return axiosFacility.post("/price/createPrice", price);
  },

  getPriceByFacilityId: (facilityId: string) => {
    return axiosFacility.post("/price/getPrice", { facilityId });
  },
};
