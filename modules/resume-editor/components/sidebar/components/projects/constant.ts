import { getID } from "@/lib/get-id";

export const DEFAULT_PROJECTS = {
  id: getID(),
  title: "Project",
  isCurrentlyWorking: false,
  description: "",
  url: "",
  startDate: null,
  endDate: null,
};
