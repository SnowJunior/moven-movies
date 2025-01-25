// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOWaIu7K49JTh_43LPN94Zwe0olqn8T00",
  authDomain: "moven-movies.firebaseapp.com",
  projectId: "moven-movies",
  storageBucket: "moven-movies.firebasestorage.app",
  messagingSenderId: "837743674664",
  appId: "1:837743674664:web:945322915b1658628efc1d"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);