/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase/firebase.provider";

const firestore = getFirestore(firebaseApp);

export async function registerUser(
  email: string,
  password: string,
  username: string,
  additionalData?: Record<string, any>
) {
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
      username: username,
      ...additionalData,
    });

    console.log("User registered and saved to Firestore:", user);
    return user;
  } catch (error: any) {
    return {
      message: error.message,
    };
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ user?: User; message: string, success: boolean }> {
  const auth = getAuth(firebaseApp);

  try {
    // Log in the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("User logged in:", user);
    return {
      success: true,
      user,
      message: "Successful login",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
