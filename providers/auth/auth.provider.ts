/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase/firebase.provider";

// Initialize cloud firestore for user storage
const firestore = getFirestore(firebaseApp);

// Regsiter a new user to application
export async function registerUser(
  email: string,
  password: string,
  additionalData?: Record<string, any>
): Promise<{ success: boolean; user?: User; message: string }> {
  // Initialize auth for registration
  const auth = getAuth(firebaseApp);

  try {
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

    // Return the new created user
    return { success: true, user, message: "Registration successful" };
  } catch (error: any) {
    // Pass an error message to the components
    console.log('registratio failure details:', error)
    return {
      success: false,
      message: error.message,
    };
  }
}

// Login with an exsisting user account
export async function loginUser(
  email: string,
  password: string
): Promise<{ user?: User; message: string; success: boolean }> {
  const auth = getAuth(firebaseApp);

  try {
    // Log in the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Return user credentials from login
    const user = userCredential.user;

    // Return user to components with request status
    return {
      success: true,
      user,
      message: "Successful login",
    };
  } catch (error: any) {
    // Return and error and pass to component level
    return {
      success: false,
      message: error.message,
    };
  }
}
