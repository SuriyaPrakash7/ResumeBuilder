import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDKo8iCapX2sUe5buoosGA11ylOX2LpJqI",
  authDomain: "resume-builder-cb870.firebaseapp.com",
  projectId: "resume-builder-cb870",
  storageBucket: "resume-builder-cb870.appspot.com",
  messagingSenderId: "515117630227",
  appId: "1:515117630227:web:9e06d9c7eb5852071cd0e6"
};



const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage=getStorage(app);

export { auth, db ,storage};
