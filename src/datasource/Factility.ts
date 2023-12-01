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
};
