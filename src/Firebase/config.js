import { initializeApp } from "firebase/app";
import {getAuth}from 'firebase/auth'
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)
export const auth=getAuth(app)
export const storage=getStorage(app)
export default app