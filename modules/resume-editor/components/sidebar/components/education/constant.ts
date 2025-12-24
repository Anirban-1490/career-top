import { getID } from "@/lib/get-id";

export const DEFAULT_EDUCATION = {
  id: getID(),
  degree: "",
  institute: "",
  location: "",
  startDate: null,
  endDate: null,
  description: "",
  isCurrentlyStudying: false,
};
