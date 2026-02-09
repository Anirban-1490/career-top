import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export const createFirestoreConverter = <T>() => {
  return {
    toFirestore: (item: T) => item,
    fromFirestore: (
      snapshot: QueryDocumentSnapshot<T>,
      options: SnapshotOptions,
    ) => {
      return snapshot.data(options);
    },
  };
};
