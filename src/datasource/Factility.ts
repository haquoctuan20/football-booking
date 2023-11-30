import { CreateFacility } from "../constants/facility";
import { axiosFacility } from "./IntercepterFacility";

export const FacilityService = {
  createFacility: (facility: CreateFacility) => {
    return axiosFacility.post("/facility", facility);
  },
};
