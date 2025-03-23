import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
  sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider, 
  signInWithPopup 
} from "firebase/auth";


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
let db: any;
let storage: any;

export const initializeFirebase = () => {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
};

export const getFirebaseAuth = () => {
  if (!auth) throw new Error("Firebase Auth hasn't been initialized!");
  return auth;
};

export const getFirebaseDB = () => {
  if (!db) throw new Error("Firebase Firestore hasn't been initialized!");
  return db;
};

export const getFirebaseStorage = () => {
  if (!storage) throw new Error("Firebase Storage hasn't been initialized!");
  return storage;
};

// Save user to Firestore
export const saveUserToFirestore = async (user: any) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      isAdmin: false,
      isInstitution: false,
      status: "pending", // Institutions require admin approval
      createdAt: new Date(),
    });
  }
};

// Authentication Functions
export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(userCredential.user);
  return userCredential;
};

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(userCredential.user);
  return userCredential;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  await saveUserToFirestore(userCredential.user);
  return userCredential;
};

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  await saveUserToFirestore(userCredential.user);
  return userCredential;
};

export const resetPassword = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};
