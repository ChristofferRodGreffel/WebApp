import { useEffect, useState } from "react";
import "./App.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase-config";
import SignUp from "./pages/SignUp";
import { CustomSignOut } from "./Helperfunctions/CustomSignOut";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    // Function that runs whenever the the user status changes (logged in / logged out)
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        setUser(uid);
        // ...
      } else {
        setUser("");
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <>
      <SignUp />
    </>
  );
}

export default App;
