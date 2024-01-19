import { CreateFacility } from "../constants/facility";
import { axiosFacility } from "./IntercepterAPI";
import { axiosFacilityPublic } from "./IntercepterPublic";

export const FacilityService = {
  createFacility: (facility: CreateFacility) => {
    return axiosFacility.post("/facility", facility);
  },

  getAllFacility: () => {
    return axiosFacility.get("/facility");
  },

  getAllFacilityFilter: (params: any) => {
    return axiosFacilityPublic.post("/facility/getByFilter", params);
  },

  getFacilityByUsername: (username: string) => {
    return axiosFacility.post("/facility/getByUsername", { username });
  },

  getFacilityById: (facilityId: string) => {
    return axiosFacilityPublic.post("/facility/getByFacilityId", { facilityId });
  },

  createPrice: (price: any) => {
    return axiosFacility.post("/price/createPrice", price);
  },

  getPriceByFacilityId: (facilityId: string) => {
    return axiosFacility.post("/price/getPrice", { facilityId });
  },

  getPrice: (data: any) => {
    return axiosFacilityPublic.post("/price/getPrice", data);
  },
};
