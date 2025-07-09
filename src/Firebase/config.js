import { initializeApp } from "firebase/app";
import {getAuth}from 'firebase/auth'
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDCQH-_m7LS7DWHKdrR0Bfv_75foEAXWJM",
  authDomain: "ecommerce-75c29.firebaseapp.com",
  projectId: "ecommerce-75c29",
  storageBucket: "ecommerce-75c29.appspot.com",
  messagingSenderId: "508288244414",
  appId: "1:508288244414:web:62dd3defd268689f8d1cef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)
export const auth=getAuth(app)
export const storage=getStorage(app)
export default app