/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirebaseService } from "../firebase/firebase.provider";
import { CreateTokenCookie } from "@/lib/token";

// Register a new user
export async function registerUser(
  email: string,
  password: string,
  additionalData?: Record<string, any>
): Promise<{ success: boolean; user?: User; message: string }> {
  try {
    const firebaseService = getFirebaseService();
    if (!firebaseService) {
      throw new Error("Firebase is not available on the server.");
    }

    const auth = firebaseService.getAuth();
    const firestore = firebaseService.getFirestore();

    if (!auth || !firestore) {
      throw new Error("Firebase services are not initialized.");
    }

    // Check if the email is already registered
    const existingMethods = await fetchSignInMethodsForEmail(auth, email);
    if (existingMethods.length > 0) {
      throw new Error("This email is already in use. Please log in instead.");
    }

    // Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save the user to Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date().toISOString(),
      ...additionalData,
    });

    return { success: true, user, message: "Registration successful" };
  } catch (error: any) {
    return { success: false, message: getAuthErrorMessage(error) };
  }
}

// Login with an existing user account
export async function loginUser(
  email: string,
  password: string
): Promise<{ user?: User; message: string; success: boolean }> {
  try {
    const firebaseService = getFirebaseService();
    if (!firebaseService) {
      throw new Error("Firebase is not available on the server.");
    }

    const auth = firebaseService.getAuth();
    if (!auth) {
      throw new Error("Firebase authentication is not initialized.");
    }

    // Log in the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await CreateTokenCookie(user.email as string);

    return { success: true, user, message: "Successful login" };
  } catch (error: any) {
    return { success: false, message: getAuthErrorMessage(error) };
  }
}

// Helper function to map Firebase errors to user-friendly messages
function getAuthErrorMessage(error: any): string {
  const errorMap: Record<string, string> = {
    "auth/email-already-in-use":
      "This email is already in use. Please log in instead.",
    "auth/invalid-email": "The email address is not valid.",
    "auth/weak-password":
      "The password is too weak. Use at least 6 characters.",
    "auth/network-request-failed":
      "Network error. Please check your connection and try again.",
  };

  return (
    errorMap[error.code] || "An unexpected error occurred. Please try again."
  );
}
