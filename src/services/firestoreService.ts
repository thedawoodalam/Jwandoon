import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// Save a new document
export const addDocument = async (collectionName: string, data: any) => {
  return await addDoc(collection(db, collectionName), data);
};

// Get documents from a collection with optional filtering
export const getDocuments = async (collectionName: string, field?: string, value?: any) => {
  const colRef = collection(db, collectionName);
  let q: any = colRef;

  if (field && value !== undefined) {
    q = query(colRef, where(field, "==", value));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as object) }));
};

// Get a single document
export const getDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};
