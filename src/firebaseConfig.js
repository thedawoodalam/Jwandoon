import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW0DIsFe23x2UTl37MKJXlUvMAHPUR0u4",
  authDomain: "jwandoon-1731f.firebaseapp.com",
  projectId: "jwandoon-1731f",
  storageBucket: "jwandoon-1731f.firebasestorage.app",
  messagingSenderId: "1066985197667",
  appId: "1:1066985197667:android:3b687af6e58bf0f64ba856"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
