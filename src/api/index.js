import { toast } from "react-toastify";
import { auth, db } from "../config/firebase.config";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

export const getUserDetail = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        // User is authenticated; resolve the Promise with user data
        const userData = userCred.providerData[0];

        const unsubscribe = onSnapshot(
          doc(db, "users", userData?.uid),
          (_doc) => {
            if (_doc.exists()) {
              resolve(_doc.data());
            } else {
              setDoc(doc(db, "users", userData?.uid), userData).then(() => {
                resolve(userData);
              });
            }
          }
        );

        return unsubscribe;
      } else {
        // User is not authenticated; reject the Promise with an error
        reject(new Error("User is not authenticated"));
      }
      // Make sure to unsubscribe from the listener to prevent memory leaks
      unsubscribe();
    });
  });
};
