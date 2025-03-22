import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
  sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAW0DIsFe23x2UTl37MKJXlUvMAHPUR0u4",
  authDomain: "jwandoon-1731f.firebaseapp.com",
  projectId: "jwandoon-1731f",
  storageBucket: "jwandoon-1731f.firebasestorage.app",
  messagingSenderId: "1066985197667",
  appId: "1:1066985197667:android:3b687af6e58bf0f64ba856",
};

let app: any;
let auth: any;
export let db: any;
let storage: any;

export const initializeFirebase = () => {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    throw error;
  }
};

export const getFirebaseAuth = () => {
  if (!auth) {
    throw new Error("Firebase Auth hasn't been initialized!");
  }
  return auth;
};

export const getFirebaseDB = () => {
  if (!db) {
    throw new Error("Firebase Firestore hasn't been initialized!");
  }
  return db;
};

export const getFirebaseStorage = () => {
  if (!storage) {
    throw new Error("Firebase Storage hasn't been initialized!");
  }
  return storage;
};

// Save user to Firestore
export const saveUserToFirestore = async (user: any) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    // Only save if the user does not exist
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      createdAt: new Date(),
    });
  }
};

// Sign In with Email & Password
export const signIn = async (email: string, password: string) => {
  const auth = getFirebaseAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(userCredential.user);
  return userCredential;
};

// Sign Up with Email & Password
export const signUp = async (email: string, password: string) => {
  const auth = getFirebaseAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(userCredential.user);
  return userCredential;
};

// Google Login
export const signInWithGoogle = async () => {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  await saveUserToFirestore(userCredential.user);
  return userCredential;
};

// Facebook Login
export const signInWithFacebook = async () => {
  const auth = getFirebaseAuth();
  const provider = new FacebookAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  await saveUserToFirestore(userCredential.user);
  return userCredential;
};

// Reset Password
export const resetPassword = async (email: string) => {
  const auth = getFirebaseAuth();
  return sendPasswordResetEmail(auth, email);
};
