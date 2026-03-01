import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeUndefinedKeyValues<T extends Record<string, unknown>>(
  obj: T,
): T {
  const clone = { ...obj };

  Object.keys(clone).forEach((key) => {
    const newKey = key;
    if (clone[newKey] === undefined) {
      delete clone[newKey];
    }
  });
  return clone;
}
export function extractBodyContent(htmlString: string) {
  const parse = new DOMParser();
  const htmlDoc = parse.parseFromString(htmlString, "text/html");
  return htmlDoc.body.innerHTML;
}

export const getDomain = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_PRODUCTION_URL;
  }

  return "http://localhost:3000";
};
