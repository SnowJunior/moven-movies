import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

class FirebaseService {
  private static instance: FirebaseService | null = null;
  private readonly app: FirebaseApp | null = null;
  private readonly auth: Auth | null = null;
  private readonly firestore: Firestore | null = null;

  private constructor() {
    if (typeof window !== "undefined") {
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
  }

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  getAuth(): Auth | null {
    if (typeof window === "undefined") return null;
    return this.auth;
  }

  getFirestore(): Firestore | null {
    if (typeof window === "undefined") return null;
    return this.firestore;
  }
}

// Export a function that ensures Firebase is only accessed on the client
export const getFirebaseService = () => {
  if (typeof window === "undefined") return null;
  return FirebaseService.getInstance();
};
