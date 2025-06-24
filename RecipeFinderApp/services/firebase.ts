import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config:
const firebaseConfig = {
  apiKey: "AIzaSyDhZuD-0MMQPgJtEEG-eQB1mF4VtiIGFKI",
  authDomain: "recipefinderapp-feb48.firebaseapp.com",
  projectId: "recipefinderapp-feb48",
  storageBucket: "recipefinderapp-feb48.appspot.com",
  messagingSenderId: "222266700059",
  appId: "1:222266700059:web:10f0149cdedb2d2552a3be",
  measurementId: "G-422ZCVJ46E" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth to use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);
