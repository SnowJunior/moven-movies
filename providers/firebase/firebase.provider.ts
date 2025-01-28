// Import the functions you need from the SDKs you need
import { firebaseAPI, firebaseAPPID, firebaseMessangerID } from "@/utils/utils";
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseAPI,
  authDomain: "moven-movies.firebaseapp.com",
  projectId: "moven-movies",
  storageBucket: "moven-movies.firebasestorage.app",
  messagingSenderId: firebaseMessangerID,
  appId: firebaseAPPID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);