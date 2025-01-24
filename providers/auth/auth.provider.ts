/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firestore = getFirestore();

export async function registerUser(email: string, password: string, additionalData?: Record<string, any>) {
  const auth = getAuth();

  try {
    // Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save the user to Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date().toISOString(),
      ...additionalData,
    });

    console.log("User registered and saved to Firestore:", user);
    return user;
  } catch (error: any) {
    console.error("Error registering user:", error.message);
    throw new Error(error.message); // Re-throw the error to handle it in the UI
  }
}

export async function loginUser(email: string, password: string) {
  const auth = getAuth();

  try {
    // Log in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User logged in:", user);
    return user;
  } catch (error: any) {
    console.error("Error logging in:", error.message);
    throw new Error(error.message); // Re-throw the error to handle it in the UI
  }
}
