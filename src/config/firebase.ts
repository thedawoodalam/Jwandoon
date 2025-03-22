import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "1:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXXXXXX"
};

let app: any;
let auth: any;
let db: any;
let storage: any;

export const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error; // Re-throw to handle it in the app
  }
};

export const getFirebaseAuth = () => {
  if (!auth) {
    throw new Error('Firebase Auth hasn\'t been initialized!');
  }
  return auth;
};

export const signIn = async (email: string, password: string) => {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email: string, password: string) => {
  const auth = getFirebaseAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const resetPassword = async (email: string) => {
  const auth = getFirebaseAuth();
  return sendPasswordResetEmail(auth, email);
};

export const getFirebaseDB = () => {
  if (!db) {
    throw new Error('Firebase Firestore hasn\'t been initialized!');
  }
  return db;
};

export const getFirebaseStorage = () => {
  if (!storage) {
    throw new Error('Firebase Storage hasn\'t been initialized!');
  }
  return storage;
}; 