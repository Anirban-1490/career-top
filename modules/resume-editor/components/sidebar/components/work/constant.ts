import { getID } from "@/lib/get-id";

export const DEFAULT_WORK_EXPERIENCE = {
  id: getID(),
  company: "",
  role: "",
  location: "",
  isRemote: false,
  startDate: null,
  endDate: null,
  currentlyWorking: true,
  description: "",
};
