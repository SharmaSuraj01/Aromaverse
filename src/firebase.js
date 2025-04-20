// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs8TzjOA3W639o9Er34C48_O7pv3Utyik",
  authDomain: "visiting-card-11aee.firebaseapp.com",
  projectId: "visiting-card-11aee",
  storageBucket: "visiting-card-11aee.firebasestorage.app",
  messagingSenderId: "281820020891",
  appId: "1:281820020891:web:22f0aa81f02f3f951b463e"
};

// Initialize Firebas

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage=getStorage(app);