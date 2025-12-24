import { getID } from "@/lib/get-id";

export const DEFAULT_ACHIEVEMENTS = {
  id: getID(),
  achievementName: "",
  issuerName: "",
  url: "",
  date: null,
  description: "",
};
