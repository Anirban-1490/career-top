import { app, auth } from "@/firebase/firebase-client";
import { getDomain } from "@/lib/utils";
import axios from "axios";
import {
  browserLocalPersistence,
  getIdToken,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const signUP = async () => {
  await setPersistence(auth, browserLocalPersistence);

  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  const token = await getIdToken(result.user);

  await axios.post(`${getDomain()}/api/sign-in`, {
    idToken: token,
  });
  return signOut(auth);
};
