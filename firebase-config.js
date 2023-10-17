// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvKDAFGntmnNUDk8pOb_tp6OZSSg704rQ",
  authDomain: "web-app-project-85b05.firebaseapp.com",
  projectId: "web-app-project-85b05",
  storageBucket: "web-app-project-85b05.appspot.com",
  messagingSenderId: "1024657208956",
  appId: "1:1024657208956:web:488faa6aeaec45ff9ffbf9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const FIREBASE_AUTH = getAuth(app);