// firebaseClient.ts

import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

class FirebaseService {
  private static instance: FirebaseService;
  private readonly app: FirebaseApp;
  private readonly auth: Auth;
  private readonly firestore: Firestore;

  private constructor() {
    if (typeof window === "undefined") {
      throw new Error("FirebaseService should only be initialized in the browser.");
    }

    this.app = getApps().length ? getApp() : initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: "moven-movies.firebaseapp.com",
      projectId: "moven-movies",
      storageBucket: "moven-movies.firebasestorage.app",
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });

    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
  }

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  getAuth(): Auth {
    return this.auth;
  }

  getFirestore(): Firestore {
    return this.firestore;
  }
}

// Export a singleton instance
export const firebaseService = FirebaseService.getInstance();
