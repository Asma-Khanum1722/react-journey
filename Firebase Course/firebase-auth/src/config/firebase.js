import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD07yxPbM62JMN6AGkQD4ZrQ0jWWWRUghs",
  authDomain: "app-ad711.firebaseapp.com",
  projectId: "app-ad711",
  storageBucket: "app-ad711.firebasestorage.app",
  messagingSenderId: "401731531700",
  appId: "1:401731531700:web:a7f4b6c17133074c50b8e1",
  measurementId: "G-3F1PF20WFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);