import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyl7VugHMsCHyUE_E8vF6g2K0Rr518R5I",
  authDomain: "gameauth-1b3c4.firebaseapp.com",
  projectId: "gameauth-1b3c4",
  storageBucket: "gameauth-1b3c4.firebasestorage.app",
  messagingSenderId: "956940874245",
  appId: "1:956940874245:web:5547eef53f48fcfe94226c",
  measurementId: "G-VQ2BG1ZNEK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
