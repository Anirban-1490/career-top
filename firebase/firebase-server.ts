import { getApp, getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export const appServer = () => {
  const isAppExist = getApps().find(
    (value) => value.name == "career-top#server3"
  );

  return !isAppExist
    ? initializeApp(
        {
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          credential: cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
          }),
        },
        "career-top#server3"
      )
    : getApp("career-top#server3");
};
export const auth = getAuth(appServer());
