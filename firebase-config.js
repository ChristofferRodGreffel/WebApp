// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNNRUUqqb8Q3TBz37vFLEERpEKHkHoaZM",
  authDomain: "firestore-test-edcbe.firebaseapp.com",
  projectId: "firestore-test-edcbe",
  storageBucket: "firestore-test-edcbe.appspot.com",
  messagingSenderId: "705712711123",
  appId: "1:705712711123:web:6d242fc168425409c9bb26",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const FIREBASE_AUTH = getAuth(app);
