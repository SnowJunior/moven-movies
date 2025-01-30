// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "moven-movies.firebaseapp.com",
  projectId: "moven-movies",
  storageBucket: "moven-movies.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSENGER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize firebase products
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { auth, firestore };
